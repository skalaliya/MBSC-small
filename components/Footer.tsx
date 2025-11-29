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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6 gap-3">
              <img 
                src="/logo.jpg"
                alt="MBSC Australia Logo" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
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
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {t(`nav.${item.label.toLowerCase().replace(/ /g, '')}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{t('footer.coreServices')}</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>{t('footer.services.geotech')}</li>
              <li>{t('footer.services.concreteNdt')}</li>
              <li>{t('footer.services.geophysics')}</li>
              <li>{t('footer.services.training')}</li>
              <li>{t('footer.services.mining')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{t('footer.headOffice')}</h3>
            <ul className="space-y-4 text-sm text-slate-400">
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
        
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white">{t('footer.termsOfService')}</a>
            <a href="#" className="hover:text-white">{t('footer.sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;