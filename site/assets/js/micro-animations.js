/**
 * Impacto Burger - Módulo de Micro-Animaciones
 * Micro-interacciones interactivas con GSAP:
 * 1. Efecto Ripple interactivo al hacer click en botones.
 * 2. Magnetic / tilt sutil en tarjetas de menú y badges.
 * 3. Animación de revelado progresivo (stagger) al filtrar el menú.
 * 4. Micro-interacción en badges y botones CTA.
 */

export function initMicroAnimations() {
  if (typeof gsap === 'undefined') return;

  // 1. Efecto Ripple en botones y enlaces CTA
  const clickableElements = document.querySelectorAll('button, a[href^="#"], a[href^="https://wa.me"]');
  clickableElements.forEach(btn => {
    btn.classList.add('ripple-container');
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // 2. Micro-animación en los iconos de las tarjetas al hover
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    const icon = card.querySelector('.material-symbols-outlined');
    const badge = card.querySelector('span[class*="bg-primary-container"]');

    card.addEventListener('mouseenter', () => {
      if (icon) {
        gsap.to(icon, { scale: 1.25, rotate: 8, duration: 0.3, ease: 'back.out(2)' });
      }
      if (badge) {
        gsap.to(badge, { scale: 1.08, y: -2, duration: 0.25, ease: 'power2.out' });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (icon) {
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (badge) {
        gsap.to(badge, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
      }
    });
  });

  // 3. Micro-interacción flotante suave en los badges del hero
  const heroBadge = document.querySelector('#restaurant-status-badge');
  if (heroBadge) {
    heroBadge.addEventListener('mouseenter', () => {
      gsap.to(heroBadge, { scale: 1.05, duration: 0.25, ease: 'power2.out' });
    });
    heroBadge.addEventListener('mouseleave', () => {
      gsap.to(heroBadge, { scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  }
}
