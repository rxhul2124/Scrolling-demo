"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MetricCard {
  id: string;
  value: number;
  suffix: string;
  label: string;
  bg: string;
  textColor: string;
  accentBorder: string;
  milestone: number; // 0 to 1 scroll trigger milestone
}

// The 4 impact metrics inspired by reference demo with distinct vibrant palettes
const METRICS: MetricCard[] = [
  {
    id: "metric-1",
    value: 58,
    suffix: "%",
    label: "Increase in pick up point use",
    bg: "linear-gradient(135deg, #def54f 0%, #cbe838 100%)",
    textColor: "#0f172a",
    accentBorder: "rgba(222, 245, 79, 0.6)",
    milestone: 0.25,
  },
  {
    id: "metric-2",
    value: 23,
    suffix: "%",
    label: "Decreased in customer phone calls",
    bg: "linear-gradient(135deg, #6ac9ff 0%, #48b5f2 100%)",
    textColor: "#0f172a",
    accentBorder: "rgba(106, 201, 255, 0.6)",
    milestone: 0.5,
  },
  {
    id: "metric-3",
    value: 27,
    suffix: "%",
    label: "Increase in delivery efficiency",
    bg: "linear-gradient(135deg, #2a2c35 0%, #1a1b21 100%)",
    textColor: "#ffffff",
    accentBorder: "rgba(69, 219, 125, 0.5)",
    milestone: 0.75,
  },
  {
    id: "metric-4",
    value: 40,
    suffix: "%",
    label: "Reduced turnaround time",
    bg: "linear-gradient(135deg, #fa7328 0%, #e65f12 100%)",
    textColor: "#0f172a",
    accentBorder: "rgba(250, 115, 40, 0.6)",
    milestone: 0.95,
  },
];

