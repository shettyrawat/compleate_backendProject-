import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkPP() {
    await connectDB();
    try {
        const user = await User.findOne({ email: 'shettyrwt6@gmail.com' });
        console.log('START_DEBUG');
        console.log('EMAIL:', user?.email);
        console.log('PP_URL:', user?.profilePicture);
        console.log('GOOGLE_ID:', user?.googleId);
        console.log('END_DEBUG');
    } catch (error) {
        console.error('Failed to check user:', error);
    } finally {
        await mongoose.connection.close();
    }
}

checkPP();
