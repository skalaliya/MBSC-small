import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-teal-100 p-4 rounded-full">
            <AlertCircle className="h-16 w-16 text-teal-600" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-teal-700 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-teal-600 transition-all duration-300 shadow-lg rounded"
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
