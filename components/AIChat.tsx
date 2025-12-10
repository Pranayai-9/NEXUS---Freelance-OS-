import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, StopCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello, Alex. I am Nexus AI. How can I assist with your freelance operations today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use the Google GenAI SDK
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
            {
                role: 'user',
                parts: [{ text: userMessage.text }]
            }
        ],
        config: {
          systemInstruction: "You are Nexus AI, a sophisticated operating system assistant for a high-end freelance professional. Your tone is professional, concise, and friendly. You help with project management, financial forecasting, and technical questions.",
        }
      });

      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I processed that, but have no textual response.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I encountered a neural link error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-200/40 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/40 bg-white/60 backdrop-blur-md z-10">
        <div className="p-2 bg-violet-100 rounded-lg border border-violet-200">
            <Sparkles size={18} className="text-violet-600" />
        </div>
        <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Nexus AI <span className="text-xs font-normal text-violet-600 ml-2 border border-violet-200 px-1.5 py-0.5 rounded-full bg-violet-50">v3.0 PRO</span></h2>
            <p className="text-xs text-slate-500">Powered by Gemini 3 Pro</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'user' 
                ? 'bg-violet-600' 
                : 'bg-white border border-slate-200'
            }`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={16} className="text-violet-500" />}
            </div>
            
            <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-white border border-white/50 text-slate-700 rounded-tl-sm backdrop-blur-sm'
                }`}>
                    {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-violet-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 h-10 px-4 bg-white border border-white/50 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white/60 border-t border-white/40 backdrop-blur-md z-10">
        <div className="relative max-w-4xl mx-auto">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nexus anything..."
                disabled={isLoading}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-5 pr-14 text-slate-800 placeholder-slate-400 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all shadow-lg shadow-slate-200/50"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg transition-all"
            >
                {isLoading ? <StopCircle size={20} className="animate-pulse"/> : <Send size={20} />}
            </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3">
            Nexus AI can make mistakes. Verify critical financial data.
        </p>
      </div>
    </div>
  );
};