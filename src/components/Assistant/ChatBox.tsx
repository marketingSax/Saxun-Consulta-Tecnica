"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";

import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatBox = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "assistant", content: "Hola, soy tu asistente técnico de Saxun. ¿En qué puedo ayudarte hoy sobre nuestro dossier de celosías?" }
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="pb-24 pt-8 px-6 bg-gradient-to-b from-transparent to-brand-secondary/10">
      <div className="mx-auto w-[95%] max-w-[1600px]">
        <div className="rounded-3xl border border-white/10 bg-brand-card overflow-hidden shadow-2xl shadow-brand-primary/10">
          {/* Header */}
          <div className="bg-white/5 p-6 md:p-8 flex items-center gap-4 border-b border-white/10">
            <div className="rounded-full bg-brand-primary p-3">
              <Bot size={28} />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-base md:text-lg">Asistente Técnico IA</h3>
              <p className="text-sm md:text-base text-brand-accent font-bold">Conectado al Dossier Saxun Completo</p>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="h-[500px] lg:h-[700px] xl:h-[800px] overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-4 max-w-[90%] lg:max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-2 flex-shrink-0 rounded-full p-2 h-10 w-10 flex items-center justify-center ${msg.role === "user" ? "bg-brand-secondary" : "bg-white/10"}`}>
                      {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`rounded-2xl p-5 md:p-6 text-base md:text-lg leading-relaxed prose prose-invert max-w-none ${msg.role === "user" ? "bg-brand-primary font-bold text-white" : "bg-white/5 border border-white/10 font-bold text-white prose-p:font-bold prose-li:font-bold prose-headings:font-black"}`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4 max-w-[90%] lg:max-w-[80%] flex-row">
                  <div className="mt-2 flex-shrink-0 rounded-full p-2 h-10 w-10 flex items-center justify-center bg-white/10">
                    <Bot size={18} className="text-white/60" />
                  </div>
                  <div className="rounded-2xl p-5 md:p-6 bg-white/5 border border-white/10 flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 md:p-8 border-t border-white/10 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta cualquier dato técnico (ej. medidas Lama O-300)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-base md:text-lg font-bold focus:outline-none focus:border-brand-primary transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-brand-primary rounded-xl px-8 py-4 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
