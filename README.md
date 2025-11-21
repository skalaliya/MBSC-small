<div align="center">
  
  <img width="1200" height="475" alt="MBSC Australia Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # MBSC Australia

  ### Engineering • Testing • Inspection Services
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-Private-red)](LICENSE)
  
  [Live Demo](https://mbsc-small.vercel.app/) • [Report Bug](https://github.com/skalaliya/MBSC-small/issues) • [Request Feature](https://github.com/skalaliya/MBSC-small/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Service Offerings](#service-offerings)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

**MBSC Australia** is a comprehensive corporate website showcasing premier engineering, testing, and inspection services for the Civil, Mining, and Oil & Gas sectors. This modern, high-performance web application delivers an exceptional user experience while maintaining professional standards and accessibility.

### 🌟 Key Features

#### 🏗️ **Comprehensive Service Showcase**
- Non-Destructive Testing (NDT) solutions
- Geotechnical investigation services
- Ground Penetrating Radar (GPR) scanning
- Materials testing and quality assurance
- Engineering inspections and certifications

#### 💼 **Business Solutions**
- Equipment rental catalog with real-time availability
- Professional training courses (ISO 9712 certified)
- Project portfolio with case studies
- Interactive contact and enquiry system

#### 🎨 **Design & User Experience**
- Fully responsive design (mobile-first approach)
- Professional corporate aesthetic
- Industrial-themed color palette
- Optimized for performance (247KB bundle)
- Smooth animations and transitions
- Accessibility compliant (WCAG 2.1)

#### ⚡ **Technical Excellence**
- Lightning-fast page loads with Vite
- Type-safe codebase with TypeScript
- SEO optimized
- Production-ready build pipeline
- Clean, maintainable code architecture

---

## 🛠️ Built With

This project leverages modern web technologies for optimal performance and developer experience:

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2.0 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.2 | Type-safe development |
| [Vite](https://vitejs.dev/) | 6.2.0 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Latest | Utility-first styling (CDN) |
| [Lucide React](https://lucide.dev/) | 0.554.0 | Icon library |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0 or higher) - Included with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/skalaliya/MBSC-small.git
   cd MBSC-small
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:3000`
- **Network**: `http://<your-ip>:3000`

### Production Build

Build the optimized production bundle:

```bash
npm run build
```

**Build Output:**
- Bundle size: ~247KB (gzipped: ~74KB)
- Output directory: `dist/`
- Assets: Hashed filenames for optimal caching

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
MBSC-small/
│
├── assets/                    # Static assets
│   └── logo.svg              # Company logo
│
├── components/               # React components
│   ├── Footer.tsx           # Site footer with links
│   ├── Hero.tsx             # Landing page hero section
│   └── Navbar.tsx           # Navigation bar
│
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
├── index.html               # HTML template
│
├── constants.ts             # Application constants & data
│   ├── NAV_ITEMS           # Navigation configuration
│   ├── SERVICES_DATA       # Service offerings
│   ├── PROJECTS_DATA       # Portfolio projects
│   ├── TRAINING_COURSES    # Course catalog
│   └── EQUIPMENT_RENTAL    # Rental inventory
│
├── types.ts                 # TypeScript type definitions
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
│
└── dist/                    # Production build (generated)
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

**Automated Deployment:**

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import the `MBSC-small` repository
4. Vercel auto-detects Vite configuration
5. Click **Deploy**

**CLI Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts:
# "deploy": "vite build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Custom Server Deployment

Build and serve the `dist/` folder with any static hosting provider:

```bash
npm run build
# Copy dist/ folder to your server
```

---

## 🏢 Service Offerings

### Non-Destructive Testing (NDT)
- Ultrasonic Testing (UT)
- Radiographic Testing (RT)
- Magnetic Particle Inspection (MPI)
- Dye Penetrant Testing (PT)
- Eddy Current Testing (ECT)

### Geotechnical Services
- Site investigation & soil testing
- Borehole drilling & sampling
- Rock mechanics testing
- Foundation design support

### Ground Penetrating Radar
- Concrete scanning & mapping
- Utility detection & location
- Structural assessment
- Void detection

### Materials Testing
- Concrete & mortar testing
- Steel & metal analysis
- Aggregate testing
- AS/NZS compliance verification

### Training & Certification
- NDT Level 1 & 2 (ISO 9712)
- Geotechnical safety leadership
- Advanced GPR interpretation

---

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions ✅ |
| Firefox | Last 2 versions ✅ |
| Safari | Last 2 versions ✅ |
| Edge | Last 2 versions ✅ |
| Opera | Last 2 versions ✅ |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is **private** and proprietary to MBSC Australia. All rights reserved.

Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

---

## 📞 Contact

**MBSC Australia**

- 📧 Email: admin@mbscaustralia.com.au
- 📱 Phone: +61 414 955 631
- 🏢 Address: Melbourne HQ
- ⏰ Hours: Monday - Friday, 07:00 - 17:00

**Project Links:**
- Repository: [github.com/skalaliya/MBSC-small](https://github.com/skalaliya/MBSC-small)
- Live Site: [mbsc-small.vercel.app](https://mbsc-small.vercel.app/)
- Issues: [github.com/skalaliya/MBSC-small/issues](https://github.com/skalaliya/MBSC-small/issues)

---

<div align="center">

**Made with ❤️ for the Engineering Community**

⭐ Star this repo if you find it helpful!

</div>
