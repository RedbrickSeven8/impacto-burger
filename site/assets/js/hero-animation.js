/**
 * Impacto Burger - Módulo de Animación Hero (3 Fotogramas)
 * Controla la transición suave y fluida:
 * Fotograma 1 (Base) -> Fotograma 2 (Medio/Despegue) -> Fotograma 3 (Explotada/Capas)
 */

export function initHeroAnimation() {
  const frame1 = document.getElementById('hero-burger-frame1');
  const frame2 = document.getElementById('hero-burger-frame2');
  const frame3 = document.getElementById('hero-burger-frame3');
  const linkContainer = document.getElementById('hero-burger-link');

  if (!frame1 || !frame2 || !frame3) return;

  let animTimeout1 = null;
  let animTimeout2 = null;
  let isRunning = false;

  // Estado 1: Inicio (Burger completa)
  function showFrame1() {
    frame1.style.opacity = '1';
    frame1.style.transform = 'scale(1)';
    frame2.style.opacity = '0';
    frame2.style.transform = 'scale(0.97)';
    frame3.style.opacity = '0';
    frame3.style.transform = 'scale(0.94)';
  }

  // Estado 2: Medio (Separación intermedia suave)
  function showFrame2() {
    frame1.style.opacity = '0';
    frame1.style.transform = 'scale(1.02)';
    frame2.style.opacity = '1';
    frame2.style.transform = 'scale(1)';
    frame3.style.opacity = '0';
    frame3.style.transform = 'scale(0.97)';
  }

  // Estado 3: Final (Explosión completa de capas)
  function showFrame3() {
    frame1.style.opacity = '0';
    frame1.style.transform = 'scale(1.05)';
    frame2.style.opacity = '0';
    frame2.style.transform = 'scale(1.03)';
    frame3.style.opacity = '1';
    frame3.style.transform = 'scale(1)';
  }

  // Secuencia fluida 3 fotogramas
  function play3FrameSequence() {
    if (isRunning) return;
    isRunning = true;

    // Iniciar con Frame 1
    showFrame1();

    // Transicionar al Frame 2 tras 350ms
    animTimeout1 = setTimeout(() => {
      showFrame2();

      // Transicionar al Frame 3 tras otros 400ms para máxima suavidad
      animTimeout2 = setTimeout(() => {
        showFrame3();
        isRunning = false;
      }, 450);
    }, 400);
  }

  // 1. Ejecución automática inicial al cargar la página
  setTimeout(() => {
    play3FrameSequence();
  }, 600);

  // 2. Repetición al pasar el cursor (hover)
  if (linkContainer) {
    linkContainer.addEventListener('mouseenter', () => {
      clearTimeout(animTimeout1);
      clearTimeout(animTimeout2);
      isRunning = false;
      play3FrameSequence();
    });
  }
}
