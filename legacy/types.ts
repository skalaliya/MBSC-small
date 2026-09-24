import { LucideIcon } from 'lucide-react';

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  TRAINING = 'TRAINING',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT',
  RENTAL = 'RENTAL'
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  imageUrl: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  location: string;
  outcome: string;
}

export interface NavigationItem {
  label: string;
  page: Page;
}