import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../constants';
import { ROUTES, getRoutePath } from '../routes';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-sm" role="navigation" aria-label={t('seo.ariaLabels.mainNavigation')}>
      {/* Subtle gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link 
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer gap-3 py-2 group" 
          >
            <img 
              src="/logo.jpg"
              alt="MBSC Australia Logo"
              className="h-20 w-auto object-contain group-hover:opacity-80 transition-all duration-300 group-hover:scale-[1.02]"
            />
          </Link>


          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const route = getRoutePath(item.page);
              const isActive = location.pathname === route;
              
              return (
                <NavLink
                  key={item.label}
                  to={route}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 uppercase tracking-wide rounded-lg group
                    ${isActive 
                      ? 'text-teal-800 bg-teal-50/80 shadow-sm' 
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50/80'
                    }`}
                >
                  {t(`nav.${item.label}`)}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-600 rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
            
            {/* Language Switcher - Pill Style */}
            <div className="flex items-center gap-3 ml-4 pl-6 border-l border-slate-200/60" aria-label={t('seo.ariaLabels.languageSwitcher')}>
              <Globe className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <div className="relative inline-flex items-center bg-slate-100/80 rounded-full p-1 shadow-inner">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    i18n.language === 'en' 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    i18n.language === 'fr' 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  FR
                </button>
              </div>
            </div>

            <Link 
              to={ROUTES.CONTACT.path}
              className="ml-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg transform hover:-translate-y-0.5"
              aria-label={t('seo.ariaLabels.getQuoteButton')}
            >
              {t('nav.getQuote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile Language Switcher - Enhanced for Touch */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <div className="inline-flex items-center bg-slate-100/90 rounded-full p-1 shadow-sm border border-slate-200/50">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 text-sm font-bold uppercase rounded-full transition-all duration-200 min-w-[44px] ${
                    i18n.language === 'en' 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-4 py-2 text-sm font-bold uppercase rounded-full transition-all duration-200 min-w-[44px] ${
                    i18n.language === 'fr' 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  aria-label="Changer en français"
                >
                  FR
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-100 focus:outline-none transition-all duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-lg">
          <div className="px-3 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const route = getRoutePath(item.page);
              const isActive = location.pathname === route;
              
              return (
                <NavLink
                  key={item.label}
                  to={route}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-4 py-3.5 text-base font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-teal-50 text-teal-800 shadow-sm border-l-4 border-teal-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700 border-l-4 border-transparent'
                  }`}
                >
                  {t(`nav.${item.label}`)}
                </NavLink>
              );
            })}
            
            {/* Mobile Get Quote Button */}
            <Link 
              to={ROUTES.CONTACT.path}
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all duration-200 text-center"
            >
              {t('nav.getQuote')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
