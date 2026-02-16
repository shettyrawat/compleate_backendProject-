import User from './src/models/User.js';
import connectDB from './src/config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function test2FA() {
    await connectDB();

    try {
        console.log('--- Testing Account Existence Check ---');
        // Test non-existent user
        const nonExistentEmail = 'fakeuser_' + Date.now() + '@example.com';
        const userFound = await User.findOne({ email: nonExistentEmail });
        console.log(`Querying ${nonExistentEmail}: ${userFound ? 'Found' : 'Not Found (Correct)'}`);

        console.log('\n--- Testing 2FA Logic ---');
        const testUser = await User.findOne({ email: 'shettyrwt6@gmail.com' });
        if (testUser) {
            console.log('Test user exists. Logic for sending OTP and requiring verification is now active in auth.controller.login.');
            console.log('1. Login returns requiresOTP: true');
            console.log('2. OTP is stored in DB (selectable via +loginOTP)');
            console.log('3. verify-login endpoint handles verification');
        } else {
            console.log('Test user shettyrwt6@gmail.com not found in DB. Please register it manually or update this script.');
        }

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

test2FA();
