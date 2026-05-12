"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChatBox } from "@/components/Assistant/ChatBox";
import { DataSections } from "@/components/Technical/DataSections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* Hero Intro Compacto */}
      <section className="relative pt-12 pb-6 flex-shrink-0">
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
        <div className="absolute top-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-secondary/10 blur-[100px]" />

        <div className="mx-auto w-[95%] max-w-[1800px] px-4 text-center lg:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter"
            >
              CONSULTOR TÉCNICO <span className="text-brand-primary">SAXUN</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-white/60 max-w-xl text-sm md:text-base font-medium"
            >
              Resolución de consultas técnicas, medidas y normativas con Inteligencia Artificial.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="flex-1 w-[95%] max-w-[1800px] mx-auto pb-12 flex flex-col lg:flex-row gap-8 overflow-hidden h-full">
        
        {/* Left Sidebar (Technical Sections) */}
        <aside className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 h-fit lg:h-[calc(100vh-160px)] lg:sticky lg:top-4 bg-brand-card/30 border border-white/5 rounded-3xl p-6 overflow-y-auto scrollbar-hide hidden md:block backdrop-blur-sm">
          <DataSections />
        </aside>

        {/* Mobile DataSections Toggle / Info */}
        <div className="md:hidden w-full bg-brand-card/30 border border-white/5 rounded-3xl p-4 backdrop-blur-sm">
          <p className="text-white/60 text-xs text-center font-medium">Las secciones técnicas están disponibles en versión de escritorio.</p>
        </div>

        {/* Assistant Main Area */}
        <main className="flex-1 min-h-[600px] lg:h-[calc(100vh-160px)]">
          <ChatBox />
        </main>
      </div>
    </div>
  );
}
