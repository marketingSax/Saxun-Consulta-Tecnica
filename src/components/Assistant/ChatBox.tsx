"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Cpu } from "lucide-react";

import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatBox = ({ externalPrompt }: { externalPrompt?: string }) => {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "assistant", content: "Hola, soy tu asistente técnico de Saxun. ¿En qué puedo ayudarte hoy sobre nuestro dossier de celosías?" }
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLocalMode, setIsLocalMode] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (externalPrompt) {
      handleSend(externalPrompt);
    }
  }, [externalPrompt]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (forcedPrompt?: string) => {
    const userMsg = forcedPrompt || input.trim();
    if (!userMsg || isLoading) return;

    if (!forcedPrompt) setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg }),
      });

      const mode = response.headers.get("X-Assistant-Mode");
      setIsLocalMode(mode === "local");

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantContent
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error en el chat:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "assistant",
          content: "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo."
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="assistant" className="flex-1 flex flex-col h-full bg-[#050505]">
      {/* Mini Header Inside Chat */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">SISTEMA IA ACTIVO</span>
        </div>
        {isLocalMode && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Cpu size={10} className="text-orange-500" />
            <span className="text-[9px] font-black uppercase tracking-tighter text-orange-500">Reserva Local</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 md:px-12 py-10 space-y-10 scrollbar-hide"
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-6 max-w-[95%] lg:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`mt-1 flex-shrink-0 rounded-xl h-10 w-10 flex items-center justify-center border ${
                  msg.role === "user" ? "bg-brand-primary border-brand-primary shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.4)]" : "bg-white/5 border-white/10"
                }`}>
                  {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`rounded-2xl p-6 md:p-8 text-lg md:text-xl leading-relaxed prose prose-invert max-w-none shadow-2xl ${
                  msg.role === "user" 
                  ? "bg-white/10 border border-white/10 font-bold text-white" 
                  : "bg-white/[0.03] border border-white/5 font-medium text-white/90"
                }`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-6 max-w-[95%] lg:max-w-[75%] flex-row">
              <div className="mt-1 flex-shrink-0 rounded-xl h-10 w-10 flex items-center justify-center bg-white/5 border border-white/10">
                <Bot size={18} className="text-white/60" />
              </div>
              <div className="rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/5 flex items-center gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-2.5 h-2.5 bg-brand-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 md:px-12 py-10 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta cualquier dato técnico..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg md:text-xl font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-white/10 hidden md:block">
              ENTER PARA ENVIAR
            </div>
          </div>
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-brand-primary text-white rounded-2xl px-10 py-5 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)]"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
