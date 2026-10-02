'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Visitors who ask for reduced motion keep the browser's native scrolling
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // Light smoothing: lerp keeps the page tracking the wheel closely (less "floaty" lag)
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Phones keep native momentum scrolling, which is smoother than JS-driven touch
      // In-page links like #rentalForm scroll smoothly too
      anchors: { offset: -90 },
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Every route change starts at the top
    const onPop = () => lenis.scrollTo(0, { immediate: true });
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
