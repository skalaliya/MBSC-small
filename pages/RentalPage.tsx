import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PenTool } from 'lucide-react';
import { EQUIPMENT_RENTAL } from '../constants';

const RentalPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
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
                  onClick={() => navigate('/contact')} 
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
                      <button onClick={() => navigate('/contact')} className="text-teal-600 hover:text-teal-900 font-bold">{t('rental.enquireBtn')}</button>
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
};

export default RentalPage;
