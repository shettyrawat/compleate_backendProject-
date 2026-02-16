import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function listUsers() {
    await connectDB();
    try {
        const users = await User.find({}, 'username email isVerified profilePicture');
        console.log('--- Current Users in DB ---');
        console.log(JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Failed to list users:', error);
    } finally {
        await mongoose.connection.close();
    }
}

listUsers();
