import React from 'react';
import { Calendar, MapPin, Clock, Award, Monitor, Users, Building2 } from 'lucide-react';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export type TrainingCategory = 
  | "oilGas" 
  | "geoscience" 
  | "geology" 
  | "mining" 
  | "crossDiscipline" 
  | "digitalAI";

export type DeliveryMethod = "ON-SITE" | "VIRTUAL" | "HYBRID";
export type Location = "MELBOURNE" | "PERTH" | "GLOBAL" | "CLIENT SITE";
export type CertificateType = 
  | "Technical Certification" 
  | "Professional Program" 
  | "Associate Program" 
  | "Corporate Workshop"
  | "ISO 9712 Certification"
  | "Bespoke Training";

export type TrainingEvent = {
  id: string;
  month: string;
  dateLabel: string;
  name: string;
  category: TrainingCategory;
  certificateType: CertificateType;
  duration: string;
  delivery: DeliveryMethod;
  location: Location;
};

export interface TrainingCalendarProps {
  year?: number;
  events: TrainingEvent[];
}

// =====================================================
// CATEGORY CONFIGURATION
// =====================================================

const categoryConfig: Record<TrainingCategory, {
  label: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeColor: string;
}> = {
  oilGas: {
    label: "Oil & Gas",
    icon: "🛢️",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-500",
    textColor: "text-teal-700",
    badgeColor: "bg-teal-100 text-teal-800",
  },
  geoscience: {
    label: "Geoscience",
    icon: "🌍",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-600",
    textColor: "text-blue-700",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  geology: {
    label: "Geology",
    icon: "🧭",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-500",
    textColor: "text-indigo-700",
    badgeColor: "bg-indigo-100 text-indigo-800",
  },
  mining: {
    label: "Mining",
    icon: "⛏️",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-500",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  crossDiscipline: {
    label: "Cross-Discipline",
    icon: "🎓",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-500",
    textColor: "text-slate-700",
    badgeColor: "bg-slate-200 text-slate-800",
  },
  digitalAI: {
    label: "Digital & AI",
    icon: "💠",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-500",
    textColor: "text-purple-700",
    badgeColor: "bg-purple-100 text-purple-800",
  },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// =====================================================
// HELPER COMPONENTS
// =====================================================

const DeliveryBadge: React.FC<{ delivery: DeliveryMethod }> = ({ delivery }) => {
  const config = {
    "ON-SITE": { icon: Building2, className: "bg-emerald-100 text-emerald-700" },
    "VIRTUAL": { icon: Monitor, className: "bg-sky-100 text-sky-700" },
    "HYBRID": { icon: Users, className: "bg-violet-100 text-violet-700" },
  };
  const { icon: Icon, className } = config[delivery];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${className}`}>
      <Icon className="w-2.5 h-2.5" />
      {delivery}
    </span>
  );
};

const LocationBadge: React.FC<{ location: Location }> = ({ location }) => (
  <span className="inline-flex items-center gap-1 text-[9px] text-slate-500 font-medium">
    <MapPin className="w-2.5 h-2.5" />
    {location}
  </span>
);

// =====================================================
// LEGEND COMPONENT
// =====================================================

const CalendarLegend: React.FC = () => (
  <div className="mb-8 p-4 sm:p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
      <Calendar className="w-4 h-4 text-teal-600" />
      Category Legend
    </h3>
    <div className="flex flex-wrap gap-3">
      {Object.entries(categoryConfig).map(([key, config]) => (
        <div
          key={key}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-l-4 ${config.borderColor} ${config.bgColor}`}
        >
          <span className="text-sm">{config.icon}</span>
          <span className={`text-xs font-semibold ${config.textColor}`}>{config.label}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <DeliveryBadge delivery="ON-SITE" />
        <span>In-person training</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <DeliveryBadge delivery="VIRTUAL" />
        <span>Online / Remote</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <DeliveryBadge delivery="HYBRID" />
        <span>Combined delivery</span>
      </div>
    </div>
  </div>
);

// =====================================================
// EVENT CARD COMPONENT
// =====================================================

const EventCard: React.FC<{ event: TrainingEvent }> = ({ event }) => {
  const config = categoryConfig[event.category];
  
  return (
    <div className={`p-3 rounded border-l-4 ${config.borderColor} ${config.bgColor} hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-2 mb-2">
        <span className="text-base shrink-0">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-900 leading-tight line-clamp-2">
            {event.name}
          </h4>
        </div>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-slate-600">
          <Calendar className="w-3 h-3 shrink-0" />
          <span className="font-semibold">{event.dateLabel}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-slate-600">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{event.duration}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-slate-600">
          <Award className="w-3 h-3 shrink-0" />
          <span className="truncate">{event.certificateType}</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <DeliveryBadge delivery={event.delivery} />
          <LocationBadge location={event.location} />
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MONTH CARD COMPONENT
// =====================================================

const MonthCard: React.FC<{ month: string; events: TrainingEvent[] }> = ({ month, events }) => (
  <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
    <div className="bg-slate-900 px-4 py-3">
      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
        <Calendar className="w-4 h-4 text-amber-500" />
        {month}
        <span className="ml-auto bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {events.length} {events.length === 1 ? 'course' : 'courses'}
        </span>
      </h3>
    </div>
    <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-xs text-slate-400 text-center py-4">No courses scheduled</p>
      )}
    </div>
  </div>
);

// =====================================================
// MAIN CALENDAR COMPONENT
// =====================================================

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({ 
  year = 2026, 
  events 
}) => {
  // Group events by month
  const eventsByMonth = MONTHS.reduce((acc, month) => {
    acc[month] = events
      .filter((e) => e.month === month)
      .sort((a, b) => {
        // Sort by date within month (extract first number from dateLabel)
        const dateA = parseInt(a.dateLabel.match(/\d+/)?.[0] || "0");
        const dateB = parseInt(b.dateLabel.match(/\d+/)?.[0] || "0");
        return dateA - dateB;
      });
    return acc;
  }, {} as Record<string, TrainingEvent[]>);

  const totalCourses = events.length;
  const uniqueCourses = new Set(events.map(e => e.name)).size;

  return (
    <section className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-amber-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">
          Training Schedule
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          MBSC Training Calendar {year}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {uniqueCourses} unique programs scheduled across {totalCourses} sessions. 
          On-site, virtual, and hybrid delivery options available worldwide.
        </p>
      </div>

      {/* Legend */}
      <CalendarLegend />

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {MONTHS.map((month) => (
          <MonthCard 
            key={month} 
            month={month} 
            events={eventsByMonth[month]} 
          />
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Dates and availability subject to change. Contact us for custom corporate training schedules.
        </p>
      </div>
    </section>
  );
};

export default TrainingCalendar;
