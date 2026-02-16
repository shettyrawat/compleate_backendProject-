import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// node scripts/make-admin.js your-email@example.com
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

import User from '../src/models/User.js';

const makeAdmin = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address.');
        console.log('Usage: node scripts/make-admin.js user@example.com');
        process.exit(1);
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found.`);
            await mongoose.connection.close();
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log('-----------------------------------');
        console.log(`SUCCESS: User ${user.username} (${email}) is now an ADMIN.`);
        console.log('-----------------------------------');

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error promoting user:', error.message);
        process.exit(1);
    }
};

makeAdmin();
