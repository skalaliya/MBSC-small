# 📝 Website Editing Guide - MBSC Australia

Welcome! This guide will help you make changes to your website **without any coding knowledge**. Follow these simple steps to update content on different pages.

---

## 🎯 Quick Start

### What You Need:
1. **VS Code** or any text editor
2. **Access to the repository** (you already have it!)
3. **5 minutes** to learn the basics

### Important File to Know:
- **`constants.ts`** - This is where **90% of your content lives**
- All text, phone numbers, emails, services, projects are here!

---

## 📂 Project Structure (Simplified)

```
MBSC-small/
│
├── constants.ts          ← 🎯 EDIT THIS FILE FOR MOST CHANGES
├── components/           ← Component files (rarely need to edit)
│   ├── Hero.tsx         
│   ├── Navbar.tsx       
│   └── Footer.tsx       
├── App.tsx              ← Main app (advanced users only)
└── README.md            ← Project documentation
```

---

## 🛠️ How to Make Changes

### Step 1: Open the File
1. Open **VS Code**
2. Navigate to `/workspaces/MBSC-small/`
3. Open `constants.ts`

### Step 2: Find What You Want to Change
Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to search for text

### Step 3: Make Your Changes
Edit the text between quotes `"like this"`

### Step 4: Save
Press **Ctrl+S** (Windows) or **Cmd+S** (Mac)

### Step 5: Test Locally
```bash
npm run dev
```
Visit: http://localhost:3000

### Step 6: Deploy
```bash
npm run build
git add .
git commit -m "Updated content"
git push
```

---

## 📄 Page-by-Page Editing Guide

---

## 1️⃣ CONTACT PAGE

**File:** `constants.ts` (Lines 28-33)

### What You Can Change:

```typescript
export const CONTACT_INFO = {
  address: "Melbourne HQ",              // ← Office location
  phone: "+61 414 955 631",            // ← Phone number
  email: "admin@mbscaustralia.com.au", // ← Email address
  hours: "Mon - Fri: 07:00 - 17:00"    // ← Business hours
};
```

### Example Changes:

**Change Phone Number:**
```typescript
phone: "+61 414 955 631",  // OLD
phone: "+61 3 9876 5432",  // NEW
```

**Change Email:**
```typescript
email: "admin@mbscaustralia.com.au",      // OLD
email: "contact@mbscaustralia.com.au",    // NEW
```

**Change Business Hours:**
```typescript
hours: "Mon - Fri: 07:00 - 17:00"       // OLD
hours: "Mon - Sat: 08:00 - 18:00"       // NEW
```

---

## 2️⃣ HOME PAGE - STATISTICS

**File:** `constants.ts` (Lines 35-40)

### What You Can Change:

```typescript
export const STATS_DATA = [
  { label: 'Projects Delivered', value: '1,200+', icon: Briefcase },
  { label: 'Safety Hours', value: '500k+', icon: ShieldCheck },
  { label: 'Meters Drilled', value: '85,000m', icon: Drill },
  { label: 'Assets Protected', value: '$4.5B', icon: Landmark },
];
```

### Example Changes:

**Update Project Count:**
```typescript
{ label: 'Projects Delivered', value: '1,200+', icon: Briefcase },  // OLD
{ label: 'Projects Delivered', value: '1,500+', icon: Briefcase },  // NEW
```

**Update Safety Hours:**
```typescript
{ label: 'Safety Hours', value: '500k+', icon: ShieldCheck },  // OLD
{ label: 'Safety Hours', value: '750k+', icon: ShieldCheck },  // NEW
```

---

## 3️⃣ PROJECTS PAGE

**File:** `constants.ts` (Lines 42-75)

### What You Can Change:

```typescript
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',                                    // ← Unique ID (don't change)
    title: 'Pilbara Rail Expansion',            // ← Project name
    category: 'Mining Infrastructure',           // ← Category
    description: 'Geotechnical investigation...', // ← Description
    imageUrl: 'https://picsum.photos/...',      // ← Image URL
    location: 'Pilbara, WA',                    // ← Location
    outcome: 'Delivered 3 weeks ahead...'       // ← Result/outcome
  },
  // ... more projects
];
```

### Example: Adding a New Project

Copy this template and paste it before the closing `]`:

```typescript
  {
    id: 'p5',                                          // ← New unique ID
    title: 'Your New Project Name',                   // ← Your project
    category: 'Civil Construction',                    // ← Category
    description: 'Brief description of the project.',  // ← Details
    imageUrl: 'https://picsum.photos/seed/newproject/800/600',
    location: 'Sydney, NSW',                          // ← Location
    outcome: 'Successfully completed on time.'        // ← Result
  },
```

### Example: Editing Existing Project

**Change Project Title:**
```typescript
title: 'Pilbara Rail Expansion',      // OLD
title: 'Pilbara Rail Extension 2025', // NEW
```

**Change Location:**
```typescript
location: 'Pilbara, WA',    // OLD
location: 'Perth, WA',      // NEW
```

---

## 4️⃣ SERVICES PAGE

