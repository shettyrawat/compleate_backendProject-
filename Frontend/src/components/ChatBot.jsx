import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import { chatbotService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { ButtonLoader } from './Loader';

const ChatBot = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hi! I am your AI Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Do not show chatbot if user is not logged in
    if (!user) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await chatbotService.sendMessage(input, messages.slice(-5));
            setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Bubble */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    display: isOpen ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
            >
                <FiMessageCircle size={30} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-card"
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            width: '380px',
                            height: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 1000,
                            padding: 0,
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            background: 'var(--accent)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }}></div>
                                <span style={{ fontWeight: '600' }}>AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                            >
                                <FiMinimize2 size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                background: 'rgba(255,255,255,0.02)'
                            }}
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    style={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '16px',
                                        background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-primary)',
                                        color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                                        fontSize: '0.9rem',
                                        border: msg.role === 'ai' ? '1px solid var(--glass-border)' : 'none',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {loading && (
                                <div style={{ alignSelf: 'flex-start', padding: '0.8rem 1rem', borderRadius: '16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ButtonLoader />
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        style={{ fontSize: '0.9rem' }}
                                    >
                                        Typing...
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSend}
                            style={{
                                padding: '1rem',
                                background: 'var(--bg-primary)',
                                borderTop: '1px solid var(--glass-border)',
                                display: 'flex',
                                gap: '0.8rem'
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    padding: '0.8rem 1rem',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <FiSend size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
