import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { generateResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to MBSC Australia. I am the Engineer AI Assistant. How can I assist you with our services or training courses today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiText = await generateResponse(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: aiText, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="hidden md:inline font-semibold">Ask Engineer AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[90vw] md:w-[400px] h-[500px] flex flex-col border border-slate-200">
          {/* Header */}
          <div className="bg-slate-900 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1.5 rounded-full">
                <Bot className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">MBSC Engineer AI</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-teal-700 text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg rounded-bl-none p-3 shadow-sm">
                  <Loader2 className="h-5 w-5 text-teal-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Training, NDT, or Renting..."
                className="flex-1 bg-slate-100 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-slate-900 text-white p-2 rounded-md hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;