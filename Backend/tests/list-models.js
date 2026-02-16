import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const listModels = async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        console.log('--- Listing Available Gemini Models ---');
        // Note: The newer versions of the library might not have listModels on the genAI instance directly 
        // but we can try common patterns or check documentation if this fails.
        // Actually, in @google/generative-ai ^0.21.0+, listModels is not a standard export on the genAI main class usually.
        // Let's try to just test a very safe model name first or use a known one.

        // Wait, the error said: "v1beta, or is not supported for generateContent. Call ListModels to see the list of available models"
        // Let's try to call the API via fetch as a fallback to list models if needed.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Failed to list models:', error);
    }
};

listModels();
