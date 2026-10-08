# 🏎️ Scroll-Driven Hero Section Animation

A high-performance, scroll-driven automotive hero animation inspired by the [reference demo](https://paraschaturvedi.github.io/car-scroll-animation), built with **Next.js 15**, **React 19**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🌟 Highlights & Features

- **Occupies Screen Above the Fold**: Meets 100% of assignment specifications right on landing.
- **Letter-Spaced Headline (`W E L C O M E   I T Z F I Z Z`)**:
  - Smooth 3D perspective stagger entrance on page load.
  - Interactive car-tracking letter illumination as the vehicle speeds across the track.
- **Impact Metrics & Statistics (Step 01 - 04)**:
  - **58%** — *Increase in pick up point use* (Lime Yellow `#def54f`)
  - **23%** — *Decreased in customer phone calls* (Electric Cyan `#6ac9ff`)
  - **27%** — *Increase in delivery efficiency* (Graphite Dark `#2a2c35`)
  - **40%** — *Reduced turnaround time* (Tangerine Orange `#fa7328`)
  - Animated counting numbers on initial load.
  - Dynamic milestone reaction (highlight glow, pulse, elevation) tied to vehicle scroll progress.
- **McLaren 720S Top-View Scroll Animation**:
  - Pinned viewport with smooth `scrub: 1.2` interpolation for natural momentum.
  - Glowing neon green trail (`#45db7d`) expanding seamlessly behind the car.
  - Dynamic road markings with velocity-based dash animation.
  - Real-time speedometer (0 → 212 MPH) and scroll percentage readout.
- **Flawless Spacing & Mobile Responsiveness**:
  - Clean vertical hierarchy with no overlapping cards, text, or controls.
  - Fully responsive across mobile, tablet, laptop, and ultra-wide screens.

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| **Next.js 15 (App Router)** | Framework with static optimization & zero-overhead rendering |
| **React 19** | Component architecture & custom state hooks |
| **TypeScript** | Strict type safety with zero any types |
| **GSAP 3.12** | Core timeline & tween sequencing |
| **GSAP ScrollTrigger** | Pinning, scrubbing, velocity tracking, and scroll-linked callbacks |
| **Tailwind CSS v4** | GPU-accelerated styling and responsive utilities |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 & 24)
- npm or pnpm

### Quick Setup

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/scrolling-demo.git
cd scrolling-demo

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Architecture

```
scrolling-demo/
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD workflow
├── public/
│   └── car.png                    # McLaren 720S top-view high-res asset
├── src/
│   ├── app/
│   │   ├── globals.css            # Base resets, custom CSS variables, road animations
│   │   ├── layout.tsx             # Root layout with Inter font optimization
│   │   └── page.tsx               # Main composition page
│   └── components/
│       ├── HeroSection.tsx        # Unified scroll-driven hero, car track, & metrics
│       ├── AboutSection.tsx       # Performance architecture & feature highlights
│       └── Footer.tsx             # Branding, social links, & tech badges
├── next.config.ts                 # Next.js static export (`output: "export"`)
└── package.json                   # Dependencies & build scripts
```

---

## 🚢 Deploying to GitHub Pages

This project is pre-configured for static export (`output: "export"` in `next.config.ts`) and includes a GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Steps:
1. Create a new repository on GitHub (e.g. `scrolling-demo`).
2. Push your project:
   ```bash
   git init
   git add .
   git commit -m "feat: complete scroll-driven hero section animation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/scrolling-demo.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow will automatically build and deploy the site to:
   `https://YOUR_USERNAME.github.io/scrolling-demo/`

*(Note: If your repo name is something else, set `basePath: "/<your-repo-name>"` in `next.config.ts`)*

---

## 📄 License

MIT © 2026
