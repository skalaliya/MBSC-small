import React, { useState } from 'react';
import { Menu, X, HardHat } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav(Page.HOME)}>
            <div className="bg-teal-900 p-2 rounded mr-3">
              <HardHat className="h-6 w-6 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">MBSC</span>
              <span className="text-xs tracking-widest text-teal-700 font-bold uppercase">Australia</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.page)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wide
                  ${currentPage === item.page 
                    ? 'text-teal-800 border-b-2 border-teal-800' 
                    : 'text-slate-600 hover:text-teal-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNav(Page.CONTACT)}
              className="bg-amber-500 text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-sm"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.page)}
                className={`block w-full text-left px-3 py-4 text-base font-medium uppercase tracking-wide border-l-4
                  ${currentPage === item.page 
                    ? 'bg-slate-50 border-teal-800 text-teal-800' 
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-teal-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;