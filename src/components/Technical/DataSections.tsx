"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Settings, FileText } from "lucide-react";

export const DataSections = () => {
  return (
    <div className="flex flex-col">
      {/* Modelos Section */}
      <section id="models" className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="rounded-xl bg-brand-primary/20 p-3 text-brand-primary">
              <Layers size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Modelos de Celosías</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Lamas Fijas</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Mantiene un ángulo inamovible. Incluye modelos rectos (Lama I), curvos (Lama C, S), en forma de Z y sistemas especiales para fachadas vanguardistas (V-5, V-50).
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Fija-Móvil</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Permite fijar un ángulo durante la instalación (30º, 45º, 90º). Destacan las elípticas (O-120, A-150) y rectangulares (R-100, R-150).
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Lamas Móviles</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Giro dinámico para control solar activo. Modelos híbridos Aluminio/PVC (AP-140) y de alto rendimiento (R4-250, R4-300).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sistemas Section */}
      <section id="systems" className="py-24 px-6 bg-brand-card/30 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="rounded-xl bg-brand-secondary/20 p-3 text-brand-secondary">
              <Settings size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Sistemas y Accionamientos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold mb-4">Sistemas de Anclaje</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Enmarcadas (con perfil troquelado)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Sobre soportes dobles troquelados</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Con pinzas articuladas de aluminio</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Anclaje lateral mediante testeros</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Directo a perfil estructural o portante</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-bold mb-4">Mecanismos de Control</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span> <strong>Manual:</strong> Mando Zamak, Mando PVC, Mando Inox</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span> <strong>Manual Especial:</strong> Rotary, Mando Body</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span> <strong>Motorizado:</strong> Motores lineales 24V (Ej: 180mm, 300mm)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span> <strong>Domótica:</strong> Integración total con sistemas inteligentes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Otros Datos Section */}
      <section id="other" className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="rounded-xl bg-white/10 p-3 text-white">
              <FileText size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Otros Datos Técnicos</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-lg mb-2 text-brand-primary">Materiales</div>
              <p className="text-xs text-white/60 leading-relaxed">Aluminio de extrusión (aleación 6060/6063 T5) para máxima resistencia estructural y PVC técnico en modelos específicos.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-lg mb-2 text-brand-primary">Acabados</div>
              <p className="text-xs text-white/60 leading-relaxed">Lacado (Qualicoat/Qualimarine), Anodizado resistente, Foliado (imitación madera) y Sublimación.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-lg mb-2 text-brand-primary">Normativa</div>
              <p className="text-xs text-white/60 leading-relaxed">Fabricación y ensayo bajo la normativa UNE-EN 13659:2016 (resistencia al viento y confort térmico).</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-lg mb-2 text-brand-primary">Iluminación</div>
              <p className="text-xs text-white/60 leading-relaxed">Integración LED opcional en lamas rectangulares y especiales (R-100 LED, R-130 LED, V-90 LED).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
