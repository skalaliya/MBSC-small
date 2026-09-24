import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import TrainingPage from './pages/TrainingPage';
import RentalPage from './pages/RentalPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { PAGE_SEO_META } from './seo';
import { ROUTES, getPageFromPath } from './routes';

/**
 * Component to handle SEO metadata and scroll behavior
 * Automatically updates document title, meta tags, and Open Graph data based on current route
 */
function SEOManager() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Get Page enum from current route path
  const currentPage = getPageFromPath(location.pathname);

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
      <SEOManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME.path} element={<HomePage />} />
          <Route path={ROUTES.SERVICES.path} element={<ServicesPage />} />
          <Route path={ROUTES.PROJECTS.path} element={<ProjectsPage />} />
          <Route path={ROUTES.TRAINING.path} element={<TrainingPage />} />
          <Route path={ROUTES.RENTAL.path} element={<RentalPage />} />
          <Route path={ROUTES.ABOUT.path} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT.path} element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
