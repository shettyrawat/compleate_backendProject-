import { handleChatMessage } from './src/services/chatbot.service.js';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

async function test() {
    console.log('--- Chatbot Logic Test ---');
    console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);
    try {
        const reply = await handleChatMessage("Hello, test message.");
        console.log('Reply from AI:', reply);
    } catch (error) {
        console.error('ERROR OCCURRED. Writing to error_trace.txt');
        fs.writeFileSync('error_trace.txt', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }
}
test();
