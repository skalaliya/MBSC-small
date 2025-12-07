import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-slate-900 min-h-[500px] sm:h-[600px] lg:h-[650px] flex items-center py-12 sm:py-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/melbourne-hero.svg"
          alt="MBSC Australia Engineering Site - Mining and Infrastructure Projects"
          className="w-full h-full object-cover opacity-40 grayscale"
          width="1920"
          height="650"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1.5 rounded border border-amber-500/50 bg-amber-500/10 mb-4 sm:mb-6">
            <span className="text-amber-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">{t('hero.badge')}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            {t('hero.title')}<br />
            <span className="text-teal-500">{t('hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 font-light leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-teal-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-teal-600 transition-all duration-300 shadow-lg rounded"
            >
              {t('hero.ctaPrimary')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/training"
              className="inline-flex items-center justify-center bg-amber-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all duration-300 shadow-lg rounded"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;