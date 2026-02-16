import { generateChatResponse, generateAIResponse } from '../config/fireworks.js';

/**
 * Handle individual chatbot messages with memory
 */
export const handleChatMessage = async (message, history = []) => {
    try {
        const systemInstruction = `You are a helpful AI Assistant for an ATS Resume & Job Portal.
        Your primary role is to:
        1. Assist users with questions about the portal, resumes, and job searching.
        2. Provide general assistance on any topic while maintaining a professional and encouraging tone.
        3. Be concise and helpful.`;

        // If history exists, use the multi-turn chat response helper
        if (history.length > 0) {
            return await generateChatResponse(history, message);
        }

        // Otherwise, use single-turn generation with system instruction
        const response = await generateAIResponse(`${systemInstruction}\n\nUser Question: ${message}`);
        return response;
    } catch (error) {
        console.error('Chatbot Service Error Detail:', error);
        throw error;
    }
};
