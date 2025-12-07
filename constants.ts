import { 
  HardHat, 
  Activity, 
  Drill, 
  Scan, 
  ShieldCheck, 
  Pickaxe,
  Landmark,
  GraduationCap,
  Globe,
  Users,
  Trophy,
  Timer,
  Briefcase,
  Cpu,
  BookOpen
} from 'lucide-react';
import { NavigationItem, Page, ServiceItem, ProjectItem } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { label: 'home', page: Page.HOME },
  { label: 'services', page: Page.SERVICES },
  { label: 'projects', page: Page.PROJECTS },
  { label: 'training', page: Page.TRAINING },
  { label: 'rental', page: Page.RENTAL },
  { label: 'about', page: Page.ABOUT },
  { label: 'contact', page: Page.CONTACT },
];

export const CONTACT_INFO = {
  address: "Melbourne HQ",
  phone: "+61 414 955 631",
  email: "admin@mbscaustralia.com.au",
  hours: "Mon - Fri: 07:00 - 17:00"
};

export const STATS_DATA = [
  { labelKey: 'stats.projectsDelivered', value: '1,200+', icon: Briefcase },
  { labelKey: 'stats.safetyHours', value: '500k+', icon: ShieldCheck },
  { labelKey: 'stats.metersDrilled', value: '85,000m', icon: Drill },
  { labelKey: 'stats.assetsProtected', value: '$4.5B', icon: Landmark },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Pilbara Rail Expansion',
    category: 'Mining Infrastructure',
    description: 'Geotechnical investigation for 400km of new heavy-haul rail alignment.',
    imageUrl: '/Pilbara-Rail-Expansion.jpg',
    location: 'Pilbara, WA',
    outcome: 'Delivered 3 weeks ahead of schedule, enabling early track laying.'
  },
  {
    id: 'p2',
    title: 'Perth CBD High-Rise',
    category: 'Civil Construction',
    description: 'Foundation pile testing and vibration monitoring for a 50-storey tower.',
    imageUrl: '/Perth-CBD-High-Rise.jpg',
    location: 'Perth CBD',
    outcome: 'Verified pile integrity to AS 2159 standards with zero defects.'
  },
  {
    id: 'p3',
    title: 'Offshore Platform NDT',
    category: 'Oil & Gas',
    description: 'Comprehensive non-destructive testing of platform jacket legs using phased array ultrasonics.',
    imageUrl: '/North-West-Shelf.jpg',
    location: 'North West Shelf',
    outcome: 'Identified critical fatigue cracking, allowing for preventative maintenance.'
  },
  {
    id: 'p4',
    title: 'Highway Bridge Upgrade',
    category: 'Infrastructure',
    description: 'GPR scanning and concrete strength assessment for aging bridge assets.',
    imageUrl: 'https://picsum.photos/seed/bridge/800/600',
    location: 'Regional NSW',
    outcome: 'Mapped all reinforcement, ensuring safe drilling for widening works.'
  },
  {
    id: 'p5',
    title: 'Moomba SA Cementing for Santos',
    category: 'Oil & Gas',
    description: 'Comprehensive cementing quality assurance and non-destructive testing services for Santos oil and gas operations at Moomba.',
    imageUrl: '/moomba.jpg',
    location: 'Moomba, SA',
    outcome: 'Ensured cementing integrity across multiple wells, meeting stringent Santos specifications and industry standards.'
  },
  {
    id: 'p6',
    title: 'Olympic Dam Mining Project',
    category: 'Mining Infrastructure',
    description: 'Large-scale geotechnical investigations and structural testing for underground mine expansion at Olympic Dam copper-uranium mine.',
    imageUrl: 'https://picsum.photos/seed/olympicdam/800/600',
    location: 'Olympic Dam, SA',
    outcome: 'Delivered critical foundation analysis supporting safe mine expansion, completed ahead of schedule with zero safety incidents.'
  },
  {
    id: 'p7',
    title: 'Melbourne Metro Tunnel Expansion',
    category: 'Civil Construction',
    description: 'Major upgrade works supporting the city\'s core transport network with comprehensive structural testing and monitoring.',
    imageUrl: '/Melbourne-Metro-Tunnel-Expansion.jpg',
    location: 'Melbourne, VIC',
    outcome: 'Successfully delivered critical testing services ensuring tunnel integrity and passenger safety for Melbourne\'s expanding metro system.'
  },
  {
    id: 'p8',
    title: 'West Gate Bridge Strengthening',
    category: 'Infrastructure',
    description: 'Reinforcement and structural reliability improvements for Melbourne\'s iconic bridge with advanced NDT and assessment.',
    imageUrl: 'https://picsum.photos/seed/westgate/800/600',
    location: 'Melbourne, VIC',
    outcome: 'Comprehensive structural analysis enabled targeted strengthening works, extending bridge service life by 25 years.'
  },
  {
    id: 'p9',
    title: 'Western Suburbs Pipeline Upgrade',
    category: 'Oil & Gas',
    description: 'Critical pipeline enhancements improving supply reliability in the western corridor with integrity testing and monitoring.',
    imageUrl: 'public/Western-Suburbs-Pipeline.jpg',
    location: 'Melbourne Western Suburbs, VIC',
    outcome: 'Delivered comprehensive pipeline integrity assessment ensuring safe, reliable energy supply to growing western communities.'
  },
  {
    id: 'p10',
    title: 'Port of Melbourne Wharf Refurbishment',
    category: 'Marine & Offshore',
    description: 'Structural remediation and modernisation of port-side assets with marine concrete testing and corrosion assessment.',
    imageUrl: '/Port-of-Melbourne-Wharf-Refurbishment.jpg',
    location: 'Port of Melbourne, VIC',
    outcome: 'Identified critical structural defects and guided remediation works, ensuring continued safe port operations and cargo handling.'
  }
];

