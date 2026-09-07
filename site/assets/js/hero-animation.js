/**
 * Impacto Burger - Módulo de Animación Hero con GSAP Timeline
 * Secuencia de fotogramas fluida y continua usando GSAP.
 * Solo animación (SIN etiquetas de ingredientes).
 * Se ejecuta al pasar el cursor por encima (hover).
 */

export function initHeroAnimation() {
  const frames = [
    document.getElementById('hero-frame-001'),
    document.getElementById('hero-frame-005'),
    document.getElementById('hero-frame-009'),
    document.getElementById('hero-frame-013'),
    document.getElementById('hero-frame-017'),
    document.getElementById('hero-frame-021'),
    document.getElementById('hero-frame-025'),
    document.getElementById('hero-frame-029'),
    document.getElementById('hero-frame-036')
  ].filter(Boolean);

  const linkContainer = document.getElementById('hero-burger-link');

  if (frames.length < 2 || !linkContainer) return;

  if (typeof gsap === 'undefined') {
    console.warn('GSAP no está disponible. Se omite la animación del Hero.');
    return;
  }

  // Estado inicial: Frame 1 visible, el resto con opacidad 0
  gsap.set(frames[0], { opacity: 1 });
  for (let i = 1; i < frames.length; i++) {
    gsap.set(frames[i], { opacity: 0 });
  }

  // Crear el Timeline de GSAP para recorrer todos los fotogramas en secuencia
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'none' }
  });

  const frameDuration = 0.08; // Duración fluida entre cada fotograma

  for (let i = 0; i < frames.length - 1; i++) {
    const currentFrame = frames[i];
    const nextFrame = frames[i + 1];
    const timePosition = i * frameDuration;

    tl.to(currentFrame, {
      opacity: 0,
      duration: frameDuration
    }, timePosition)
    .to(nextFrame, {
      opacity: 1,
      duration: frameDuration
    }, timePosition);
  }

  // Evento Hover: Play al entrar, Reverse al salir
  linkContainer.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
  });

  linkContainer.addEventListener('mouseleave', () => {
    tl.timeScale(1.8).reverse();
  });
}
