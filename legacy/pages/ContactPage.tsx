import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { SERVICES_DATA, CONTACT_INFO } from '../constants';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Contact Form State
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'General Enquiry',
    message: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('submitting');
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          title: formData.service,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', service: 'General Enquiry', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('idle');
      alert('Failed to send email. Please check your configuration or try again later.');
    }
  };

  return (
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
              <form ref={formRef} className="space-y-5 sm:space-y-6" onSubmit={handleFormSubmit} aria-label={t('seo.ariaLabels.contactForm')}>
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
};

export default ContactPage;