const WORD1 = "WELCOME".split("");
const WORD2 = "ITZFIZZ".split("");

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const markingsRef = useRef<HTMLDivElement>(null);
  const headlineLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const milestoneMarkersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ============================================================
         1. INITIAL LOAD ANIMATIONS (Smooth & Elegant Entrance)
         ============================================================ */
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Filter non-null headline letter elements
      const allLetters = headlineLettersRef.current.filter(
        (l): l is HTMLSpanElement => l !== null
      );

      gsap.set(allLetters, {
        opacity: 0,
        y: 35,
        rotateX: -60,
      });

      introTl.to(
        allLetters,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.03,
        },
        0.1
      );

      // Car entrance on load
      if (carRef.current) {
        gsap.set(carRef.current, { x: 0, opacity: 0 });
        introTl.to(
          carRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.3
        );
      }

      // Initial stagger animation for metric cards
      const cards = metricsRef.current.filter(
        (c): c is HTMLDivElement => c !== null
      );

      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.94,
      });

      introTl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        0.4
      );

      // Count-up animation for metric numbers on page load (pure object tween, zero ref/this hazards)
      cards.forEach((card, index) => {
        const valEl = card.querySelector(".metric-number");
        if (valEl) {
          const counter = { val: 0 };
          const target = METRICS[index].value;
          introTl.to(
            counter,
            {
              val: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                valEl.textContent = `${Math.round(counter.val)}${METRICS[index].suffix}`;
              },
            },
            0.5 + index * 0.1
          );
        }
      });

      // Scroll prompt entry
      if (scrollPromptRef.current) {
        gsap.set(scrollPromptRef.current, { opacity: 0, y: 10 });
        introTl.to(
          scrollPromptRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          0.8
        );
      }

      /* ============================================================
         2. SCROLL-BASED ANIMATION (Zero Delay, 1:1 Instant Scrub)
         ============================================================ */
      const container = containerRef.current;
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;

      if (!container || !road || !car || !trail) return;

      const getTravelDistance = () => road.offsetWidth - car.offsetWidth;

      // Pre-cache letter positions to completely avoid getBoundingClientRect() during scroll
      let cachedLetterCenters: number[] = [];
      let cachedRoadLeft = 0;

      const cacheGeometry = () => {
        if (!roadRef.current) return;
        const rRect = roadRef.current.getBoundingClientRect();
        cachedRoadLeft = rRect.left;
        cachedLetterCenters = allLetters.map((letter) => {
          const lRect = letter.getBoundingClientRect();
          return lRect.left + lRect.width / 2;
        });
      };

      // Measure once on mount and on resize only (never on scroll!)
      cacheGeometry();

      // Main scroll timeline tied directly to scroll progress
      // scrub: true -> 100% instant 1:1 response with zero lag or delay
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Instant 1:1 tracking without artificial smoothing lag
          pin: trackRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Direct DOM updates for zero React re-render overhead
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `SCROLL: ${Math.round(progress * 100)}%`;
            }

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(4, progress * 100)}%`;
            }

            if (speedRef.current) {
              const approxSpeed = Math.round(progress * 212);
              speedRef.current.textContent = `SPEED: ${approxSpeed} MPH`;
            }

            // Road dashes animation state
            if (markingsRef.current) {
              if (Math.abs(self.getVelocity()) > 5) {
                markingsRef.current.classList.add("animating");
              } else {
                markingsRef.current.classList.remove("animating");
              }
            }

            // Calculate current car center X using pre-cached road geometry (zero reflows!)
            const currentCarX = gsap.getProperty(car, "x") as number;
            const carCenterX = cachedRoadLeft + currentCarX + car.offsetWidth * 0.5;

            // Headline letter lighting reaction
            for (let i = 0; i < allLetters.length; i++) {
              const letter = allLetters[i];
              const center = cachedLetterCenters[i];
              if (center && carCenterX >= center) {
                letter.style.color = "#45db7d";
                letter.style.textShadow =
                  "0 0 16px rgba(69, 219, 125, 0.9), 0 0 32px rgba(69, 219, 125, 0.4)";
              } else {
                letter.style.color = "#ffffff";
                letter.style.textShadow = "none";
              }
            }

            // Metric card highlight states at milestones
            cards.forEach((card, idx) => {
              const m = METRICS[idx];
              const isActive = progress >= m.milestone - 0.12;
              if (isActive) {
                card.style.transform = "scale(1.03)";
                card.style.boxShadow = `0 12px 30px ${m.accentBorder}`;
                card.style.opacity = "1";
              } else {
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
                card.style.opacity = "0.85";
              }
            });

            // Milestone header markers highlight
            const markerEls = milestoneMarkersRef.current.filter(Boolean);
            markerEls.forEach((marker, idx) => {
              if (!marker) return;
              const m = METRICS[idx];
              if (m && progress >= m.milestone - 0.12) {
                marker.style.color = "#45db7d";
                marker.style.fontWeight = "bold";
              } else {
                marker.style.color = "";
                marker.style.fontWeight = "";
              }
            });
          },
        },
      });

      // Synchronized in the same timeline: Car travel and green trail expand simultaneously
      scrollTl
        .to(
          car,
          {
            x: () => getTravelDistance(),
            ease: "none",
          },
          0
        )
        .to(
          trail,
          {
            width: () => `${getTravelDistance() + car.offsetWidth * 0.6}px`,
            ease: "none",
          },
          0
        );

      const handleResize = () => {
        cacheGeometry();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "220vh" }} // 2.2x viewport height for smooth, responsive, brisk scroll pacing
    >
      {/* ============================================================
          PINNED STICKY VIEWPORT (Occupies screen above the fold)
          ============================================================ */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, #15161b 0%, #090a0d 100%)",
        }}
      >
        {/* Ambient background glow orb */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-20"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(circle, #45db7d 0%, transparent 70%)",
          }}
        />

        {/* ── TOP HEADER / NAVBAR ── */}
        <header className="relative z-20 flex items-center justify-between px-6 pt-5 pb-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black shadow-lg"
              style={{
                background: "linear-gradient(135deg, #45db7d 0%, #22c55e 100%)",
                color: "#090a0d",
                boxShadow: "0 0 16px rgba(69, 219, 125, 0.4)",
              }}
            >
              IF
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.25em] text-white uppercase leading-none">
                ITZFIZZ
              </span>
              <span className="text-[10px] tracking-widest text-[#45db7d] uppercase font-mono mt-1">
                Scroll-Driven Engine
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45db7d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45db7d]"></span>
            </span>
            <span
              ref={speedRef}
              className="text-xs font-mono tracking-wider text-white/80"
            >
              SPEED: 0 MPH
            </span>
            <span className="text-white/20">|</span>
            <span
              ref={progressTextRef}
              className="text-xs font-mono tracking-wider text-[#45db7d]"
            >
              SCROLL: 0%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 border border-white/10">
              GSAP 3.12
            </span>
          </div>
        </header>

        {/* ── HEADLINE AREA (ELEGANT LETTER-SPACED DISPLAY) ── */}
        <div className="relative z-20 text-center px-4 pt-2 pb-1 max-w-6xl mx-auto w-full">
          <h1
            className="flex flex-wrap items-center justify-center font-black uppercase text-white leading-none"
            style={{
              fontSize: "clamp(2rem, 5.2vw, 4.6rem)",
            }}
          >
            {/* Word 1: WELCOME */}
            <span className="inline-flex tracking-[0.28em] mr-6 sm:mr-10">
              {WORD1.map((letter, idx) => (
                <span
                  key={`w1-${idx}`}
                  ref={(el) => {
                    headlineLettersRef.current[idx] = el;
                  }}
                  className="inline-block transition-colors duration-150"
                  style={{ perspective: "800px" }}
                >
                  {letter}
                </span>
              ))}
            </span>

            {/* Word 2: ITZFIZZ */}
            <span className="inline-flex tracking-[0.28em]">
              {WORD2.map((letter, idx) => (
                <span
                  key={`w2-${idx}`}
                  ref={(el) => {
                    headlineLettersRef.current[WORD1.length + idx] = el;
                  }}
                  className="inline-block transition-colors duration-150"
                  style={{ perspective: "800px" }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm font-medium tracking-[0.25em] text-white/50 uppercase">
            Scroll-Responsive Velocity &bull; GPU Transform Pipeline &bull; McLaren 720S
          </p>
        </div>

        {/* ── CENTER ROAD & MCLAREN TRACK AREA ── */}
        <div className="relative z-20 w-full my-auto py-2">
          {/* Milestone markers along road top */}
          <div className="w-full max-w-6xl mx-auto px-6 mb-2 flex justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#45db7d]" /> START 0%
            </span>
            <span
              ref={(el) => {
                milestoneMarkersRef.current[0] = el;
              }}
              className="transition-colors duration-150"
            >
              MILESTONE 1 (25%)
            </span>
            <span
              ref={(el) => {
                milestoneMarkersRef.current[1] = el;
              }}
              className="transition-colors duration-150"
            >
              MILESTONE 2 (50%)
            </span>
            <span
              ref={(el) => {
                milestoneMarkersRef.current[2] = el;
              }}
              className="transition-colors duration-150"
            >
              MILESTONE 3 (75%)
            </span>
            <span
              ref={(el) => {
                milestoneMarkersRef.current[3] = el;
              }}
              className="transition-colors duration-150"
            >
              FINISH 100%
            </span>
          </div>

          {/* The Road Surface */}
          <div
            ref={roadRef}
            className="relative w-full overflow-hidden shadow-2xl"
            style={{
              height: "175px",
              background: "#18191d",
              borderTop: "2px solid rgba(255, 255, 255, 0.1)",
              borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Dashed center line */}
            <div ref={markingsRef} className="road-markings" />

            {/* Glowing Emerald Trail */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 z-[2]"
              style={{
                height: "100%",
                width: "0px",
                background: "linear-gradient(90deg, rgba(69, 219, 125, 0.95) 0%, #45db7d 100%)",
                boxShadow: "0 0 35px rgba(69, 219, 125, 0.6)",
              }}
            />

            {/* McLaren 720S Top-View Vehicle */}
            <div
              ref={carRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none select-none"
              style={{
                height: "165px",
                width: "310px",
                filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.9))",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="./car.png"
                alt="McLaren 720S Top View"
                className="h-full w-full object-contain pointer-events-none"
                style={{
                  filter: "drop-shadow(0 0 16px rgba(69, 219, 125, 0.35))",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── IMPACT METRICS / STATISTICS SECTION (PROPERLY BALANCED SPACING) ── */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {METRICS.map((metric, index) => (
              <div
                key={metric.id}
                ref={(el) => {
                  metricsRef.current[index] = el;
                }}
                className="metric-card relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-transform duration-150 shadow-xl opacity-85"
                style={{
                  background: metric.bg,
                  color: metric.textColor,
                  borderColor: metric.accentBorder,
                }}
              >
                {/* Metric Top Label */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                    STEP 0{index + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-current/30" />
                </div>

                {/* Percentage number */}
                <div className="my-1.5">
                  <span className="metric-number text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                    0{metric.suffix}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-semibold leading-tight opacity-90">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM PROGRESS & SCROLL CUE BAR ── */}
        <div
          ref={scrollPromptRef}
          className="relative z-20 flex flex-col items-center justify-center pb-4 pt-2 max-w-md mx-auto w-full px-4"
        >
          {/* Scroll progress track */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              ref={progressBarRef}
              className="bg-[#45db7d] h-full rounded-full"
              style={{
                width: "4%",
                boxShadow: "0 0 10px #45db7d",
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-white/60 text-[11px] font-mono tracking-[0.25em] uppercase">
            <svg
              className="w-3.5 h-3.5 animate-bounce text-[#45db7d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span>SCROLL TO ACCELERATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
