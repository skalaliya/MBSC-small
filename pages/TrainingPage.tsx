import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, BookOpen, Video } from 'lucide-react';
import TrainingCalendar from '../components/TrainingCalendar';

const TrainingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero for Training */}
      <div className="relative bg-teal-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/workshop/1920/600" alt="MBSC Australia engineering training workshop - NDT certification and technical education" className="w-full h-full object-cover opacity-20" loading="lazy" width="1920" height="600" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">{t('training.pageBadge')}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t('training.pageTitle')}</h1>
          <p className="text-teal-100 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            {t('training.pageSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-teal-600 hover:translate-y-[-4px] transition-transform duration-300">
            <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-teal-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.globalReach.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.globalReach.description')}</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-amber-500 hover:translate-y-[-4px] transition-transform duration-300">
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-amber-500 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.certified.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.certified.description')}</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-teal-600 hover:translate-y-[-4px] transition-transform duration-300">
            <Video className="h-7 w-7 sm:h-8 sm:w-8 text-teal-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.hybrid.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.hybrid.description')}</p>
          </div>
        </div>

        {/* Training Calendar 2026 */}
        <TrainingCalendar
          year={2026}
          source="/calendars/2026.json"
        />

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-slate-900 rounded-lg p-8 sm:p-10 md:p-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-4">{t('training.cta.title')}</h2>
          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">{t('training.cta.subtitle')}</p>
          <button onClick={() => navigate('/contact')} className="bg-amber-500 text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors rounded">
            {t('training.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
