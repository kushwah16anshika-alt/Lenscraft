import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'lenscraft_fallback_secret_key_2025',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};
