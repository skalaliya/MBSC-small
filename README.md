<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MBSC Australia - Engineering & Testing Services

A modern, responsive website for MBSC Australia featuring an AI-powered chat assistant using Google's Gemini API.

View your app in AI Studio: https://ai.studio/apps/drive/1YNohe6SwZVVmvIII7J74i1ucevagVZog

## Features

- 🏗️ Engineering services showcase
- 💬 AI-powered chat widget (Gemini API)
- 📱 Fully responsive design
- ⚡ Built with Vite + React + TypeScript
- 🎨 Styled with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- Gemini API key from [Google AI Studio](https://ai.google.dev/)

## Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy `.env.example` to `.env.local` and add your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and replace `your_api_key_here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Add environment variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key from [Google AI Studio](https://ai.google.dev/)
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable via CLI or dashboard:
   ```bash
   vercel env add GEMINI_API_KEY
   ```

### Important for Vercel Deployment

Make sure to set the `GEMINI_API_KEY` environment variable in your Vercel project settings:
- Go to your project settings
- Navigate to "Environment Variables"
- Add `GEMINI_API_KEY` with your API key
- Redeploy your project

## Project Structure

```
├── components/          # React components
│   ├── ChatWidget.tsx   # AI chat interface
│   ├── Hero.tsx         # Landing hero section
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer component
├── services/            # API services
│   └── geminiService.ts # Gemini AI integration
├── assets/              # Static assets
├── App.tsx              # Main app component
├── index.tsx            # App entry point
├── constants.ts         # App constants & data
├── types.ts             # TypeScript types
└── vite.config.ts       # Vite configuration

```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **Google Gemini AI** - Chat assistant

## License

Private - MBSC Australia
