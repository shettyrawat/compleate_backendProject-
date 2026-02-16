import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    console.log('Testing Gemini API Connection...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent('Hi, say hello if you are working.');
        const response = await result.response;
        console.log('Reply from Gemini:', response.text());
        console.log('Gemini is working correctly.');
    } catch (error) {
        console.error('Gemini Test Error:', error.message);
        if (error.message.includes('API_KEY_INVALID')) {
            console.error('Reason: The API key provided is invalid.');
        } else if (error.message.includes('quota')) {
            console.error('Reason: API quota exceeded.');
        } else {
            console.error('Full Error:', error);
        }
    }
}

testGemini();
