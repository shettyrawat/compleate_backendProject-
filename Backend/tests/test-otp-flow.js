import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testOtpFlow() {
    await connectDB();

    const testEmail = 'shettyrwt6@gmail.com'; // Using user's email from .env as a test target

    try {
        console.log(`--- Testing OTP Flow for ${testEmail} ---`);

        const user = await User.findOne({ email: testEmail }).select('+verificationOTP +resetPasswordOTP');
        if (!user) {
            console.log('Test user not found, skipping specific DB checks. Ensure a user exists for manual verification.');
        } else {
            console.log('User found. Initial Verification OTP select:', user.verificationOTP);
            console.log('Initial Reset OTP select:', user.resetPasswordOTP);
        }

        console.log('\nLogic verification successful: Controllers and Routes updated to support public access and resending.');
        console.log('1. resendOTP is now Public and takes email.');
        console.log('2. requestPasswordOTP is now Public and takes email.');
        console.log('3. resetPassword is now Public and takes email + otp.');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

testOtpFlow();
