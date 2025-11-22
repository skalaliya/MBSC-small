import React from 'react';
import { Page } from '../types';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-slate-900 h-[650px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/melbourne-hero.jpg"
          alt="Moomba Engineering Site"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded border border-amber-500/50 bg-amber-500/10 mb-6">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">ISO 9001 Certified</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Precision Engineering.<br />
            <span className="text-teal-500">Australian Tough.</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-2xl">
            MBSC Australia delivers tier-one engineering, testing, and inspection services. From the Pilbara to the city, we ensure structural integrity and compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate(Page.SERVICES)}
              className="inline-flex items-center justify-center bg-teal-700 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-teal-600 transition-all duration-300 shadow-lg"
            >
              View Our Services
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
            
            <button
              onClick={() => onNavigate(Page.TRAINING)}
              className="inline-flex items-center justify-center bg-amber-500 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all duration-300 shadow-lg"
            >
              Explore Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;