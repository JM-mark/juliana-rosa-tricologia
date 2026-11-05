// Sistema de motion (ver DESIGN.md > Motion). 3 durações, 2 easings.
export const DUR = { fast: 0.2, base: 0.5, slow: 0.9 } as const;
export const EASE_OUT = "cubic-bezier(.16,1,.3,1)";
export const EASE_IN = "cubic-bezier(.7,0,.84,0)";
// Equivalentes GSAP (CustomEase não é necessário: expo.out ≈ ease-out, expo.in ≈ ease-in).
export const G_OUT = "expo.out";
export const G_IN = "expo.in";

/**
 * Movimento forçado: por decisão do projeto, as animações e o vídeo rodam mesmo com "Reduzir Movimento" ligado no aparelho
 * (o iPhone costuma ligar isso junto com o Modo de Pouca Energia). Para voltar a respeitar a preferência, troque para false.
 */
export const FORCE_MOTION = true;
export const prefersReducedMotion = () =>
  !FORCE_MOTION && typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
