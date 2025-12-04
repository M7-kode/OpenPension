
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, X, Loader2, Sparkles } from 'lucide-react';

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bonjour ! En tant que L'Assistant OpenPension, je suis ravi de vous guider sur le fonctionnement d'un transfert de pension via notre plateforme basée sur Mojaloop. Je peux vous détailler les phases de Découverte, d'Accord et de Transfert.", timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getAIResponse(userMsg.text, "Portfolio Context");
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Erreur de connexion.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[90vw] md:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[600px] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-indigo-900 to-slate-800 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Bot size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Assistant OpenPension</h3>
            <p className="text-xs text-indigo-300 flex items-center gap-1">
              <Sparkles size={10} /> Expert Mojaloop
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-sm' 
                : 'bg-slate-700 text-slate-200 rounded-bl-sm border border-slate-600'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
              <span className="text-xs text-slate-400">Rédaction de la réponse...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-700 bg-slate-800 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question technique..."
            className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatPanel;
