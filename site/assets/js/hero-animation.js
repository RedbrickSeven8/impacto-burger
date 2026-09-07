/**
 * Impacto Burger - Módulo de Animación Hero con GSAP Timeline
 * Maneja la interacción en hover:
 * - Reposicionamiento / Estado normal: Frame 1 (Burger Completa)
 * - Hover (mouseenter): Timeline hacia Frame 2 (Medio) y Frame 3 (Exploded)
 * - Mouseleave: Timeline reversible o regreso suave al Frame 1
 */

export function initHeroAnimation() {
  const frame1 = document.getElementById('hero-burger-frame1');
  const frame2 = document.getElementById('hero-burger-frame2');
  const frame3 = document.getElementById('hero-burger-frame3');
  const linkContainer = document.getElementById('hero-burger-link');

  if (!frame1 || !frame2 || !frame3 || !linkContainer) return;

  // Asegurar que GSAP esté disponible
  if (typeof gsap === 'undefined') {
    console.warn('GSAP no está cargado. Se omite la animación del Hero.');
    return;
  }

  // Configuración inicial de estados
  gsap.set(frame1, { opacity: 1, scale: 1 });
  gsap.set(frame2, { opacity: 0, scale: 0.96 });
  gsap.set(frame3, { opacity: 0, scale: 0.92 });

  // Crear Timeline pausado de GSAP
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' }
  });

  // Paso 1: Transición Frame 1 -> Frame 2
  tl.to(frame1, {
    opacity: 0,
    scale: 1.03,
    duration: 0.35
  }, 0)
  .to(frame2, {
    opacity: 1,
    scale: 1,
    duration: 0.35
  }, 0)

  // Paso 2: Transición Frame 2 -> Frame 3 (Explosión)
  .to(frame2, {
    opacity: 0,
    scale: 1.04,
    duration: 0.45
  }, 0.35)
  .to(frame3, {
    opacity: 1,
    scale: 1,
    duration: 0.45
  }, 0.35);

  // Eventos de interacción Hover (solo se ejecuta al pasar el cursor)
  linkContainer.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
  });

  linkContainer.addEventListener('mouseleave', () => {
    tl.timeScale(1.4).reverse();
  });
}