**File:** `constants.ts` (Lines 108-167)

### What You Can Change:

```typescript
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'geotech',                                  // ← Unique ID
    title: 'Geotechnical Investigations',          // ← Service name
    shortDescription: 'Comprehensive ground...',    // ← Short text
    fullDescription: 'MBSC Australia provides...',  // ← Full details
    icon: Drill,                                    // ← Icon (rarely change)
    imageUrl: 'https://picsum.photos/...',         // ← Image URL
    features: [                                     // ← Bullet points
      'Standard Penetration Testing (SPT)',
      'Cone Penetration Testing (CPT)',
      'Soil & Rock Logging',
      'Laboratory Analysis'
    ]
  },
  // ... more services
];
```

### Example: Editing a Service

**Change Service Title:**
```typescript
title: 'Geotechnical Investigations',           // OLD
title: 'Advanced Geotechnical Solutions',       // NEW
```

**Add a Feature:**
```typescript
features: [
  'Standard Penetration Testing (SPT)',
  'Cone Penetration Testing (CPT)',
  'Soil & Rock Logging',
  'Laboratory Analysis',
  'Advanced Soil Sampling'  // ← NEW FEATURE
]
```

**Update Description:**
```typescript
shortDescription: 'Comprehensive ground analysis for civil and mining infrastructure.',  // OLD
shortDescription: 'Expert ground analysis and geotechnical solutions.',  // NEW
```

---

## 5️⃣ TRAINING PAGE

**File:** `constants.ts` (Lines 77-106)

### What You Can Change:

```typescript
export const TRAINING_COURSES = [
  {
    title: 'NDT Level 1 & 2 Certification',                    // ← Course name
    description: 'Comprehensive training in ultrasonic...',     // ← Details
    icon: GraduationCap,                                        // ← Icon
    duration: '5 Days',                                         // ← Duration
    location: 'Melbourne / Global On-site'                      // ← Location
  },
  // ... more courses
];
```

### Example: Adding a New Course

```typescript
  {
    title: 'Safety Management Workshop',                       // ← New course
    description: 'Essential safety protocols for site managers.',  // ← Details
    icon: ShieldCheck,                                         // ← Icon
    duration: '3 Days',                                        // ← Duration
    location: 'Melbourne / Online'                            // ← Location
  },
```

### Example: Editing Course Details

**Change Duration:**
```typescript
duration: '5 Days',     // OLD
duration: '7 Days',     // NEW
```

**Change Location:**
```typescript
location: 'Melbourne / Global On-site',  // OLD
location: 'Melbourne / Sydney / Online', // NEW
```

---

## 6️⃣ EQUIPMENT RENTAL PAGE

**File:** `constants.ts` (Lines 169-174)

### What You Can Change:

```typescript
export const EQUIPMENT_RENTAL = [
  { 
    name: 'GPR Systems',                              // ← Equipment name
    desc: 'High-frequency GPR for concrete scanning.', // ← Description
    price: '$450/day'                                  // ← Price
  },
  // ... more equipment
];
```

### Example: Adding New Equipment

```typescript
  { 
    name: 'Concrete Core Drill',               // ← New equipment
    desc: 'Professional-grade diamond drilling.',  // ← Description
    price: '$350/day'                          // ← Price
  },
```

### Example: Updating Prices

**Change Price:**
```typescript
price: '$450/day'   // OLD
price: '$495/day'   // NEW
```

---

## 7️⃣ NAVIGATION MENU

**File:** `constants.ts` (Lines 18-26)

### What You Can Change:

```typescript
export const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', page: Page.HOME },
  { label: 'Services', page: Page.SERVICES },
  { label: 'Projects', page: Page.PROJECTS },
  { label: 'Training', page: Page.TRAINING },
  { label: 'Rental', page: Page.RENTAL },
  { label: 'About', page: Page.ABOUT },
  { label: 'Contact', page: Page.CONTACT },
];
```

### Example: Changing Menu Labels

**Change "Rental" to "Equipment":**
```typescript
{ label: 'Rental', page: Page.RENTAL },      // OLD
{ label: 'Equipment', page: Page.RENTAL },   // NEW
```

⚠️ **Note:** Only change the `label`, NOT the `page` value!

---

## 🎨 ADVANCED: Changing Colors & Styling

Colors are defined using Tailwind CSS classes in component files:

### Common Color Classes:
- `bg-teal-900` - Dark teal background
- `text-white` - White text
- `text-slate-900` - Dark gray text
- `bg-amber-500` - Orange/amber background
- `border-slate-200` - Light gray border

### Where to Find Them:
- **Hero Section:** `components/Hero.tsx`
- **Navbar:** `components/Navbar.tsx`
- **Footer:** `components/Footer.tsx`
- **Main Pages:** `App.tsx`

### Example: Change Button Color

**In Hero.tsx:**
```tsx
className="bg-amber-500 hover:bg-amber-400..."  // OLD (Orange)
className="bg-blue-500 hover:bg-blue-400..."    // NEW (Blue)
```

---

