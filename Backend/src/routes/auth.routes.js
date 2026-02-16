import express from 'express';
const router = express.Router();
import { register, login, getMe, googleLogin, updateProfile, requestPasswordOTP, resetPassword, verifyEmail, resendOTP, verifyLoginOTP, requestLoginOTP } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/verify-login', verifyLoginOTP);
router.post('/request-login-otp', requestLoginOTP);
router.post('/google', googleLogin);
router.get('/profile', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/request-otp', requestPasswordOTP);
router.put('/reset-password', resetPassword);

export default router;
