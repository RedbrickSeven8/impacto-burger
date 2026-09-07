/**
 * Impacto Burger - Módulo de Animación Hero con GSAP Timeline
 * Ejecuta un crossfade suave de opacidad entre los 3 fotogramas:
 * Frame 1 (Base) -> Frame 2 (Intermedio) -> Frame 3 (Explosión)
 * y revela al final las etiquetas flotantes de ingredientes.
 * Se activa de forma interactiva únicamente al pasar el cursor (hover).
 */

export function initHeroAnimation() {
  const frame1 = document.getElementById('hero-burger-frame1');
  const frame2 = document.getElementById('hero-burger-frame2');
  const frame3 = document.getElementById('hero-burger-frame3');
  const badgesContainer = document.getElementById('hero-ingredient-badges');
  const badges = document.querySelectorAll('.ingredient-badge');
  const linkContainer = document.getElementById('hero-burger-link');

  if (!frame1 || !frame2 || !frame3 || !linkContainer) return;

  if (typeof gsap === 'undefined') {
    console.warn('GSAP no está cargado. Se omite la animación del Hero.');
    return;
  }

  // Estado inicial limpio
  gsap.set(frame1, { opacity: 1, scale: 1 });
  gsap.set(frame2, { opacity: 0, scale: 0.98 });
  gsap.set(frame3, { opacity: 0, scale: 0.95 });

  if (badgesContainer) {
    gsap.set(badgesContainer, { opacity: 1 });
  }
  if (badges.length) {
    gsap.set(badges, { opacity: 0, scale: 0.85, y: 10 });
  }

  // Timeline de GSAP con crossfade continuo y suave
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' }
  });

  // 1. Crossfade suave de Frame 1 a Frame 2
  tl.to(frame1, {
    opacity: 0,
    scale: 1.02,
    duration: 0.45
  }, 0)
  .to(frame2, {
    opacity: 1,
    scale: 1,
    duration: 0.45
  }, 0)

  // 2. Crossfade suave de Frame 2 a Frame 3 (Explosión)
  .to(frame2, {
    opacity: 0,
    scale: 1.03,
    duration: 0.5
  }, 0.35)
  .to(frame3, {
    opacity: 1,
    scale: 1,
    duration: 0.5
  }, 0.35);

  // 3. Revelar etiquetas de ingredientes al final con stagger y rebote suave
  if (badges.length) {
    tl.to(badges, {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.35,
      ease: 'back.out(1.5)'
    }, 0.65);
  }

  // Interacción Hover
  linkContainer.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
  });

  linkContainer.addEventListener('mouseleave', () => {
    tl.timeScale(1.6).reverse();
  });
}
