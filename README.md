# SuperPlaced AI

Multi-Agent AI Career Acceleration SaaS Platform


---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Framer Motion
- Three.js + React Three Fiber
- Tailwind CSS

---

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/superplaced-ai.git
cd superplaced-ai[folder name] try with ls\\then folder name\....
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.local.example .env.local
```

**4. Run development server**
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Project Structure
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/og/route.tsx
├── components/
│   ├── sections/
│   ├── canvas/
│   └── ui/
├── lib/
│   └── animations.ts
└── public/

---

## Build for Production

```bash
npm run build
npm start
```

---

## Deploy on Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variables from .env.local.example
4. Deploy — auto-deploys on every push to main

The easiest way to deploy is via the Vercel Platform. Check the Next.js deployment documentation for more details.

---

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-site-url.com
NEXT_PUBLIC_WAITLIST_EMAIL=hello@your-domain.com
```
---

## Learn More

- Next.js Documentation — learn about Next.js features and API
- Learn Next.js — interactive Next.js tutorial
- Next.js GitHub Repository — feedback and contributions welcome
