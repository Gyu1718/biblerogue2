// Lightweight visual cleanup only.
// Branching runtime, navigation, game state, scene rendering, and ending rendering belong to src/main.js.

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

  function initPostCleanup() {
    cleanHome();
    patchLocationText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostCleanup);
  } else {
    initPostCleanup();
  }
})();
