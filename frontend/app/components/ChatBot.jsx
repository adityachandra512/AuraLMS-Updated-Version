"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Add welcome message when chat is opened
        if (isOpen && messages.length === 0) {
            setMessages([{
                text: "Hello! I'm your AI Assitant, powered by Gemini. I can help you with:\n• Career guidance\n• Interview preparation\n• Study techniques\n• Stress management\n• Course selection\nHow can I assist you today?",
                sender: 'bot'
            }]);
        }

        // Sync theme with system preference
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('compilerTheme');
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, [isOpen]);

    // Listen for theme changes
    useEffect(() => {
        const handleStorageChange = () => {
            const newTheme = localStorage.getItem('compilerTheme');
            if (newTheme) {
                setTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        setIsLoading(true);
        setMessages([...messages, { text: input, sender: 'user' }]);
        
        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: input,
                    context: "You are an AI assistant specializing in educational and career guidance. Provide supportive, constructive advice to help students with their academic and professional development. Focus on practical solutions and encouragement."
                })
            });
            
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                text: "I apologize, but I'm having trouble connecting. Please try again or rephrase your question.", 
                sender: 'bot' 
            }]);
        }
        
        setIsLoading(false);
        setInput('');
    };

    const suggestedQuestions = [
        "How can I prepare for interviews?",
        "Tips for managing study stress?",
        "Help me choose a career path",
        "How to improve my study habits?"
    ];

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                    text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300 
                    animate-bounce"
                >
                    <MessageCircle size={28} />
                </button>
            ) : (
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl w-[400px] h-[600px] flex flex-col 
                transform transition-all duration-300 animate-slideIn`}>
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl 
                    flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full">
                                <Bot size={24} className="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">AuraLMS AI Student Assistant</h3>
                                <p className="text-xs text-blue-100 opacity-80">Online | Ready to help</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-600 p-2 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        {messages.map((msg, index) => (
                            <div key={index} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} 
                                animate-fadeIn`}
                            >
                                <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${msg.sender === 'user' 
                                    ? theme === 'dark' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-blue-500 text-white'
                                    : theme === 'dark'
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-white text-gray-800'}`}>
                                    <p className="whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {messages.length === 1 && (
                            <div className="space-y-4">
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Try asking one of these:</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestedQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setInput(question);
                                                handleSend();
                                            }}
                                            className={`text-left p-3 rounded-lg text-sm transition-colors ${theme === 'dark' 
                                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                                : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'}`}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' 
                                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                                    : 'bg-gray-100 text-gray-800 placeholder-gray-500'}`}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className={`p-2 rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
                                ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;