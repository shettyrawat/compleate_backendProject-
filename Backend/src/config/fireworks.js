import dotenv from 'dotenv';

dotenv.config();

const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY;
const FIREWORKS_BASE_URL = 'https://api.fireworks.ai/inference/v1/chat/completions';

/**
 * Helper to generate text from a prompt using Fireworks AI
 * @param {string} prompt - The prompt to send to Fireworks
 * @param {string} model - Model name (default: accounts/fireworks/models/gpt-oss-120b)
 */
export const generateAIResponse = async (prompt, model = 'accounts/fireworks/models/gpt-oss-120b') => {
    try {
        const response = await fetch(FIREWORKS_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FIREWORKS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Fireworks AI request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Fireworks AI Error:', error);
        throw error;
    }
};

/**
 * Helper to handle multi-turn chat sessions
 * @param {Array} history - Array of previous messages [{ role: "user", content: "..." }, ...]
 * @param {string} message - Next message
 * @param {string} model - Model name
 */
export const generateChatResponse = async (history, message, model = 'accounts/fireworks/models/gpt-oss-120b') => {
    try {
        const messages = [
            ...history.map(h => ({
                role: h.role === 'ai' ? 'assistant' : h.role, // Handle different role naming conventions
                content: h.content || (h.parts && h.parts[0]?.text) || ''
            })),
            { role: 'user', content: message }
        ];

        const response = await fetch(FIREWORKS_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${FIREWORKS_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Fireworks AI chat failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Fireworks AI Chat Error:', error);
        throw error;
    }
};
