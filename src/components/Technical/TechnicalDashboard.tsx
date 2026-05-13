"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Settings, FileText, Cpu, Ruler, Info, ShieldCheck } from "lucide-react";
import { DataSections } from "./DataSections";

const technicalPills = [
  { label: "Lama D-5", value: "Longitud Máx 950mm", icon: Ruler },
  { label: "Lama Z (Alu)", value: "Soporte Máx 2.000mm", icon: Ruler },
  { label: "Lama Z (PVC)", value: "Soporte Máx 1.000mm", icon: Ruler },
  { label: "O-210 / O-300", value: "Pinzas hasta 3.500mm", icon: Settings },
  { label: "Vuelo Máx (Z)", value: "Hasta 300mm", icon: Ruler },
  { label: "Normativa", value: "UNE-EN 13659:2016", icon: ShieldCheck },
  { label: "Material", value: "Aluminio 6060/6063 T5", icon: Cpu },
  { label: "Giro R-400", value: "0º a 150º dinámico", icon: Settings },
  { label: "Acabados", value: "Qualicoat / Qualimarine", icon: Info },
  { label: "V-5 Clipado", value: "Directo a perfil", icon: Layers },
];

export const TechnicalDashboard = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Píldoras de Información Rápida */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
            Píldoras Técnicas Destacadas
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {technicalPills.map((pill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-all hover:bg-brand-primary/5 cursor-default"
            >
              <div className="flex items-center gap-3 mb-2">
                <pill.icon size={14} className="text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-wider text-white/30 group-hover:text-brand-primary/70 transition-colors">
                  {pill.label}
                </span>
              </div>
              <p className="text-sm font-bold text-white leading-tight">
                {pill.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Secciones Detalladas (Adaptadas de DataSections) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="p-8 rounded-3xl bg-brand-card/20 border border-white/5 backdrop-blur-sm">
            <DataSections />
          </div>
        </div>
        
        <aside className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-4">Aviso de Medidas</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Las medidas máximas indicadas están calculadas para una presión de viento estándar. Para proyectos en zonas costeras o de alta exposición, consulte el departamento técnico.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Documentación</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <span className="text-white/60 group-hover:text-white">Manual de Montaje</span>
                <FileText size={14} className="text-white/20" />
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <span className="text-white/60 group-hover:text-white">Ficha Técnica Lama Z</span>
                <FileText size={14} className="text-white/20" />
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <span className="text-white/60 group-hover:text-white">Certificado Qualicoat</span>
                <FileText size={14} className="text-white/20" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
