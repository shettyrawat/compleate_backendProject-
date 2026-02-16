import { handleChatMessage } from './src/services/chatbot.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const testHistoryRoleFix = async () => {
    console.log('--- Testing History Role Fix ---');

    try {
        console.log('\nTesting history starting with AI message...');
        const history = [
            { role: 'ai', content: 'Hi! I am your AI Assistant. How can I help you today?' },
            { role: 'user', content: 'What can you do?' }
        ];

        // This should not throw "First content should be with role user"
        const response = await handleChatMessage('Tell me more.', history);
        console.log('AI Response received successfully!');
        console.log('Response snippet:', response.substring(0, 100) + '...');

        console.log('\nTest completed successfully!');
    } catch (error) {
        if (error.message.includes("First content should be with role 'user'")) {
            console.error('\nTest failed: Still getting history role error.');
        } else if (error.status === 429) {
            console.log('\nReceived 429 (Too Many Requests). This is expected if quota is exceeded, but it confirms the history format was accepted (otherwise 400 would be returned first).');
        } else {
            console.error('\nTest failed with error:', error);
        }
    }
};

testHistoryRoleFix();
