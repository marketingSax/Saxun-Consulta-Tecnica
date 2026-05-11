"use client";

import React from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#assistant" className="text-sm font-bold uppercase tracking-widest text-brand-primary transition-colors hover:text-white">Asistente</a>
          <a href="#models" className="text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white">Modelos</a>
          <a href="#systems" className="text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white">Sistemas</a>
          <a href="#other" className="text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-white">Otros Datos</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-bg/95 absolute top-full left-0 w-full p-6 md:hidden border-b border-white/10"
        >
          <nav className="flex flex-col gap-6">
            <a href="#assistant" onClick={() => setIsOpen(false)} className="text-lg font-bold text-brand-primary">Asistente IA</a>
            <a href="#models" onClick={() => setIsOpen(false)} className="text-lg font-bold">Modelos</a>
            <a href="#systems" onClick={() => setIsOpen(false)} className="text-lg font-bold">Sistemas</a>
            <a href="#other" onClick={() => setIsOpen(false)} className="text-lg font-bold">Otros Datos</a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};
