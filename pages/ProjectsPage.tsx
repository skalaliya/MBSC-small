import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import { ROUTES } from '../routes';
import { sortProjectsByCategory } from '../utils/projectSorting';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Sort projects by category: Oil & Gas first, Mining Infrastructure second, others last
  const sortedProjects = useMemo(() => sortProjectsByCategory(PROJECTS_DATA), []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">{t('projects.pageBadge')}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{t('projects.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">
            {t('projects.pageSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12">
          {sortedProjects.map((project, index) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col lg:flex-row">
              <div className="lg:w-2/5 relative overflow-hidden">
                <img src={project.imageUrl} alt={`${t(`projects.${project.id}.title`)} - ${t(`projects.${project.id}.category`)} project in ${t(`projects.${project.id}.location`)} by MBSC Australia`} className="w-full h-full object-cover min-h-[250px] sm:min-h-[300px]" loading="lazy" width="800" height="600" />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-teal-900/90 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 uppercase tracking-wide rounded">
                  {t(`projects.${project.id}.category`)}
                </div>
              </div>
              <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 font-medium">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 mr-2 shrink-0" />
                  {t(`projects.${project.id}.location`)}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{t(`projects.${project.id}.title`)}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                  {t(`projects.${project.id}.description`)}
                </p>
                
                <div className="bg-slate-50 border-l-4 border-teal-500 p-3.5 sm:p-4 rounded-r">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase mb-1">{t('projects.outcome')}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 italic">"{t(`projects.${project.id}.outcome`)}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-teal-900 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden">
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
    </div>
  );
};

export default ProjectsPage;
