"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChatBox } from "@/components/Assistant/ChatBox";
import { DataSections } from "@/components/Technical/DataSections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Intro */}
      <section className="relative overflow-hidden pt-24 pb-4">
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-secondary/10 blur-[120px]" />

        <div className="mx-auto w-[95%] max-w-[1600px] px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            CONSULTOR TÉCNICO <span className="text-brand-primary">SAXUN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/60 max-w-2xl mx-auto"
          >
            Pregunta a la IA sobre cualquier modelo, sistema, material o normativa presente en el Dossier de Celosías.
          </motion.p>
        </div>
      </section>

      {/* Assistant is the main tool */}
      <ChatBox />

      {/* Restructured Info Sections */}
      <DataSections />
    </div>
  );
}
