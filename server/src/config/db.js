import mongoose from 'mongoose';

    /**
     * Safely masks MongoDB connection string credentials for log output
     * Prevents accidental exposure of usernames and passwords in logs
     */
    export const maskMongoUri = (uri) => {
      if (!uri || typeof uri !== 'string') return '';
      return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:****@');
    };

      /**
       * Checks whether a URI string is a local loopback address
       */
      export const isLocalMongoUri = (str) => {
        if (!str || typeof str !== 'string') return false;
        return (
          str.includes('127.0.0.1') ||
          str.includes('localhost') ||
          str.includes('0.0.0.0')
        );
      };

      /**
       * Resolves the MongoDB connection string from environment variables with intelligent priority:
       * - In production: Remote MongoDB Atlas URIs (mongodb+srv://) take absolute precedence over local placeholders.
       * - In development: Standard ordering (MONGODB_URI -> MONGO_URI -> DATABASE_URL) is respected.
       */
      export const resolveMongoUri = () => {
        const isProduction = process.env.NODE_ENV === 'production';

        const envCandidates = [
          { key: 'MONGODB_URI', val: process.env.MONGODB_URI },
          { key: 'MONGO_URI', val: process.env.MONGO_URI },
          { key: 'DATABASE_URL', val: process.env.DATABASE_URL },
        ];

        const cleaned = envCandidates
          .map((c) => ({
            key: c.key,
            val: c.val ? c.val.trim().replace(/^["']|["']$/g, '') : null,
          }))
          .filter((c) => Boolean(c.val));

        if (cleaned.length === 0) {
          return { uri: null, sourceKey: null, isLocal: false };
        }

        // In production, remote cloud URIs (e.g. Atlas mongodb+srv://) take absolute precedence
        if (isProduction) {
          const remote = cleaned.find((c) => !isLocalMongoUri(c.val));
          if (remote) {
            return { uri: remote.val, sourceKey: remote.key, isLocal: false };
          }
          // If only local loopback URIs exist in production, return with isLocal: true
          return { uri: cleaned[0].val, sourceKey: cleaned[0].key, isLocal: true };
        }

        // In development, return the first defined candidate
        const chosen = cleaned[0];
        return {
          uri: chosen.val,
          sourceKey: chosen.key,
          isLocal: isLocalMongoUri(chosen.val),
        };
      };

      /**
       * Returns connection status details for health checks
       */
      export const isDbConnected = () => mongoose.connection.readyState === 1;

      export const getDbStatus = () => {
        const readyStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
        const state = readyStates[mongoose.connection.readyState] || 'unknown';
        return {
          state,
          readyState: mongoose.connection.readyState,
          host: mongoose.connection.host || null,
          name: mongoose.connection.name || null,
        };
      };

      // Internal lifecycle tracking
      let hasConnectedOnce = false;

      /**
       * Connect to MongoDB database with exponential backoff and production safeguards
       */
      export const connectDB = async ({ maxRetries = 5, retryDelayMs = 3000 } = {}) => {
        const isProduction = process.env.NODE_ENV === 'production';
        const { uri, sourceKey, isLocal } = resolveMongoUri();

        // Production check: Reject missing or local 127.0.0.1 URIs in production
        if (isProduction && (!uri || isLocal)) {
          console.error('\n' + '='.repeat(80));
          console.error('✗ MongoDB Configuration Error: Invalid or Missing Database URI in Production');
          console.error('='.repeat(80));
          if (isLocal) {
            console.error(`⚠️  A local loopback address (${maskMongoUri(uri)}) was detected from [${sourceKey}].`);
            console.error('   Render runs web services inside isolated cloud containers with NO local MongoDB daemon.');
            console.error('   Attempting to connect to 127.0.0.1 / localhost will always fail with ECONNREFUSED.');
          } else {
            console.error('⚠️  Neither MONGODB_URI nor MONGO_URI is set in your Render environment.');
          }
          console.error('\n👉 HOW TO RESOLVE IN RENDER:');
          console.error('   1. Open https://dashboard.render.com -> Select your LensCraft Web Service');
          console.error('   2. Navigate to the "Environment" tab');
          console.error('   3. Set or update the variable:');
          console.error('      Key:   MONGODB_URI');
          console.error('      Value: mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/lenscraft_db?retryWrites=true&w=majority');
          console.error('\n👉 CHECK YOUR MONGODB ATLAS CLUSTER (https://cloud.mongodb.com):');
          console.error('   1. Network Access: Ensure IP "0.0.0.0/0" is whitelisted ("Allow Access from Anywhere").');
          console.error('   2. Database Access: Ensure your database user credentials are correct.');
          console.error('   3. Special Characters: If your password has symbols (@, #, :, /, etc.), URL-encode them.');
          console.error('='.repeat(80) + '\n');

          process.exit(1);
          return;
        }

        const connectionString = uri || 'mongodb://127.0.0.1:27017/lenscraft_db';
        const dbName = process.env.MONGODB_DB_NAME || 'lenscraft_db';

        // Attach connection event listeners (only once)
        if (!mongoose.connection.listeners('disconnected').length) {
          mongoose.connection.on('disconnected', () => {
            // Only warn if we previously had a working connection
            if (hasConnectedOnce) {
              console.warn('⚠️  MongoDB connection lost. Mongoose driver will automatically attempt reconnection...');
            }
          });

          mongoose.connection.on('reconnected', () => {
            console.log('✓ MongoDB connection restored successfully.');
          });

          mongoose.connection.on('error', (err) => {
            console.error(`✗ MongoDB Runtime Error: ${err.message}`);
          });
        }

        const mongooseOptions = {
          serverSelectionTimeoutMS: 10000,
          maxPoolSize: 20,
          minPoolSize: 2,
          socketTimeoutMS: 45000,
          family: 4, // Prefer IPv4 to avoid DNS SRV IPv6 resolution delays on cloud networks
          dbName,
        };

          let attempt = 0;

          while (attempt < maxRetries) {
            attempt++;
            try {
              if (sourceKey) {
                console.log(`📡 Connecting to MongoDB via [${sourceKey}]: ${maskMongoUri(connectionString)}...`);
              } else {
                console.log(`📡 Connecting to local MongoDB: ${maskMongoUri(connectionString)}...`);
              }

              const conn = await mongoose.connect(connectionString, mongooseOptions);
              hasConnectedOnce = true;

              console.log(`✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
              return conn;
            } catch (error) {
              console.error(`✗ MongoDB Connection Attempt ${attempt}/${maxRetries} Failed: ${error.message}`);

              if (attempt < maxRetries) {
                console.log(`⏳ Waiting ${retryDelayMs / 1000}s before retry...`);
                await new Promise((res) => setTimeout(res, retryDelayMs));
              } else {
                console.error(`\n✗ All ${maxRetries} MongoDB connection attempts exhausted.`);
                console.error(`  Active URI: ${maskMongoUri(connectionString)}`);
                console.error(`  Please verify your MongoDB Atlas cluster state and Network Access whitelist (0.0.0.0/0).\n`);

                if (isProduction) {
                  console.error('Fatal error in production: exiting process.');
                  process.exit(1);
                  return;
                }
              }
            }
          }
        };
