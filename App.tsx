import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import TrainingPage from './pages/TrainingPage';
import RentalPage from './pages/RentalPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { PAGE_SEO_META } from './seo';
import { Page } from './types';

// Component to handle SEO metadata and scroll behavior
function SEOManager() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Map routes to Page enum for SEO
  const routeToPage: Record<string, Page> = {
    '/': Page.HOME,
    '/services': Page.SERVICES,
    '/projects': Page.PROJECTS,
    '/training': Page.TRAINING,
    '/rental': Page.RENTAL,
    '/about': Page.ABOUT,
    '/contact': Page.CONTACT
  };

  const currentPage = routeToPage[location.pathname] || Page.HOME;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Update SEO meta tags when page or language changes
  useEffect(() => {
    // Normalize language code to 'en' or 'fr' (handle 'en-AU', 'en-US', 'fr-FR', etc.)
    const langCode = i18n.language.split('-')[0];
    const currentLang = (langCode === 'fr' ? 'fr' : 'en') as 'en' | 'fr';
    const seoData = PAGE_SEO_META[currentPage];
    
    // Update document title with fallback
    document.title = seoData?.title?.[currentLang] || 'MBSC Australia – Engineering, Training & Digital Solutions';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData?.description?.[currentLang] || '');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData?.keywords?.[currentLang] || '');
    }
    
    // Update canonical URL
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', seoData?.canonical || 'https://www.mbscaustralia.com.au/');
    }
    
    // Update html lang attribute
    document.documentElement.lang = currentLang === 'en' ? 'en-AU' : 'fr-AU';
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoData?.title?.[currentLang] || '');
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', seoData?.description?.[currentLang] || '');
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seoData?.canonical || '');
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', seoData?.title?.[currentLang] || '');
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', seoData?.description?.[currentLang] || '');
    
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', seoData?.canonical || '');
  }, [currentPage, i18n.language]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <SEOManager />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/rental" element={<RentalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
