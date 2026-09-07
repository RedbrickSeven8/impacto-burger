/**
 * Impacto Burger - Archivo Principal Modular
 */

import { initHeroAnimation } from './hero-animation.js';
import { initBusinessStatus } from './business-status.js';
import { initMenuFilter } from './menu-filter.js';
import { initMicroAnimations } from './micro-animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  initBusinessStatus();
  initMenuFilter();
  initMicroAnimations();
});
