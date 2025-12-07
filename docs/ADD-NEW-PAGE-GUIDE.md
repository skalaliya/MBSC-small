# Guide: Adding a New Page to MBSC Australia Website

This guide explains how to add a new page to the application using the centralized routing architecture.

## Architecture Overview

The application uses a **centralized routing configuration** to eliminate code duplication and ensure type safety:

- **`routes.ts`**: Single source of truth for all routes
- **`components/Layout.tsx`**: Shared layout wrapper with Navbar/Footer
- **`App.tsx`**: Main routing configuration using React Router v6
- **`types.ts`**: Page enum for type safety
- **`seo.ts`**: SEO metadata configuration

## Step-by-Step: Adding a New Page

### 1. Define the Page Type

Add your page to the `Page` enum in **`types.ts`**:

```typescript
export enum Page {
  HOME = 'home',
  SERVICES = 'services',
  PROJECTS = 'projects',
  TRAINING = 'training',
  RENTAL = 'rental',
  ABOUT = 'about',
  CONTACT = 'contact',
  NEW_PAGE = 'new-page',  // Add your new page here
}
```

### 2. Add Route Configuration

Add your route to the `ROUTES` object in **`routes.ts`**:

```typescript
export const ROUTES: Record<Page, RouteConfig> = {
  // ... existing routes ...
  [Page.NEW_PAGE]: {
    path: '/new-page',
    page: Page.NEW_PAGE,
  },
};
```

### 3. Create the Page Component

Create a new file in **`pages/`** directory, e.g., **`pages/NewPage.tsx`**:

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../routes';

const NewPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            {t('newPage.pageTitle')}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">
            {t('newPage.pageSubtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Your page content here */}
        
        {/* Example: Link to another page using ROUTES */}
        <Link 
          to={ROUTES.CONTACT.path} 
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded"
        >
          {t('newPage.contactCta')}
        </Link>
      </div>
    </div>
  );
};

export default NewPage;
```

**Key Points:**
- Import `Link` from `react-router-dom` (NOT `useNavigate`)
- Import `ROUTES` from `../routes` for type-safe navigation
- Use `{ROUTES.PAGE_NAME.path}` for all internal links
- Use `useTranslation()` hook for internationalized text

### 4. Add Route to App.tsx

Import and add your page component to the routes in **`App.tsx`**:

```typescript
// Add import at the top
import NewPage from './pages/NewPage';

// Inside the Routes component (within Layout)
<Route path={ROUTES.NEW_PAGE.path} element={<NewPage />} />
```

The complete Routes section should look like:

```typescript
<Routes>
  <Route element={<Layout />}>
    <Route path={ROUTES.HOME.path} element={<HomePage />} />
    <Route path={ROUTES.SERVICES.path} element={<ServicesPage />} />
    <Route path={ROUTES.PROJECTS.path} element={<ProjectsPage />} />
    <Route path={ROUTES.TRAINING.path} element={<TrainingPage />} />
    <Route path={ROUTES.RENTAL.path} element={<RentalPage />} />
    <Route path={ROUTES.ABOUT.path} element={<AboutPage />} />
    <Route path={ROUTES.CONTACT.path} element={<ContactPage />} />
    <Route path={ROUTES.NEW_PAGE.path} element={<NewPage />} />  {/* Add here */}
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

### 5. Add SEO Metadata

Add SEO configuration in **`seo.ts`**:

```typescript
export const PAGE_SEO_META: Record<Page, SeoMeta> = {
  // ... existing pages ...
  [Page.NEW_PAGE]: {
    title: 'New Page Title | MBSC Australia',
    description: 'Description of your new page for search engines (155 chars max)',
    keywords: 'keyword1, keyword2, keyword3, MBSC Australia',
    ogImage: '/og-images/new-page.jpg',
  },
};
```

### 6. (Optional) Add to Navigation

If you want the page in the main navbar, add it to **`constants.ts`**:

```typescript
export const NAV_ITEMS = [
  // ... existing items ...
  { id: 'newpage', page: Page.NEW_PAGE, labelKey: 'nav.newpage' },
];
```

