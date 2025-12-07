import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('about.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">{t('about.pageSubtitle')}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{t('about.overviewTitle')}</h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 leading-relaxed">
            {t('about.overviewBody')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8 sm:my-12">
            <div className="bg-slate-50 p-6 sm:p-8 rounded border border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{t('about.mission.title')}</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                {t('about.mission.body')}
              </p>
            </div>
            <div className="bg-slate-50 p-6 sm:p-8 rounded border border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{t('about.values.title')}</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start"><span className="text-teal-500 font-bold mr-2 shrink-0">01.</span> <span>{t('about.values.value1')}</span></li>
                <li className="flex items-start"><span className="text-teal-500 font-bold mr-2 shrink-0">02.</span> <span>{t('about.values.value2')}</span></li>
                <li className="flex items-start"><span className="text-teal-500 font-bold mr-2 shrink-0">03.</span> <span>{t('about.values.value3')}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
