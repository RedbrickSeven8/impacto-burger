/**
 * Impacto Burger - Módulo de Estado de Apertura en Tiempo Real
 */

export function initBusinessStatus() {
  function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60;

    const badge = document.getElementById('restaurant-status-badge');
    const ping = document.getElementById('status-pulse-ping');
    const dot = document.getElementById('status-pulse-dot');
    const mainText = document.getElementById('status-main-text');
    const subText = document.getElementById('status-sub-text');
    const footerBadge = document.getElementById('footer-status-badge');

    const isOpenDay = (day === 0 || (day >= 3 && day <= 6)); // Miércoles a Domingo
    const isOpenHour = (currentTime >= 17.0 && currentTime <= 23.5); // 5:00 PM - 11:30 PM
    const isOpen = isOpenDay && isOpenHour;

    let nextOpenText = "Abre hoy a las 5:00 pm";
    if (!isOpenDay) {
      nextOpenText = "Abre el miércoles a las 5:00 pm";
    } else if (currentTime > 23.5) {
      nextOpenText = "Abre mañana a las 5:00 pm";
    }

    if (badge && ping && dot && mainText && subText) {
      if (isOpen) {
        ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
        dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500';
        mainText.textContent = 'Abierto ahora';
        mainText.className = 'font-label-sm text-label-sm font-bold text-emerald-400 tracking-wide';
        subText.textContent = 'Cierra a las 11:30 pm';
        badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 shadow-sm transition-all duration-300';
      } else {
        ping.className = 'hidden';
        dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500/80';
        mainText.textContent = 'Cerrado ahora';
        mainText.className = 'font-label-sm text-label-sm font-bold text-secondary tracking-wide';
        subText.textContent = nextOpenText;
        badge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-surface-container-high shadow-sm transition-all duration-300';
      }
    }

    if (footerBadge) {
      if (isOpen) {
        footerBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span class="text-emerald-300 font-semibold">Abierto ahora</span> <span class="opacity-75">• Cierra 11:30 pm</span>';
        footerBadge.className = 'inline-flex items-center gap-1.5 px-space-sm py-space-2xs rounded-full bg-emerald-950/40 border border-emerald-500/30 font-label-sm text-label-sm text-emerald-300';
      } else {
        footerBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span><span class="text-secondary font-semibold">Cerrado ahora</span> <span class="opacity-75">• ${nextOpenText}</span>`;
        footerBadge.className = 'inline-flex items-center gap-1.5 px-space-sm py-space-2xs rounded-full bg-surface-container border border-surface-container-high font-label-sm text-label-sm text-secondary';
      }
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}
