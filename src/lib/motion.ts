// Sistema de motion (ver DESIGN.md > Motion). 3 durações, 2 easings.
export const DUR = { fast: 0.2, base: 0.5, slow: 0.9 } as const;
export const EASE_OUT = "cubic-bezier(.16,1,.3,1)";
export const EASE_IN = "cubic-bezier(.7,0,.84,0)";
// Equivalentes GSAP (CustomEase não é necessário: expo.out ≈ ease-out, expo.in ≈ ease-in).
export const G_OUT = "expo.out";
export const G_IN = "expo.in";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
