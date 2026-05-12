"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Settings, FileText } from "lucide-react";

export const DataSections = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Modelos Section */}
      <section id="models" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-brand-primary/20 p-2 text-brand-primary">
            <Layers size={20} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Modelos</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold mb-2 text-white">Lamas Fijas</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Mantiene un ángulo inamovible. Modelos rectos (I), curvos (C, S), en Z y vanguardistas (V-5, V-50).
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold mb-2 text-white">Fija-Móvil</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Ángulo fijado en instalación (30º, 45º, 90º). Elípticas (O-120, A-150) y rectangulares (R-100).
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold mb-2 text-white">Lamas Móviles</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Giro dinámico para control solar activo. Híbridos Aluminio/PVC y alto rendimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Sistemas Section */}
      <section id="systems" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-brand-secondary/20 p-2 text-brand-secondary">
            <Settings size={20} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Sistemas</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold mb-3">Anclaje</h3>
            <ul className="space-y-2 text-white/60 text-xs">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-primary rounded-full shrink-0"></span> Enmarcadas</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-primary rounded-full shrink-0"></span> Soportes dobles</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-primary rounded-full shrink-0"></span> Pinzas articuladas</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-primary rounded-full shrink-0"></span> Directo a perfil</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold mb-3">Control</h3>
            <ul className="space-y-2 text-white/60 text-xs">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-secondary rounded-full shrink-0"></span> <strong>Manual:</strong> Zamak, PVC</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-secondary rounded-full shrink-0"></span> <strong>Motorizado:</strong> Lineales 24V</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 mt-1 bg-brand-secondary rounded-full shrink-0"></span> <strong>Domótica:</strong> Total</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Otros Datos Section */}
      <section id="other" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2 text-white">
            <FileText size={20} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Otros Datos</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="font-bold text-sm mb-1 text-brand-primary">Materiales</div>
            <p className="text-xs text-white/60 leading-relaxed">Aluminio 6060/6063 T5 y PVC técnico.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="font-bold text-sm mb-1 text-brand-primary">Acabados</div>
            <p className="text-xs text-white/60 leading-relaxed">Lacado, Anodizado, Foliado y Sublimación.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="font-bold text-sm mb-1 text-brand-primary">Normativa</div>
            <p className="text-xs text-white/60 leading-relaxed">UNE-EN 13659:2016.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