export const TRAINING_COURSES = [
  {
    title: 'NDT Level 1 & 2 Certification',
    description: 'Comprehensive training in ultrasonic testing, magnetic particle, and dye penetrant inspection according to ISO 9712.',
    icon: GraduationCap,
    duration: '5 Days',
    location: 'Melbourne / Global On-site'
  },
  {
    title: 'Geotechnical Safety Leadership',
    description: 'Risk management workshops for site supervisors managing drilling and excavation operations.',
    icon: Users,
    duration: '2 Days',
    location: 'On-site'
  },
  {
    title: 'Advanced GPR Interpretation',
    description: 'Master the art of reading radargrams for concrete scanning and utility mapping. Includes practical field modules.',
    icon: Activity,
    duration: '3 Days',
    location: 'Global Virtual / Hybrid'
  },
  {
    title: 'Corporate Engineering Standards',
    description: 'Customised training programs helping organisations align with AS/NZS standards and best practices.',
    icon: Globe,
    duration: 'Custom',
    location: 'Worldwide'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'oilandgas',
    title: 'Oil & Gas Engineering Consultancy',
    shortDescription: 'End-to-end engineering consultancy for upstream and midstream operations worldwide.',
    fullDescription: 'MBSC Australia provides specialist engineering consultancy for the oil & gas sector. Our team of experienced drilling, reservoir, and production engineers deliver integrated solutions including cementing QA/QC, well integrity diagnostics, production optimisation, and asset integrity management. We support major operators across Australia, the Middle East, and Europe.',
    icon: Landmark,
    imageUrl: '/oilandgas.jpg',
    features: ['Drilling Engineering', 'Reservoir Engineering', 'Production Optimisation', 'Well Integrity Management']
  },
  {
    id: 'training',
    title: 'Global Technical Training Programs',
    shortDescription: 'Industry-leading training programs delivered worldwide to upskill your technical workforce.',
    fullDescription: 'We design and deliver comprehensive technical training programs for organisations seeking to develop their engineering capabilities. Our certified instructors provide NDT certification, safety leadership, and specialist technical courses both on-site and through virtual platforms. Programs are tailored to meet Australian Standards, ISO requirements, and regional compliance needs.',
    icon: GraduationCap,
    imageUrl: '/Training-Programs.jpg',
    features: ['NDT Certification (ISO 9712)', 'Safety Leadership Programs', 'Technical Skills Development', 'Custom Corporate Training']
  },
  {
    id: 'digital',
    title: 'Integrated Engineering & Digital Solutions',
    shortDescription: 'Advanced digital platforms and AI-driven solutions for engineering data management.',
    fullDescription: 'MBSC Australia delivers innovative digital solutions that transform how organisations manage engineering data and operations. Our integrated platforms combine real-time monitoring, predictive analytics, and AI-powered insights to enhance decision-making. We help clients digitise workflows, optimise asset performance, and leverage data for competitive advantage.',
    icon: Cpu,
    imageUrl: '/Engineering-Digital-Solutions.jpg',
    features: ['Engineering Data Platforms', 'AI & Predictive Analytics', 'Real-Time Monitoring Systems', 'Digital Transformation Consulting']
  },
  {
    id: 'mining',
    title: 'Mining & Geology Technical Services',
    shortDescription: 'Comprehensive geological and geotechnical services for the resources sector.',
    fullDescription: 'Supporting the complete mining lifecycle from exploration through to rehabilitation. Our geologists and geotechnical engineers provide site investigations, geological modelling, tailings dam monitoring, and structural assessments. We deliver the technical expertise needed for safe, efficient, and compliant mining operations.',
    icon: Pickaxe,
    imageUrl: '/Mining-Services.jpg',
    features: ['Geotechnical Investigations', 'Geological Modelling', 'Tailings Dam Monitoring', 'Mine Site Assessments']
  },
  {
    id: 'safety',
    title: 'Safety, Compliance & Workforce Development',
    shortDescription: 'Building safer workplaces through compliance excellence and workforce capability.',
    fullDescription: 'MBSC Australia helps organisations achieve the highest standards of workplace safety and regulatory compliance. We provide safety audits, compliance consulting, and workforce development programs tailored to the oil & gas, mining, and construction sectors. Our approach combines technical expertise with practical implementation to create lasting safety cultures.',
    icon: ShieldCheck,
    imageUrl: '/Safety-Compliance-Workforce.jpg',
    features: ['Safety Audits & Reviews', 'Regulatory Compliance Consulting', 'Workforce Competency Programs', 'HSE Management Systems']
  }
];

export const EQUIPMENT_RENTAL = [
  { name: 'GPR Systems', desc: 'High-frequency GPR for concrete scanning.', price: '$450/day' },
  { name: 'Ultrasonic Testers', desc: 'Pundit Lab+ for UPV measurement.', price: '$200/day' },
  { name: 'Cover Meters', desc: 'Profometer 6 for rebar location.', price: '$150/day' },
  { name: 'Vibration Monitors', desc: 'Tri-axial geophones for site compliance.', price: '$300/day' },
];