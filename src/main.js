const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

function resizeGame() {
  const canvas = document.getElementById('game-canvas');
  const viewport = document.getElementById('viewport');
  if (!canvas || !viewport) return;

  const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  canvas.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', resizeGame);
window.addEventListener('load', resizeGame);
resizeGame();
