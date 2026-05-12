"use client";

import React from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 z-50 w-full glass">
      <div className="mx-auto flex w-[95%] max-w-[1600px] items-center justify-between px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-brand-primary p-1">
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

        {/* Desktop Nav - Simplificado a dos pestañas */}
        <nav className="hidden items-center gap-12 md:flex">
          <a href="#assistant" className="text-sm font-black uppercase tracking-widest text-brand-primary transition-all hover:scale-105 active:scale-95">
            Asistente
          </a>
          
          <div className="relative group">
            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/70 transition-all group-hover:text-white group-hover:scale-105">
              Datos
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl bg-brand-card/95 border border-white/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all backdrop-blur-xl shadow-2xl shadow-black/50">
              <a href="#models" className="block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all">
                Modelos
              </a>
              <a href="#systems" className="block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all">
                Sistemas
              </a>
              <a href="#other" className="block px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all">
                Otros Datos
              </a>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-brand-bg/98 absolute top-full left-0 w-full p-8 md:hidden border-b border-white/10 backdrop-blur-xl"
        >
          <nav className="flex flex-col gap-8">
            <a href="#assistant" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase tracking-tighter text-brand-primary">
              Asistente IA
            </a>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/5 pb-2">Secciones Técnicas</p>
              <div className="grid grid-cols-1 gap-4 pl-4">
                <a href="#models" onClick={() => setIsOpen(false)} className="text-lg font-bold text-white/80">Modelos</a>
                <a href="#systems" onClick={() => setIsOpen(false)} className="text-lg font-bold text-white/80">Sistemas</a>
                <a href="#other" onClick={() => setIsOpen(false)} className="text-lg font-bold text-white/80">Otros Datos</a>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};
