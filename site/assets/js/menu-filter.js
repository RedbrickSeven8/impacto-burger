/**
 * Impacto Burger - Módulo de Filtrado Interactivo de la Carta
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

      // Actualizar estado activo visual de los botones
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary-container', 'text-on-surface');
        btn.classList.add('text-on-surface-variant');
      });
      button.classList.add('bg-primary-container', 'text-on-surface');
      button.classList.remove('text-on-surface-variant');

      // Filtrar tarjetas
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
