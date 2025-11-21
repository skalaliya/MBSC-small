import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, PenTool, Phone, Mail, Globe, BookOpen, Video } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ChatWidget from './components/ChatWidget';
import { SERVICES_DATA, EQUIPMENT_RENTAL, CONTACT_INFO, TRAINING_COURSES } from './constants';
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderHome = () => (
    <>
      <Hero onNavigate={setCurrentPage} />
      
      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Industry Leading Technical Excellence
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                MBSC Australia sets the benchmark in technical services for the construction, mining, and oil & gas industries. With a focus on precision, compliance, and reliability, we deliver data-driven insights that secure your assets.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "NATA Accredited Laboratories",
                  "Advanced NDT Technology",
                  "Certified Engineering Specialists",
                  "Global Training Programs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex space-x-6">
                <button 
                  onClick={() => setCurrentPage(Page.ABOUT)}
                  className="text-teal-700 font-bold uppercase text-sm tracking-wider flex items-center hover:text-teal-800"
                >
                  About Our Company <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button 
                  onClick={() => setCurrentPage(Page.TRAINING)}
                  className="text-amber-600 font-bold uppercase text-sm tracking-wider flex items-center hover:text-amber-700"
                >
                  View Training <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-lg transform rotate-2"></div>
              <img 
                src="https://picsum.photos/seed/engineering/800/600" 
                alt="Engineers on site" 
                className="relative rounded-lg shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-xs">Our Capabilities</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Specialised Engineering Solutions</h2>
            <p className="text-slate-600">Deploying advanced methodologies for complex infrastructure challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_DATA.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white p-8 rounded border border-slate-200 hover:shadow-lg transition-shadow group">
                <div className="bg-slate-100 p-3 rounded w-fit mb-6 group-hover:bg-teal-50 transition-colors">
                  <service.icon className="h-8 w-8 text-slate-700 group-hover:text-teal-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{service.shortDescription}</p>
                <button 
                  onClick={() => setCurrentPage(Page.SERVICES)}
                  className="text-sm font-semibold text-teal-700 flex items-center uppercase tracking-wide"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button 
              onClick={() => setCurrentPage(Page.SERVICES)}
              className="bg-slate-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderServices = () => (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Comprehensive testing, inspection, and engineering solutions for mission-critical projects.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-12">
        {SERVICES_DATA.map((service, index) => (
          <div key={service.id} className={`bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
               <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <service.icon className="h-6 w-6 text-teal-600 mr-3" />
                <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.fullDescription}
              </p>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Applications</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                      {feature}
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
      <div className="relative bg-teal-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/workshop/1920/600" alt="Training Workshop" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-2 block">MBSC Education</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Global Engineering Training</h1>
          <p className="text-teal-100 text-lg max-w-2xl leading-relaxed">
            Upskilling the global workforce with industry-leading technical education. 
            We provide specialised training for organisations and individuals in NDT, Geophysics, and Safety Compliance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded shadow-sm border-l-4 border-teal-600">
            <Globe className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Global Reach</h3>
            <p className="text-slate-600 text-sm">We deploy our senior engineers worldwide to conduct on-site training tailored to your project environment.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border-l-4 border-amber-500">
            <BookOpen className="h-8 w-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Certified Curriculum</h3>
            <p className="text-slate-600 text-sm">Courses designed to meet Australian Standards (AS) and ISO requirements for NDT and Geotechnical safety.</p>
          </div>
          <div className="bg-white p-8 rounded shadow-sm border-l-4 border-teal-600">
            <Video className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Hybrid Learning</h3>
            <p className="text-slate-600 text-sm">Flexible delivery options including virtual classrooms, interactive webinars, and practical field days.</p>
          </div>
        </div>

        {/* Course List */}
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Available Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TRAINING_COURSES.map((course, idx) => (
            <div key={idx} className="bg-white rounded border border-slate-200 p-6 hover:border-teal-500 transition-colors flex flex-col sm:flex-row gap-6">
              <div className="bg-slate-100 p-4 rounded flex items-center justify-center sm:w-24 sm:h-24 shrink-0">
                <course.icon className="h-8 w-8 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-xs font-bold text-teal-700 uppercase tracking-wide">
                   <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> {course.duration}</span>
                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                   <span>{course.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-900 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Organise Training for Your Team</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Contact our education department to discuss bespoke corporate packages and international deployment schedules.</p>
          <button onClick={() => setCurrentPage(Page.CONTACT)} className="bg-amber-500 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">
            Request Training Syllabus
          </button>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About MBSC</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Built on a foundation of technical expertise and unwavering safety standards.</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Corporate Overview</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            MBSC Australia is a leading provider of specialized engineering and testing services. We partner with major asset owners, contractors, and consultants to mitigate risk and ensure quality in the built environment. 
            Our team comprises senior geotechnical engineers, geophysicists, and materials technicians dedicated to solving complex site challenges.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-slate-50 p-8 rounded border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm">
                To deliver data-driven engineering insights that ensure the safety, longevity, and compliance of Australia’s critical infrastructure.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Values</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><span className="text-teal-500 font-bold mr-2">01.</span> Technical Precision</li>
                <li className="flex items-center"><span className="text-teal-500 font-bold mr-2">02.</span> Uncompromised Safety</li>
                <li className="flex items-center"><span className="text-teal-500 font-bold mr-2">03.</span> Client Integrity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRental = () => (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Equipment Rental</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Professional-grade testing equipment for short and long-term hire.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Equipment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Daily Rate (ex GST)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {EQUIPMENT_RENTAL.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.desc}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-mono">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => setCurrentPage(Page.CONTACT)} className="text-teal-600 hover:text-teal-900 font-bold">Enquire</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 p-4 bg-teal-50 border border-teal-100 rounded flex items-center justify-between">
          <div className="flex items-center">
            <PenTool className="h-5 w-5 text-teal-600 mr-3" />
            <p className="text-sm text-teal-800">All equipment is calibrated to manufacturer standards prior to dispatch.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Get in touch with our engineering team for quotes and technical advice.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send an Enquiry</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Interest</label>
                <select className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border bg-white">
                  <option>General Enquiry</option>
                  {SERVICES_DATA.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  <option>Training & Education</option>
                  <option>Equipment Rental</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows={4} className="w-full rounded border-slate-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none border"></textarea>
              </div>
              <button type="button" className="w-full bg-teal-800 text-white font-bold uppercase tracking-wider py-3 rounded hover:bg-teal-700 transition-colors shadow-md">
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Head Office</h2>
            <div className="space-y-8">
               <div className="flex items-start">
                 <div className="bg-teal-50 p-3 rounded mr-4">
                   <Phone className="h-6 w-6 text-teal-600" />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Phone</h4>
                   <p className="text-slate-600">{CONTACT_INFO.phone}</p>
                   <p className="text-xs text-slate-400 mt-1">{CONTACT_INFO.hours}</p>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="bg-teal-50 p-3 rounded mr-4">
                   <Mail className="h-6 w-6 text-teal-600" />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Email</h4>
                   <p className="text-slate-600">{CONTACT_INFO.email}</p>
                 </div>
               </div>

               {/* Placeholder Map */}
               <div className="w-full h-64 bg-slate-200 rounded border border-slate-300 flex items-center justify-center">
                 <p className="text-slate-500 font-medium">Google Map Integration Placeholder</p>
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
        {currentPage === Page.CONTACT && renderContact()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      <ChatWidget />
    </div>
  );
}

export default App;