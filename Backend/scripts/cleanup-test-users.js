import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function cleanupTestUsers() {
    await connectDB();

    try {
        console.log('Searching for test users...');

        // Find users starting with 'testuser_'
        const result = await User.deleteMany({
            $or: [
                { username: /^testuser_/ },
                { email: /^testuser_/ }
            ]
        });

        console.log(`Successfully deleted ${result.deletedCount} test accounts.`);

    } catch (error) {
        console.error('Cleanup failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

cleanupTestUsers();
