"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBox } from "@/components/Assistant/ChatBox";
import { FamilyCards } from "@/components/Assistant/FamilyCards";
import { TechnicalDashboard } from "@/components/Technical/TechnicalDashboard";
import { useTab } from "@/context/TabContext";

export default function Home() {
  const { activeTab } = useTab();
  const [externalPrompt, setExternalPrompt] = React.useState<string | undefined>(undefined);

  const handleFamilySelect = (prompt: string) => {
    // Usamos un pequeño hack con timestamp para forzar el re-render y ejecución del useEffect en ChatBox
    setExternalPrompt(`${prompt} `); 
    // Limpiamos después de un breve delay
    setTimeout(() => setExternalPrompt(undefined), 100);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#050505] overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {activeTab === "assistant" ? (
          <motion.div
            key="assistant"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Background Accents */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-secondary/5 blur-[120px]" />
            
            <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col md:flex-row">
              {/* Barra Lateral de Familias (Izquierda) */}
              <aside className="w-full md:w-[320px] xl:w-[380px] flex-shrink-0 border-r border-white/5 bg-white/[0.01] backdrop-blur-sm overflow-y-auto scrollbar-hide py-6">
                <FamilyCards onSelect={handleFamilySelect} />
              </aside>

              {/* Chat Principal */}
              <main className="flex-1 flex flex-col min-h-0">
                <ChatBox externalPrompt={externalPrompt} />
              </main>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 w-[95%] max-w-[1600px] mx-auto py-8 overflow-y-auto"
          >
            <div className="mb-12">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                Dossier <span className="text-brand-primary">Técnico</span>
              </h1>
              <p className="text-white/40 text-sm font-medium tracking-wide">
                Especificaciones, modelos y sistemas de celosías Saxun.
              </p>
            </div>
            <TechnicalDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
