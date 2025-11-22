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
  Briefcase
} from 'lucide-react';
import { NavigationItem, Page, ServiceItem, ProjectItem } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', page: Page.HOME },
  { label: 'Services', page: Page.SERVICES },
  { label: 'Projects', page: Page.PROJECTS },
  { label: 'Training', page: Page.TRAINING },
  { label: 'Rental', page: Page.RENTAL },
  { label: 'About', page: Page.ABOUT },
  { label: 'Contact', page: Page.CONTACT },
];

export const CONTACT_INFO = {
  address: "Melbourne HQ",
  phone: "+61 414 955 631",
  email: "admin@mbscaustralia.com.au",
  hours: "Mon - Fri: 07:00 - 17:00"
};

export const STATS_DATA = [
  { label: 'Projects Delivered', value: '1,200+', icon: Briefcase },
  { label: 'Safety Hours', value: '500k+', icon: ShieldCheck },
  { label: 'Meters Drilled', value: '85,000m', icon: Drill },
  { label: 'Assets Protected', value: '$4.5B', icon: Landmark },
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
    imageUrl: 'https://picsum.photos/seed/rig/800/600',
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
    imageUrl: 'https://picsum.photos/seed/melbmetro/800/600',
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
    imageUrl: 'https://picsum.photos/seed/pipeline/800/600',
    location: 'Melbourne Western Suburbs, VIC',
    outcome: 'Delivered comprehensive pipeline integrity assessment ensuring safe, reliable energy supply to growing western communities.'
  },
  {
    id: 'p10',
    title: 'Port of Melbourne Wharf Refurbishment',
    category: 'Marine & Offshore',
    description: 'Structural remediation and modernisation of port-side assets with marine concrete testing and corrosion assessment.',
    imageUrl: 'https://picsum.photos/seed/portmelb/800/600',
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
    id: 'geotech',
    title: 'Geotechnical Investigations',
    shortDescription: 'Comprehensive ground analysis for civil and mining infrastructure.',
    fullDescription: 'MBSC Australia provides rigorous geotechnical site investigations to ensure foundational integrity. Our services include borehole drilling, soil sampling, laboratory testing, and detailed reporting compliant with AS 1726 standards.',
    icon: Drill,
    imageUrl: 'https://picsum.photos/seed/geotech/800/600',
    features: ['Standard Penetration Testing (SPT)', 'Cone Penetration Testing (CPT)', 'Soil & Rock Logging', 'Laboratory Analysis']
  },
  {
    id: 'ndt',
    title: 'Concrete NDT',
    shortDescription: 'Non-destructive testing ensuring structural longevity and safety.',
    fullDescription: 'Utilising advanced Ultrasonic Pulse Velocity (UPV) and Ground Penetrating Radar (GPR), we assess concrete integrity without structural damage. We detect voids, rebar corrosion, and delamination in critical infrastructure.',
    icon: Activity,
    imageUrl: '/non-destructive-testing.jpg',
    features: ['GPR Scanning', 'Ultrasonic Pulse Velocity', 'Rebound Hammer Testing', 'Cover Meter Surveys']
  },
  {
    id: 'geophysics',
    title: 'Engineering Geophysics',
    shortDescription: 'Subsurface mapping using state-of-the-art sensing technology.',
    fullDescription: 'Our geophysical surveys provide non-invasive mapping of subsurface conditions. Essential for cavity detection, bedrock profiling, and utility mapping in complex industrial environments.',
    icon: Scan,
    imageUrl: 'https://picsum.photos/seed/physics/800/600',
    features: ['Seismic Refraction', 'Electrical Resistivity Imaging', 'Electromagnetic Surveys', 'Vibration Monitoring']
  },
  {
    id: 'precast',
    title: 'Precast Concrete QC',
    shortDescription: 'Rigorous quality control for precast manufacturing and installation.',
    fullDescription: 'We ensure precast elements meet stringent project specifications (AS 3850). From pre-pour inspections to post-cure strength testing, our QC protocols mitigate risk in large-scale construction.',
    icon: ShieldCheck,
    imageUrl: 'https://picsum.photos/seed/precast/800/600',
    features: ['Dimensional Tolerance Checks', 'Pre-pour Inspections', 'Curing Verification', 'Lifting Insert Testing']
  },
  {
    id: 'mining',
    title: 'Mining Services',
    shortDescription: 'Specialised testing and inspection for the resources sector.',
    fullDescription: 'Supporting the lifecycle of mine sites from exploration to rehabilitation. We offer tailings dam monitoring, shaft integrity testing, and heavy-machinery foundation analysis.',
    icon: Pickaxe,
    imageUrl: '/Mining-Services.jpg',
    features: ['Tailings Dam Monitoring', 'Shaft Inspection', 'Haul Road Analysis', 'Compliance Audits']
  },
  {
    id: 'civil',
    title: 'Civil Infrastructure',
    shortDescription: 'End-to-end engineering support for public and private works.',
    fullDescription: 'Partnering with government and private contractors to deliver safe, compliant infrastructure. Bridges, tunnels, roads, and marine structures benefit from our lifecycle testing services.',
    icon: Landmark,
    imageUrl: 'https://picsum.photos/seed/civil/800/600',
    features: ['Bridge Deck Analysis', 'Pavement Testing', 'Tunnel Lining Inspection', 'Asset Management']
  }
];

export const EQUIPMENT_RENTAL = [
  { name: 'GPR Systems', desc: 'High-frequency GPR for concrete scanning.', price: '$450/day' },
  { name: 'Ultrasonic Testers', desc: 'Pundit Lab+ for UPV measurement.', price: '$200/day' },
  { name: 'Cover Meters', desc: 'Profometer 6 for rebar location.', price: '$150/day' },
  { name: 'Vibration Monitors', desc: 'Tri-axial geophones for site compliance.', price: '$300/day' },
];