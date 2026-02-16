import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user.
 * @param {string} id - The user ID to include in the payload.
 * @returns {string} Signed JWT token.
 */
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};
