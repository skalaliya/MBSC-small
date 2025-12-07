import { ProjectItem } from '../types';

/**
 * Category priority map for project sorting.
 * Lower numbers = higher priority (appear first).
 */
const CATEGORY_PRIORITY: Record<string, number> = {
  'Oil & Gas': 1,
  'Mining Infrastructure': 2,
  'Mining & Geology': 2, // Alternative naming (same priority as Mining Infrastructure)
  // All other categories default to priority 999
};

/**
 * Gets the priority value for a given category.
 * Returns 999 for categories not explicitly prioritized.
 */
const getCategoryPriority = (category: string): number => {
  return CATEGORY_PRIORITY[category] ?? 999;
};

/**
 * Sorts projects by category priority:
 * 1. Oil & Gas (priority 1)
 * 2. Mining Infrastructure / Mining & Geology (priority 2)
 * 3. All other categories (priority 999)
 * 
 * Within each priority level, maintains original array order.
 * 
 * @param projects - Array of ProjectItem objects to sort
 * @returns New sorted array (does not mutate original)
 */
export const sortProjectsByCategory = (projects: ProjectItem[]): ProjectItem[] => {
  return [...projects].sort((a, b) => {
    const priorityA = getCategoryPriority(a.category);
    const priorityB = getCategoryPriority(b.category);
    
    // Sort by priority (ascending)
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // If same priority, maintain original order
    return 0;
  });
};
