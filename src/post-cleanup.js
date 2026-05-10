// Post-cleanup adjustments after the narrative redesign.
// Keeps temporary legacy controls from reappearing while the branching story structure is being rebuilt.

(function () {
  function cleanHome() {
    const home = document.getElementById('home-screen');
    if (!home) return;

    const bottomIcons = home.querySelector('.bottom-icons');
    if (bottomIcons) bottomIcons.setAttribute('aria-hidden', 'true');
  }

  function patchLocationText() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const locationPanel = play.querySelector('.location-panel');
    if (!locationPanel) return;

    locationPanel.textContent = locationPanel.textContent.replace(/^\s*⛺\s*/, '').trim();
  }

  function patchRetryButtons() {
    const retry = document.querySelector('.ending-retry');
    const home = document.querySelector('.ending-home');

    retry?.addEventListener('click', () => {
      window.location.reload();
    });

    home?.addEventListener('click', () => {
      window.location.reload();
    });
  }

  function observePlayChanges() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const observer = new MutationObserver(() => patchLocationText());
    observer.observe(play, { childList: true, subtree: true, characterData: true });
  }

  function initPostCleanup() {
    cleanHome();
    patchLocationText();
    patchRetryButtons();
    observePlayChanges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostCleanup);
  } else {
    initPostCleanup();
  }
})();
