const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

function resizeGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  canvas.style.transform = `scale(${scale})`;
}

function showScreen(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach((screen) => screen.classList.remove('screen-active'));

  const target = document.getElementById(`${screenName}-screen`);
  if (!target) return;

  target.classList.add('screen-active');
  document.body.dataset.screen = screenName;
}

function bindNavigation() {
  document.querySelectorAll('[data-go]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      showScreen(element.dataset.go);
    });

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showScreen(element.dataset.go);
      }
    });
  });
}

function initGame() {
  resizeGame();
  bindNavigation();
  showScreen('home');
}

window.addEventListener('resize', resizeGame);
window.addEventListener('load', initGame);
initGame();
