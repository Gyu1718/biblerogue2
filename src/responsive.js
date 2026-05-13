// Responsive shell for BibleRogue2.
// This keeps the game landscape-first while allowing desktop windows to be resized freely.

(function () {
  const BASE_WIDTH = 1672;
  const BASE_HEIGHT = 941;
  const MIN_READABLE_SCALE = 0.42;

  function getViewportSize() {
    const vv = window.visualViewport;
    return {
      width: Math.max(1, vv?.width || window.innerWidth || document.documentElement.clientWidth || BASE_WIDTH),
      height: Math.max(1, vv?.height || window.innerHeight || document.documentElement.clientHeight || BASE_HEIGHT),
      offsetLeft: vv?.offsetLeft || 0,
      offsetTop: vv?.offsetTop || 0
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

    const { width, height, offsetLeft, offsetTop } = getViewportSize();
    const touchDevice = isTouchDevice();
    const portrait = height > width;
    const landscape = width >= height;
    const smallWindow = width < BASE_WIDTH || height < BASE_HEIGHT;
    const mobileLandscape = touchDevice && landscape;
    const mobilePortrait = touchDevice && portrait;
    const safePadX = touchDevice ? 4 : 0;
    const safePadY = touchDevice ? 2 : 0;
    const availableWidth = Math.max(1, width - safePadX * 2);
    const availableHeight = Math.max(1, height - safePadY * 2);
    const scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT);
    const centeredScale = Math.max(0.1, Math.min(scale, 1));
    const fitCanvas = smallWindow || mobileLandscape;

    document.documentElement.style.setProperty('--responsive-vw', `${width}px`);
    document.documentElement.style.setProperty('--responsive-vh', `${height}px`);
    document.documentElement.style.setProperty('--responsive-safe-x', `${safePadX}px`);
    document.documentElement.style.setProperty('--responsive-safe-y', `${safePadY}px`);
    document.documentElement.style.setProperty('--responsive-scale', String(centeredScale));

    document.body.classList.add('responsive-ready');
    document.body.classList.toggle('is-mobile', touchDevice);
    document.body.classList.toggle('is-mobile-landscape', mobileLandscape);
    document.body.classList.toggle('is-mobile-portrait', mobilePortrait);
    document.body.classList.toggle('is-small-window', smallWindow);
    document.body.classList.toggle('is-fit-canvas', fitCanvas);
    document.body.classList.toggle('is-very-small-window', centeredScale < MIN_READABLE_SCALE);

    if (fitCanvas) {
      const scaledWidth = BASE_WIDTH * centeredScale;
      const scaledHeight = BASE_HEIGHT * centeredScale;
      const left = offsetLeft + Math.max(safePadX, (width - scaledWidth) / 2);
      const top = offsetTop + Math.max(safePadY, (height - scaledHeight) / 2);

      canvas.style.position = 'absolute';
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;
      canvas.style.right = 'auto';
      canvas.style.bottom = 'auto';
      canvas.style.transformOrigin = '0 0';
      canvas.style.transform = `scale(${centeredScale})`;
    } else {
      canvas.style.position = 'relative';
      canvas.style.left = 'auto';
      canvas.style.top = 'auto';
      canvas.style.right = 'auto';
      canvas.style.bottom = 'auto';
      canvas.style.transformOrigin = 'center center';
      canvas.style.transform = 'none';
    }

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
