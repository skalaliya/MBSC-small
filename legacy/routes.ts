/**
 * Centralized route configuration
 * Single source of truth for all application routes
 */

import { Page } from './types';

export interface RouteConfig {
  path: string;
  page: Page;
  label: string;
}

/**
 * All application routes
 * Use this for navigation, route generation, and SEO mapping
 */
export const ROUTES: Record<string, RouteConfig> = {
  HOME: {
    path: '/',
    page: Page.HOME,
    label: 'home'
  },
  SERVICES: {
    path: '/services',
    page: Page.SERVICES,
    label: 'services'
  },
  PROJECTS: {
    path: '/projects',
    page: Page.PROJECTS,
    label: 'projects'
  },
  TRAINING: {
    path: '/training',
    page: Page.TRAINING,
    label: 'training'
  },
  RENTAL: {
    path: '/rental',
    page: Page.RENTAL,
    label: 'rental'
  },
  ABOUT: {
    path: '/about',
    page: Page.ABOUT,
    label: 'about'
  },
  CONTACT: {
    path: '/contact',
    page: Page.CONTACT,
    label: 'contact'
  }
} as const;

/**
 * Get route path from Page enum
 */
export const getRoutePath = (page: Page): string => {
  const route = Object.values(ROUTES).find(r => r.page === page);
  return route?.path || '/';
};

/**
 * Get Page enum from route path
 */
export const getPageFromPath = (path: string): Page => {
  const route = Object.values(ROUTES).find(r => r.path === path);
  return route?.page || Page.HOME;
};
