import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

import User from '../src/models/User.js';

const createUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const existing = await User.findOne({ email: 'test@example.com' });
        if (existing) {
            await User.deleteOne({ email: 'test@example.com' });
            console.log('Deleted existing test user');
        }

        const user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('User created:', user.username);

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

createUser();
