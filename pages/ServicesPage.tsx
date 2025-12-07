import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SERVICES_DATA } from '../constants';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-16 lg:pb-20">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{t('services.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">{t('services.pageSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 grid gap-8 sm:gap-10 lg:gap-12">
        {SERVICES_DATA.map((service, index) => (
          <div 
            key={service.id} 
            id={`service-${service.id}`}
            className={`bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} hover:shadow-lg transition-shadow duration-300 scroll-mt-24`}
          >
            <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative overflow-hidden group">
               <img 
                src={service.imageUrl} 
                alt={`${t(`services.${service.id}.title`)} - MBSC Australia professional engineering services`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                loading="lazy"
                width="800"
                height="600"
               />
               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
                <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 shrink-0 mt-1 sm:mt-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t(`services.${service.id}.title`)}</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                {t(`services.${service.id}.full`)}
              </p>
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{t('services.keyApplications')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 shrink-0 mt-1.5"></div>
                      <span>{t(`services.${service.id}.feature${idx + 1}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
