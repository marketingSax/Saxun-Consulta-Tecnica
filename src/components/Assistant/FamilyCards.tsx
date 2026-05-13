"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Layers, MousePointer2, Thermometer } from "lucide-react";

interface FamilyCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  prompt: string;
}

const families: FamilyCard[] = [
  {
    id: "enmarcadas",
    title: "Fijas Enmarcadas",
    description: "Lamas integradas en marco perimetral (D-5).",
    icon: Box,
    prompt: "¿Qué modelos hay de celosías fijas enmarcadas y cuáles son sus medidas máximas?"
  },
  {
    id: "troqueladas",
    title: "Fijas Troqueladas",
    description: "Sistemas sobre soportes (Z, C, I, V-5).",
    icon: Layers,
    prompt: "Dime las especificaciones de las celosías fijas sobre soporte troquelado (Modelos Z, C, I)."
  },
  {
    id: "orientables",
    title: "Orientables",
    description: "Lamas elípticas con giro dinámico (O-120 a O-400).",
    icon: MousePointer2,
    prompt: "¿Cuáles son las opciones de celosías orientables elípticas y sus rangos de giro?"
  },
  {
    id: "pvc",
    title: "Sistemas PVC",
    description: "Lamas técnicas de PVC de alta resistencia.",
    icon: Thermometer,
    prompt: "Muéstrame las características técnicas y medidas máximas de las celosías de PVC (Z-PVC, 231, 232)."
  }
];

interface FamilyCardsProps {
  onSelect: (prompt: string) => void;
}

export const FamilyCards: React.FC<FamilyCardsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">FAMILIAS</h3>
        <p className="text-[9px] text-white/20 font-bold uppercase">Consultas específicas</p>
      </div>
      
      {families.map((family, index) => (
        <motion.button
          key={family.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(family.prompt)}
          className="group relative flex flex-col items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all text-left"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-colors">
            <family.icon size={18} className="text-white/40 group-hover:text-brand-primary" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-brand-primary transition-colors">
              {family.title}
            </h4>
            <p className="text-[10px] text-white/40 leading-relaxed mt-1 group-hover:text-white/60">
              {family.description}
            </p>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.8)]" />
          </div>
        </motion.button>
      ))}
    </div>
  );
};
