// Responsive shell for BibleRogue2.
// This intentionally keeps the game landscape-first and does not redesign portrait mobile.

(function () {
  const BASE_WIDTH = 1672;
  const BASE_HEIGHT = 941;
  const MIN_READABLE_SCALE = 0.42;

  function getViewportSize() {
    const vv = window.visualViewport;
    return {
      width: Math.max(1, vv?.width || window.innerWidth || document.documentElement.clientWidth || BASE_WIDTH),
      height: Math.max(1, vv?.height || window.innerHeight || document.documentElement.clientHeight || BASE_HEIGHT)
    };
  }

  function isTouchDevice() {
    return window.matchMedia?.('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  }

  function ensureRotateNotice() {
    let notice = document.getElementById('rotate-notice');
    if (notice) return notice;

    notice = document.createElement('aside');
    notice.id = 'rotate-notice';
    notice.setAttribute('aria-live', 'polite');
    notice.innerHTML = `
      <div class="rotate-card">
        <span class="rotate-icon" aria-hidden="true">↻</span>
        <strong>가로 화면으로 플레이해 주세요</strong>
        <p>BibleRogue2는 가로 화면에 맞춘 선택형 서사 게임입니다. 휴대폰을 가로로 돌리면 플레이 화면이 열립니다.</p>
      </div>
    `;
    document.body.appendChild(notice);
    return notice;
  }

  function applyResponsiveLayout() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;

    const { width, height } = getViewportSize();
    const mobile = isTouchDevice() || width <= 1024 || height <= 540;
    const portrait = height > width;
    const landscape = width >= height;
    const safePadX = mobile ? 4 : 0;
    const safePadY = mobile ? 2 : 0;
    const availableWidth = Math.max(1, width - safePadX * 2);
    const availableHeight = Math.max(1, height - safePadY * 2);
    const scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT);
    const centeredScale = Math.max(0.1, Math.min(scale, 1));

    document.documentElement.style.setProperty('--responsive-vw', `${width}px`);
    document.documentElement.style.setProperty('--responsive-vh', `${height}px`);
    document.documentElement.style.setProperty('--responsive-safe-x', `${safePadX}px`);
    document.documentElement.style.setProperty('--responsive-safe-y', `${safePadY}px`);
    document.documentElement.style.setProperty('--responsive-scale', String(centeredScale));

    document.body.classList.add('responsive-ready');
    document.body.classList.toggle('is-mobile', mobile);
    document.body.classList.toggle('is-mobile-landscape', mobile && landscape);
    document.body.classList.toggle('is-mobile-portrait', mobile && portrait);
    document.body.classList.toggle('is-small-window', width < BASE_WIDTH || height < BASE_HEIGHT);
    document.body.classList.toggle('is-very-small-window', centeredScale < MIN_READABLE_SCALE);

    canvas.style.transform = `scale(${centeredScale})`;
    canvas.style.left = 'auto';
    canvas.style.top = 'auto';

    ensureRotateNotice();
  }

  function scheduleResponsiveLayout() {
    window.requestAnimationFrame(applyResponsiveLayout);
  }

  function initResponsiveLayout() {
    ensureRotateNotice();
    applyResponsiveLayout();
    window.addEventListener('resize', scheduleResponsiveLayout, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(applyResponsiveLayout, 120);
      setTimeout(applyResponsiveLayout, 360);
    });
    window.visualViewport?.addEventListener('resize', scheduleResponsiveLayout, { passive: true });
    window.visualViewport?.addEventListener('scroll', scheduleResponsiveLayout, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResponsiveLayout);
  } else {
    initResponsiveLayout();
  }
})();
