import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, PenTool, Phone, Mail, Globe, BookOpen, Video, MapPin, HardHat, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { SERVICES_DATA, EQUIPMENT_RENTAL, CONTACT_INFO, TRAINING_COURSES, PROJECTS_DATA, STATS_DATA } from './constants';
import { Page } from './types';
import { PAGE_SEO_META } from './seo';

function App() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  
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
  
  // Contact Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'General Enquiry',
    message: ''
  });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', service: 'General Enquiry', message: '' });
    }, 1500);
  };

  const renderHome = () => (
    <>
      <Hero onNavigate={setCurrentPage} />
      
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
                <button 
                  onClick={() => setCurrentPage(Page.ABOUT)}
                  className="text-teal-700 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start hover:text-teal-800 group py-2"
                >
                  {t('home.intro.aboutCta')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setCurrentPage(Page.TRAINING)}
                  className="text-amber-600 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center sm:justify-start hover:text-amber-700 group py-2"
                >
                  {t('home.intro.trainingCta')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-teal-50 rounded-lg transform rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
              <img 
                src="/site-photo.jpg" 
                alt="MBSC Australia engineering consultants delivering technical services for oil & gas, mining, and infrastructure projects" 
                className="relative rounded-lg shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                width="600"
                height="400"
              />
              {/* Interactive Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded shadow-lg border-l-4 border-amber-500 hidden md:block">
                <div className="flex items-center gap-3">
                  <HardHat className="h-8 w-8 text-slate-800" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">{t('home.intro.siteSafety')}</p>
                    <p className="text-lg font-bold text-slate-900">{t('home.intro.compliant')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-[10px] sm:text-xs">{t('home.servicesPreview.sectionBadge')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4 px-4">{t('home.servicesPreview.sectionTitle')}</h2>
            <p className="text-sm sm:text-base text-slate-600 px-4">{t('home.servicesPreview.sectionSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white p-6 sm:p-8 rounded border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-default">
                <div className="bg-slate-100 p-2.5 sm:p-3 rounded w-fit mb-4 sm:mb-6 group-hover:bg-teal-50 transition-colors">
                  <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-slate-700 group-hover:text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 sm:mb-3">{t(`services.${service.id}.title`)}</h3>
                <p className="text-slate-600 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">{t(`services.${service.id}.short`)}</p>
                <button 
                  onClick={() => setCurrentPage(Page.SERVICES)}
                  className="text-xs sm:text-sm font-semibold text-teal-700 flex items-center uppercase tracking-wide group-hover:text-teal-800"
                >
                  {t('home.servicesPreview.learnMore')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <button 
              onClick={() => setCurrentPage(Page.SERVICES)}
              className="bg-slate-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl rounded"
            >
              {t('home.servicesPreview.viewAllServices')}
            </button>
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
              <button 
                onClick={() => setCurrentPage(Page.PROJECTS)}
                className="hidden md:flex items-center text-sm sm:text-base text-slate-600 hover:text-teal-700 font-medium transition-colors"
              >
                {t('home.projectsTeaser.viewGallery')} <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PROJECTS_DATA.map((project) => (
                <div key={project.id} className="group relative h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden cursor-pointer" onClick={() => setCurrentPage(Page.PROJECTS)}>
                  <img src={project.imageUrl} alt={`${t(`projects.${project.id}.title`)} - ${t(`projects.${project.id}.category`)} - MBSC Australia`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width="400" height="320" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                    <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase mb-1">{t(`projects.${project.id}.category`)}</p>
                    <h3 className="text-base sm:text-lg font-bold leading-tight">{t(`projects.${project.id}.title`)}</h3>
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-6 sm:mt-8 text-center md:hidden">
              <button 
                onClick={() => setCurrentPage(Page.PROJECTS)}
                className="inline-flex items-center text-sm sm:text-base text-teal-700 font-bold py-2"
              >
                {t('home.projectsTeaser.viewAllProjects')} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
           </div>
        </div>
      </section>
    </>
  );

  const renderProjects = () => (
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
          {PROJECTS_DATA.map((project, index) => (
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
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-teal-900 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 px-4">{t('home.projectsCta.title')}</h2>
            <p className="text-sm sm:text-base text-teal-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">{t('home.projectsCta.subtitle')}</p>
            <button onClick={() => setCurrentPage(Page.CONTACT)} className="bg-amber-500 hover:bg-amber-400 text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors rounded shadow-lg transform hover:scale-105">
              {t('home.projectsCta.cta')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-16 lg:pb-20">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{t('services.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">{t('services.pageSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 grid gap-8 sm:gap-10 lg:gap-12">
        {SERVICES_DATA.map((service, index) => (
          <div key={service.id} className={`bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} hover:shadow-lg transition-shadow duration-300`}>
            <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative overflow-hidden group">
               <img 
                src={service.imageUrl} 
                alt={`${t(`services.${service.id}.title`)} - MBSC Australia professional engineering services`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                loading="lazy"
                width="800"
                height="600"
               />
               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
                <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 shrink-0 mt-1 sm:mt-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t(`services.${service.id}.title`)}</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                {t(`services.${service.id}.full`)}
              </p>
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{t('services.keyApplications')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 shrink-0 mt-1.5"></div>
                      <span>{t(`services.${service.id}.feature${idx + 1}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="min-h-screen bg-slate-50">
      {/* Hero for Training */}
      <div className="relative bg-teal-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/workshop/1920/600" alt="MBSC Australia engineering training workshop - NDT certification and technical education" className="w-full h-full object-cover opacity-20" loading="lazy" width="1920" height="600" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">{t('training.pageBadge')}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t('training.pageTitle')}</h1>
          <p className="text-teal-100 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            {t('training.pageSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-teal-600 hover:translate-y-[-4px] transition-transform duration-300">
            <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-teal-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.globalReach.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.globalReach.description')}</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-amber-500 hover:translate-y-[-4px] transition-transform duration-300">
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-amber-500 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.certified.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.certified.description')}</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded shadow-sm border-l-4 border-teal-600 hover:translate-y-[-4px] transition-transform duration-300">
            <Video className="h-7 w-7 sm:h-8 sm:w-8 text-teal-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{t('training.valueProps.hybrid.title')}</h3>
            <p className="text-slate-600 text-xs sm:text-sm">{t('training.valueProps.hybrid.description')}</p>
          </div>
        </div>

        {/* Course List */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">{t('training.coursesTitle')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {TRAINING_COURSES.map((course, idx) => {
            const courseKeys = ['ndt', 'safety', 'gpr', 'corporate'];
            const courseKey = courseKeys[idx];
            return (
              <div key={idx} className="bg-white rounded border border-slate-200 p-5 sm:p-6 hover:border-teal-500 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-6 hover:shadow-md">
                <div className="bg-slate-100 p-4 rounded flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 shrink-0 self-center sm:self-start">
                  <course.icon className="h-7 w-7 sm:h-8 sm:w-8 text-slate-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t(`training.courses.${courseKey}.title`)}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">{t(`training.courses.${courseKey}.description`)}</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold text-teal-700 uppercase tracking-wide">
                     <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> {t(`training.courses.${courseKey}.duration`)}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
                     <span className="break-all">{t(`training.courses.${courseKey}.location`)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-slate-900 rounded-lg p-8 sm:p-10 md:p-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-4">{t('training.cta.title')}</h2>
          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">{t('training.cta.subtitle')}</p>
          <button onClick={() => setCurrentPage(Page.CONTACT)} className="bg-amber-500 text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors rounded">
            {t('training.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
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

  const renderRental = () => (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('rental.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">{t('rental.pageSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Mobile Card Layout */}
        <div className="block lg:hidden space-y-4">
          {EQUIPMENT_RENTAL.map((item, idx) => {
            const equipmentKeys = ['gpr', 'ultrasonic', 'coverMeter', 'vibration'];
            const equipmentKey = equipmentKeys[idx];
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{t(`rental.equipment.${equipmentKey}.name`)}</h3>
                  <span className="text-lg font-mono font-bold text-teal-700 ml-2">{item.price}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{t(`rental.equipment.${equipmentKey}.desc`)}</p>
                <button 
                  onClick={() => setCurrentPage(Page.CONTACT)} 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded transition-colors"
                >
                  {t('rental.enquireBtn')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t('rental.tableHeaders.equipment')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t('rental.tableHeaders.description')}</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">{t('rental.tableHeaders.dailyRate')}</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">{t('rental.tableHeaders.action')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {EQUIPMENT_RENTAL.map((item, idx) => {
                const equipmentKeys = ['gpr', 'ultrasonic', 'coverMeter', 'vibration'];
                const equipmentKey = equipmentKeys[idx];
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{t(`rental.equipment.${equipmentKey}.name`)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{t(`rental.equipment.${equipmentKey}.desc`)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-mono">{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setCurrentPage(Page.CONTACT)} className="text-teal-600 hover:text-teal-900 font-bold">{t('rental.enquireBtn')}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-teal-50 border border-teal-100 rounded flex items-start sm:items-center gap-3">
          <PenTool className="h-5 w-5 text-teal-600 shrink-0" />
          <p className="text-xs sm:text-sm text-teal-800">{t('rental.calibrationNotice')}</p>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('contact.pageTitle')}</h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">{t('contact.pageSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          
          {/* Contact Form */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded border border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">{t('contact.form.title')}</h2>
            
            {formStatus === 'success' ? (
              <div className="bg-teal-50 border border-teal-100 rounded p-6 sm:p-8 text-center">
                 <div className="flex justify-center mb-3 sm:mb-4">
                   <div className="bg-teal-100 p-2.5 sm:p-3 rounded-full">
                     <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-teal-600" />
                   </div>
                 </div>
                 <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t('contact.form.successTitle')}</h3>
                 <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6">{t('contact.form.successMessage')}</p>
                 <button 
                   onClick={() => setFormStatus('idle')}
                   className="text-teal-700 font-bold uppercase text-xs sm:text-sm hover:text-teal-800"
                 >
                   {t('contact.form.sendAnother')}
                 </button>
              </div>
            ) : (
              <form className="space-y-5 sm:space-y-6" onSubmit={handleFormSubmit} aria-label={t('seo.ariaLabels.contactForm')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">{t('contact.form.firstName')}</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">{t('contact.form.lastName')}</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" 
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">{t('contact.form.service')}</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border bg-white"
                  >
                    <option>{t('contact.form.serviceOptions.general')}</option>
                    {SERVICES_DATA.map(s => <option key={s.id} value={t(`services.${s.id}.title`)}>{t(`services.${s.id}.title`)}</option>)}
                    <option>{t('contact.form.serviceOptions.training')}</option>
                    <option>{t('contact.form.serviceOptions.rental')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">{t('contact.form.message')}</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-teal-800 text-white font-bold uppercase tracking-wider py-3 sm:py-3.5 text-xs sm:text-sm rounded hover:bg-teal-700 transition-colors shadow-md flex justify-center items-center disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">{t('contact.info.headOffice')}</h2>
            <div className="space-y-6 sm:space-y-8">
               <div className="flex items-start">
                 <div className="bg-teal-50 p-2.5 sm:p-3 rounded mr-3 sm:mr-4 shrink-0">
                   <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                 </div>
                 <div>
                   <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">{t('contact.info.phone')}</h4>
                   <p className="text-sm sm:text-base text-slate-600">{CONTACT_INFO.phone}</p>
                   <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{t('common.hours')}</p>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="bg-teal-50 p-2.5 sm:p-3 rounded mr-3 sm:mr-4 shrink-0">
                   <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                 </div>
                 <div>
                   <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">{t('contact.info.email')}</h4>
                   <p className="text-sm sm:text-base text-slate-600 break-all">{CONTACT_INFO.email}</p>
                 </div>
               </div>

               {/* Placeholder Map */}
               <div className="w-full h-56 sm:h-64 bg-slate-200 rounded border border-slate-300 flex items-center justify-center bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover bg-center grayscale opacity-80">
                 <div className="bg-white/90 p-2.5 sm:p-3 rounded shadow-md flex items-center">
                    <MapPin className="text-red-600 h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0"/>
                    <span className="text-slate-900 font-bold text-xs sm:text-sm">{t('contact.info.mapLabel')}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === Page.HOME && renderHome()}
        {currentPage === Page.SERVICES && renderServices()}
        {currentPage === Page.ABOUT && renderAbout()}
        {currentPage === Page.RENTAL && renderRental()}
        {currentPage === Page.TRAINING && renderTraining()}
        {currentPage === Page.PROJECTS && renderProjects()}
        {currentPage === Page.CONTACT && renderContact()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;