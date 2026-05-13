import React from "react";
import { Mail, Phone, Globe } from "lucide-react";


export const Footer = () => {
  return (
    <footer className="bg-brand-card border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-black text-vibrant">SAXUN</h3>
            <p className="max-w-xs text-white/50 text-sm leading-relaxed">
              Sistemas avanzados de protección solar y cerramientos para arquitectura moderna. 
              Innovación y diseño en cada detalle.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-brand-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-brand-primary">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-brand-accent transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-white/50 hover:text-brand-accent transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-white/50 hover:text-brand-accent transition-colors"><Globe size={20} /></a>
            </div>

          </div>
        </div>
        
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Saxun S.A. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
