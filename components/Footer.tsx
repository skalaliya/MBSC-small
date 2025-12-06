import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { CONTACT_INFO, NAV_ITEMS } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6 gap-3">
              <img 
                src="/logo.jpg"
                alt="MBSC Australia Logo" 
                className="h-14 sm:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4 sm:mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">{t('footer.navigation')}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.page)}
                    className="text-sm sm:text-base text-slate-400 hover:text-teal-400 transition-colors text-left"
                  >
                    {t(`nav.${item.label.toLowerCase().replace(/ /g, '')}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">{t('footer.coreServices')}</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-slate-400">
              <li>{t('footer.services.oilgas')}</li>
              <li>{t('footer.services.training')}</li>
              <li>{t('footer.services.digital')}</li>
              <li>{t('footer.services.mining')}</li>
              <li>{t('footer.services.safety')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 sm:mb-6">{t('footer.headOffice')}</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mr-3 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-3 shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-slate-500 gap-4">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white whitespace-nowrap">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white whitespace-nowrap">{t('footer.termsOfService')}</a>
            <a href="#" className="hover:text-white whitespace-nowrap">{t('footer.sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;