## 🖼️ Changing Images

### Current Image System:
The site uses placeholder images from `picsum.photos`

### Image URL Format:
```typescript
imageUrl: 'https://picsum.photos/seed/KEYWORD/800/600'
```

### How to Change:

**Option 1: Use Different Placeholder**
```typescript
imageUrl: 'https://picsum.photos/seed/construction/800/600',  // OLD
imageUrl: 'https://picsum.photos/seed/engineering/800/600',   // NEW
```

**Option 2: Use Your Own Images**
1. Upload image to a hosting service (Imgur, Cloudinary, etc.)
2. Copy the image URL
3. Replace:
```typescript
imageUrl: 'https://your-image-host.com/image.jpg',
```

---

## ✅ Testing Your Changes

### 1. Test Locally (Before Deploying)

```bash
# Start development server
npm run dev
```

Visit: http://localhost:3000

**Check:**
- ✅ No spelling errors
- ✅ Text displays correctly
- ✅ Links work
- ✅ Images load

### 2. Build for Production

```bash
npm run build
```

**If successful, you'll see:**
```
✓ built in 3s
dist/index.html    1.02 kB
dist/assets/...   247.63 kB
```

---

## 🚀 Deploying Your Changes

### Step-by-Step Deployment:

**1. Save All Changes**
- Ctrl+S (Windows) / Cmd+S (Mac)

**2. Stage Changes**
```bash
git add .
```

**3. Commit Changes**
```bash
git commit -m "Updated contact information"
```
(Change the message to describe what you changed)

**4. Push to GitHub**
```bash
git push origin main
```

**5. Vercel Auto-Deploys**
- Wait 2-3 minutes
- Check: https://mbsc-small.vercel.app/

---

## 🆘 Common Issues & Solutions

### Issue: "Syntax Error" After Editing

**Problem:** Missing comma or quote

**Solution:**
```typescript
// ❌ WRONG (missing comma)
{ name: 'Item 1', price: '$100' }
{ name: 'Item 2', price: '$200' }

// ✅ CORRECT (has comma)
{ name: 'Item 1', price: '$100' },
{ name: 'Item 2', price: '$200' }
```

### Issue: Changes Not Showing

**Solution 1:** Clear browser cache
- Chrome: Ctrl+Shift+Delete
- Then hard refresh: Ctrl+Shift+R

**Solution 2:** Rebuild
```bash
npm run build
npm run preview
```

### Issue: Build Fails

**Check:**
1. Missing quotes `"`
2. Missing commas `,`
3. Missing brackets `]` or `}`

**Fix:** Look at the error message line number

---

## 📞 Quick Reference Cheat Sheet

| What to Change | File | Line | Example |
|----------------|------|------|---------|
| Phone/Email | `constants.ts` | 28-33 | `phone: "+61 414 955 631"` |
| Statistics | `constants.ts` | 35-40 | `value: '1,500+'` |
| Projects | `constants.ts` | 42-75 | `title: 'New Project'` |
| Services | `constants.ts` | 108-167 | `title: 'New Service'` |
| Training | `constants.ts` | 77-106 | `duration: '5 Days'` |
| Equipment | `constants.ts` | 169-174 | `price: '$450/day'` |
| Menu Labels | `constants.ts` | 18-26 | `label: 'New Name'` |

---

## 🎓 Learning More

### Useful VS Code Shortcuts:
- **Find:** Ctrl+F (Windows) / Cmd+F (Mac)
- **Save:** Ctrl+S (Windows) / Cmd+S (Mac)
- **Undo:** Ctrl+Z (Windows) / Cmd+Z (Mac)
- **Format Code:** Shift+Alt+F (Windows) / Shift+Option+F (Mac)

### Understanding the Code:

```typescript
// This is a comment - doesn't affect the website

export const VARIABLE_NAME = {    // ← Variable declaration
  key: "value",                    // ← Data
  anotherKey: "another value"      // ← More data
};                                 // ← Don't forget this!
```

---

## ✨ Pro Tips

1. **Always test locally first** (`npm run dev`)
2. **Make small changes** - easier to fix if something breaks
3. **Keep backups** - Git automatically saves old versions
4. **Use descriptive commit messages** - helps track changes
5. **Check on mobile too** - site is responsive

---

## 🎯 Next Steps

1. **Practice:** Try changing your phone number
2. **Experiment:** Add a new project
3. **Deploy:** Push your changes live
4. **Celebrate:** You're now a website editor! 🎉

---

## 📚 Resources

- **Git Basics:** https://git-scm.com/docs
- **TypeScript Basics:** https://www.typescriptlang.org/docs/
- **React Basics:** https://react.dev/learn
- **Tailwind CSS Colors:** https://tailwindcss.com/docs/customizing-colors

---

## 💬 Need Help?

If you get stuck:
1. Check the error message
2. Google the error
3. Undo recent changes (Ctrl+Z)
4. Restore from Git: `git checkout -- filename.ts`

---

**Made with ❤️ for MBSC Australia**

*Last Updated: November 21, 2025*
