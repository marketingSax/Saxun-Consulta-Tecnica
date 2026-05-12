"use client";

import React from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTab } from "@/context/TabContext";

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { activeTab, setActiveTab } = useTab();

  const handleTabChange = (tab: "assistant" | "data") => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    setActiveTab("data");
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black/10 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex w-[95%] max-w-[1600px] items-center justify-between px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleTabChange("assistant")}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-brand-primary p-1 shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)]">
            <Image 
              src="/logo.png" 
              alt="Saxun Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-vibrant">
            Saxun Dossier
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <button 
            onClick={() => handleTabChange("assistant")}
            className={`text-sm font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
              activeTab === "assistant" ? "text-brand-primary" : "text-white/40 hover:text-white"
            }`}
          >
            Asistente
          </button>
          
          <div className="relative group">
            <button 
              onClick={() => handleTabChange("data")}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all group-hover:scale-105 ${
                activeTab === "data" ? "text-brand-primary" : "text-white/40 group-hover:text-white"
              }`}
            >
              Datos
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl bg-black/90 border border-white/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <button 
                onClick={() => scrollToSection("models")}
                className="w-full text-left block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all"
              >
                Modelos
              </button>
              <button 
                onClick={() => scrollToSection("systems")}
                className="w-full text-left block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all"
              >
                Sistemas
              </button>
              <button 
                onClick={() => scrollToSection("other")}
                className="w-full text-left block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all"
              >
                Otros Datos
              </button>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-white/70 hover:text-white transition-colors p-2 rounded-lg bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/95 absolute top-full left-0 w-full p-8 md:hidden border-b border-white/10 backdrop-blur-3xl h-screen overflow-y-auto"
          >
            <nav className="flex flex-col gap-10">
              <button 
                onClick={() => handleTabChange("assistant")}
                className={`text-4xl font-black uppercase tracking-tighter text-left ${
                  activeTab === "assistant" ? "text-brand-primary" : "text-white/40"
                }`}
              >
                Asistente IA
              </button>
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/20 border-b border-white/5 pb-4">Secciones Técnicas</p>
                <div className="flex flex-col gap-6 pl-4">
                  <button 
                    onClick={() => scrollToSection("models")}
                    className={`text-2xl font-bold text-left ${activeTab === 'data' ? 'text-white' : 'text-white/40'}`}
                  >
                    Modelos
                  </button>
                  <button 
                    onClick={() => scrollToSection("systems")}
                    className={`text-2xl font-bold text-left ${activeTab === 'data' ? 'text-white' : 'text-white/40'}`}
                  >
                    Sistemas
                  </button>
                  <button 
                    onClick={() => scrollToSection("other")}
                    className={`text-2xl font-bold text-left ${activeTab === 'data' ? 'text-white' : 'text-white/40'}`}
                  >
                    Otros Datos
                  </button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
