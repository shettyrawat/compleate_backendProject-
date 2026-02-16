import * as chatbotService from '../services/chatbot.service.js';

// @desc    Send a message to the AI chatbot
// @route   POST /api/chatbot
// @access  Public (or Private if you want to restrict)
export const chat = async (req, res, next) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const reply = await chatbotService.handleChatMessage(message, history);
        res.json({ reply });
    } catch (error) {
        next(error);
    }
};
