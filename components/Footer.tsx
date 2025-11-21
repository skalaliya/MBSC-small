import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { CONTACT_INFO, NAV_ITEMS } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6 gap-3">
              <img 
                src="assets/logo.svg" 
                alt="MBSC Australia Logo" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Delivering advanced engineering solutions and testing integrity for Australia's toughest industries.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Navigation</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Core Services</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Geotechnical Investigations</li>
              <li>Concrete NDT</li>
              <li>Engineering Geophysics</li>
              <li>Global Training</li>
              <li>Mining Compliance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Head Office</h3>
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
          <p>&copy; {new Date().getFullYear()} MBSC Australia Pty Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;