Then add translations in **`i18n/locales/en/translation.json`** and **`i18n/locales/fr/translation.json`**:

```json
{
  "nav": {
    "newpage": "New Page"
  },
  "newPage": {
    "pageTitle": "New Page Title",
    "pageSubtitle": "Subtitle description",
    "contactCta": "Get in Touch"
  }
}
```

### 7. Add to Sitemap

Update **`public/sitemap.xml`** to include your new page:

```xml
<url>
  <loc>https://www.mbscaustralia.com.au/new-page</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 8. Test Your Page

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Test navigation:**
   - Direct URL: `http://localhost:3000/new-page`
   - Click navbar links
   - Test mobile responsive menu
   - Verify all internal links work

4. **Check TypeScript:**
   ```bash
   npm run type-check
   ```

## Navigation Best Practices

### ✅ DO: Use Link with ROUTES

```typescript
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

<Link to={ROUTES.CONTACT.path} className="...">
  Contact Us
</Link>
```

### ❌ DON'T: Use hardcoded strings

```typescript
// ❌ Bad - no type safety, prone to typos
<Link to="/contact">Contact Us</Link>

// ❌ Bad - causes full page reload
<a href="/contact">Contact Us</a>

// ❌ Bad - unnecessary for simple navigation
const navigate = useNavigate();
<button onClick={() => navigate('/contact')}>Contact</button>
```

### When to Use `useNavigate()`

Only use `useNavigate()` for **programmatic navigation** after user actions:

```typescript
const navigate = useNavigate();

// Form submission redirect
const handleSubmit = async (e) => {
  e.preventDefault();
  await submitForm();
  navigate(ROUTES.SUCCESS.path);  // Redirect after action
};

// Conditional navigation
const handleAction = () => {
  if (isLoggedIn) {
    navigate(ROUTES.DASHBOARD.path);
  } else {
    navigate(ROUTES.LOGIN.path);
  }
};
```

## File Structure Summary

```
/workspaces/MBSC-small/
├── routes.ts                      # ← Single source of truth for routes
├── types.ts                       # ← Page enum definition
├── seo.ts                         # ← SEO metadata
├── constants.ts                   # ← Navigation items
├── App.tsx                        # ← Main routing setup
├── components/
│   ├── Layout.tsx                 # ← Shared layout wrapper
│   ├── Navbar.tsx                 # ← Uses ROUTES for navigation
│   └── Footer.tsx                 # ← Uses ROUTES for navigation
├── pages/
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── ProjectsPage.tsx
│   ├── TrainingPage.tsx
│   ├── RentalPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── NotFoundPage.tsx
│   └── NewPage.tsx               # ← Your new page here
├── i18n/
│   └── locales/
│       ├── en/translation.json   # ← Add English translations
│       └── fr/translation.json   # ← Add French translations
└── public/
    └── sitemap.xml               # ← Update with new route
```

## Troubleshooting

### Route Not Working
- Verify `Page` enum is updated in `types.ts`
- Check route is added to `ROUTES` object in `routes.ts`
- Ensure route is registered in `App.tsx` Routes
- Confirm path starts with `/`

### TypeScript Errors
- Run `npm run type-check` to see all type errors
- Ensure `Page` enum value matches across all files
- Verify `RouteConfig` structure in `routes.ts`

### Navigation Not Working
- Use `<Link>` instead of `<a>` tags
- Import `ROUTES` and use `ROUTES.PAGE_NAME.path`
- Check browser console for React Router warnings

### 404 Page Shows Instead
- Verify route path is correct in `routes.ts`
- Ensure route is added BEFORE the `*` catch-all route in `App.tsx`
- Check that path doesn't have trailing slashes

## References

- **React Router v6 Docs:** https://reactrouter.com/
- **TypeScript Enums:** https://www.typescriptlang.org/docs/handbook/enums.html
- **i18next for React:** https://react.i18next.com/

---

**Last Updated:** January 2025  
**Maintainer:** MBSC Australia Development Team
