/**
 * Impacto Burger - Módulo de Filtrado Interactivo de la Carta con Micro-Animaciones GSAP
 */

export function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!filterButtons.length || !menuCards.length) return;

  // Asegurar que todas las tarjetas sean visibles por defecto
  menuCards.forEach(card => card.classList.remove('hidden'));

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Micro-animación de rebote en el botón seleccionado
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(button, { scale: 0.92 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      }

      // Actualizar estado activo visual de los botones
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary-container', 'text-on-surface');
        btn.classList.add('text-on-surface-variant');
      });
      button.classList.add('bg-primary-container', 'text-on-surface');
      button.classList.remove('text-on-surface-variant');

      // Filtrar tarjetas con transición stagger suave
      const visibleCards = [];
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          visibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });

      if (typeof gsap !== 'undefined' && visibleCards.length > 0) {
        gsap.fromTo(
          visibleCards,
          { opacity: 0, y: 16, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
        );
      }
    });
  });
}
