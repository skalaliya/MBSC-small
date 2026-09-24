import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { SERVICES_DATA, PROJECTS_DATA, STATS_DATA } from '../constants';
import { ROUTES } from '../routes';
import { sortProjectsByCategory } from '../utils/projectSorting';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Sort projects by category: Oil & Gas first, Mining Infrastructure second, others last
  const sortedProjects = useMemo(() => sortProjectsByCategory(PROJECTS_DATA), []);

  return (
    <>
      <Hero />
      
      {/* Stats Dashboard - "The Fun Part" for Engineers (Big Numbers) */}
      <section className="bg-teal-900 py-10 sm:py-12 lg:py-16 border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="text-center transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="bg-teal-800 p-2.5 sm:p-3 rounded-full shadow-lg">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-teal-200 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-medium px-1">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {t('home.intro.title')}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('home.intro.body')}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  t('home.intro.listItem1'),
                  t('home.intro.listItem2'),
                  t('home.intro.listItem3'),
                  t('home.intro.listItem4')
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link 
                  to={ROUTES.ABOUT.path}
                  className="text-teal-700 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start hover:text-teal-800 group py-2"
                >
                  {t('home.intro.aboutCta')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to={ROUTES.TRAINING.path}
                  className="text-teal-700 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start hover:text-teal-800 group py-2"
                >
                  {t('home.intro.trainingCta')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="/site-photo.jpg" alt="MBSC Australia Engineering Project Site - Field Operations and Technical Services" className="rounded-lg shadow-xl w-full h-auto" loading="lazy" width="800" height="600" />
              <div className="absolute inset-0 border-4 border-teal-600 rounded-lg transform translate-x-4 translate-y-4 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs">{t('home.servicesPreview.sectionBadge')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">{t('home.servicesPreview.sectionTitle')}</h2>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">{t('home.servicesPreview.sectionSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <img src={service.imageUrl} alt={`${t(`services.${service.id}.title`)} - MBSC Australia`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" loading="lazy" width="600" height="400" />
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-2 sm:mr-3" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">{t(`services.${service.id}.title`)}</h3>
                  </div>
                  <p className="text-slate-600 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">{t(`services.${service.id}.short`)}</p>
                  <Link 
                    to={ROUTES.SERVICES.path}
                    className="text-xs sm:text-sm font-semibold text-teal-700 flex items-center uppercase tracking-wide group-hover:text-teal-800"
                  >
                    {t('home.servicesPreview.learnMore')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link 
              to={ROUTES.SERVICES.path}
              className="inline-block bg-slate-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl rounded"
            >
              {t('home.servicesPreview.viewAllServices')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
              <div>
                <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs">{t('home.projectsTeaser.sectionBadge')}</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2">{t('home.projectsTeaser.sectionTitle')}</h2>
              </div>
              <Link 
                to={ROUTES.PROJECTS.path}
                className="hidden md:flex items-center text-sm sm:text-base text-slate-600 hover:text-teal-700 font-medium transition-colors"
              >
                {t('home.projectsTeaser.viewGallery')} <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedProjects.map((project) => (
                <Link key={project.id} to={ROUTES.PROJECTS.path} className="group relative h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden cursor-pointer block">
                  <img src={project.imageUrl} alt={`${t(`projects.${project.id}.title`)} - ${t(`projects.${project.id}.category`)} - MBSC Australia`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="320" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                    <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase mb-1">{t(`projects.${project.id}.category`)}</p>
                    <h3 className="text-base sm:text-lg font-bold leading-tight">{t(`projects.${project.id}.title`)}</h3>
                  </div>
                </Link>
              ))}
           </div>

           <div className="mt-6 sm:mt-8 text-center md:hidden">
              <Link 
                to={ROUTES.PROJECTS.path}
                className="inline-flex items-center text-sm sm:text-base text-teal-700 font-bold py-2"
              >
                {t('home.projectsTeaser.viewAllProjects')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="mt-12 sm:mt-16 lg:mt-20 bg-teal-900 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 px-4">{t('home.projectsCta.title')}</h2>
              <p className="text-sm sm:text-base text-teal-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">{t('home.projectsCta.subtitle')}</p>
              <Link to={ROUTES.CONTACT.path} className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors rounded shadow-lg transform hover:scale-105">
                {t('home.projectsCta.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
