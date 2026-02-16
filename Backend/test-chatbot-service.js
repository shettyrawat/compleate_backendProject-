import { handleChatMessage } from './src/services/chatbot.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const testChat = async () => {
    console.log('--- Testing AI Chatbot Service ---');

    try {
        console.log('\n1. Testing single message (No history)...');
        const response1 = await handleChatMessage('Hello, who are you?');
        console.log('AI Response:', response1);

        console.log('\n2. Testing multi-turn message (With history)...');
        const history = [
            { role: 'user', content: 'What is your favorite programming language?' },
            { role: 'ai', content: 'As an AI, I don\'t have personal favorites, but JavaScript and Python are very popular for web and AI development.' }
        ];
        const response2 = await handleChatMessage('Tell me more about the first one.', history);
        console.log('AI Response:', response2);

        console.log('\nTest completed successfully!');
    } catch (error) {
        console.error('\nTest failed:', error);
    }
};

testChat();
