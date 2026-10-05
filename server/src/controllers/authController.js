import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import { generateToken } from '../utils/generateToken.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ALL_ROLES, CREATIVE_ROLES, ROLES } from '../constants/roles.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new user / creative / admin
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, professionType, phone, location } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const assignedRole = role || ROLES.USER;

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
      phone: phone || '',
      location: location || { city: '', state: '', country: 'India' },
    });

    // If role is a creative (photographer, videographer, editor), initialize their profile
    if (CREATIVE_ROLES.includes(assignedRole)) {
      const proProfile = await ProfessionalProfile.create({
        user: user._id,
        professionType: professionType || assignedRole,
        specialties: [],
        portfolio: [],
      });

      user.professionalProfile = proProfile._id;
      await user.save();
    }

    const token = generateToken(user._id, user.role);

    return ApiResponse.success(
      res,
      'Registration successful',
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          location: user.location,
          isVerified: user.isVerified,
        },
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').populate('professionalProfile');

    if (!user) {
      return ApiResponse.error(res, 'Invalid email or password credentials', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, 'Invalid email or password credentials', 401);
    }

    if (!user.isActive) {
      return ApiResponse.error(res, 'Account is deactivated. Contact administration.', 403);
    }

    const token = generateToken(user._id, user.role);

    return ApiResponse.success(res, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        isVerified: user.isVerified,
        professionalProfile: user.professionalProfile,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate with Google OAuth / ID Token
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res, next) => {
  try {
    const { credential, accessToken, role, professionType } = req.body;

    if (!credential && !accessToken) {
      return ApiResponse.error(res, 'Google credential ID token or access token is required', 400);
    }

    let payload = null;

    if (credential) {
      // 1. Verify Google ID token (JWT from Google Identity Services / @react-oauth/google)
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID || undefined,
        });
        payload = ticket.getPayload();
      } catch (verifyErr) {
        // Fallback: If audience verification failed due to missing/mismatched GOOGLE_CLIENT_ID, verify via Google tokeninfo
        try {
          const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
          if (verifyRes.ok) {
            payload = await verifyRes.json();
          } else {
            console.error('Google token verification error:', verifyErr.message);
            return ApiResponse.error(res, 'Invalid or expired Google authentication token', 401);
          }
        } catch (fetchErr) {
          console.error('Google token fallback verification error:', fetchErr.message);
          return ApiResponse.error(res, 'Invalid or expired Google authentication token', 401);
        }
      }
    } else if (accessToken) {
      // 2. Fetch userinfo using Google access token
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!userInfoRes.ok) {
          throw new Error(`Google API returned status ${userInfoRes.status}`);
        }
        payload = await userInfoRes.json();
      } catch (fetchErr) {
        console.error('Google Userinfo fetch failed:', fetchErr.message);
        return ApiResponse.error(res, 'Failed to retrieve Google profile with access token', 401);
      }
    }

    if (!payload || !payload.email) {
      return ApiResponse.error(res, 'Could not retrieve a valid email from Google profile', 400);
    }

    const { email, sub: googleId, name, picture, email_verified } = payload;
    const normalizedEmail = email.toLowerCase();

    // Find user by googleId or email
    let user = await User.findOne({
      $or: [{ googleId }, { email: normalizedEmail }],
    }).populate('professionalProfile');

    const requestedRole = role && ALL_ROLES.includes(role) ? role : ROLES.USER;

    if (user) {
      // Existing user: Link googleId & verify email if needed
      let hasChanges = false;
      if (!user.googleId) {
        user.googleId = googleId;
        hasChanges = true;
      }
      if (user.authProvider !== 'google') {
        user.authProvider = 'google';
        hasChanges = true;
      }
      if (email_verified && !user.isVerified) {
        user.isVerified = true;
        hasChanges = true;
      }
      if (picture && (!user.avatar?.url || user.avatar.url.includes('unsplash.com'))) {
        user.avatar = {
          url: picture,
          publicId: '',
        };
        hasChanges = true;
      }

      if (hasChanges) {
        await user.save();
      }

      if (!user.isActive) {
        return ApiResponse.error(res, 'Account is deactivated. Contact administration.', 403);
      }
    } else {
      // Create new user authenticated via Google
      const generatedPassword = crypto.randomBytes(24).toString('hex');
      user = await User.create({
        name: name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        googleId,
        authProvider: 'google',
        role: requestedRole,
        avatar: {
          url: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          publicId: '',
        },
        isVerified: !!email_verified,
        password: generatedPassword,
        location: { city: '', state: '', country: 'India' },
      });

      // If user signed up as a Creative, initialize their professional profile
      if (CREATIVE_ROLES.includes(requestedRole)) {
        const proProfile = await ProfessionalProfile.create({
          user: user._id,
          professionType: professionType || requestedRole,
          specialties: [],
          portfolio: [],
        });

        user.professionalProfile = proProfile._id;
        await user.save();
      }
    }

    const token = generateToken(user._id, user.role);

    return ApiResponse.success(res, 'Google authentication successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone || '',
        location: user.location,
        isVerified: user.isVerified,
        professionalProfile: user.professionalProfile,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('professionalProfile');
    return ApiResponse.success(res, 'Current user retrieved', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (stateless JWT acknowledgment)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};
