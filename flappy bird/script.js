const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = {
  x: 50,
  y: canvas.height / 2,
  size: 30, // Decreased bird size
  velocity: 0,
  gravity: 0.1,
  flapFrames: [
    '🐦', // Frame 1
    '🕊️', // Frame 2
    '🦅', // Frame 3
    '🦜' // Frame 4
  ],
  currentFlapFrame: 0,
  rotation: 0
};

let pipes = [];
let pipeWidth = 80;
let pipeGap = 120;
let pipeFrequency = 200;

let score = 0;
let gameStarted = false;
let gameOver = false;

function drawBird() {
  const birdSize = bird.size;
  const halfBirdSize = birdSize / 2;

  ctx.save();
  ctx.translate(bird.x + halfBirdSize, bird.y + halfBirdSize);
  ctx.rotate((Math.PI / 180) * bird.rotation);

  ctx.fillStyle = '#FFD700';
  ctx.fillRect(-halfBirdSize, -halfBirdSize, birdSize, birdSize);

  // Draw wings
  const wingSize = birdSize / 2;
  ctx.fillStyle = '#FFC400';
  ctx.fillRect(-halfBirdSize, -halfBirdSize, wingSize, birdSize);
  ctx.fillRect(halfBirdSize - wingSize, -halfBirdSize, wingSize, birdSize);

  ctx.restore();
}

function updateBird() {
  if (gameStarted) {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Flap wings animation
    if (bird.velocity > 0) {
      bird.currentFlapFrame++;
      if (bird.currentFlapFrame >= bird.flapFrames.length) {
        bird.currentFlapFrame = 0;
      }
    }

    // Rotate bird based on velocity
    bird.rotation = bird.velocity * 3;

    if (bird.y + bird.size > canvas.height || bird.y < 0) {
      gameOver = true;
    }
  }
}

function jump() {
  if (!gameStarted) {
    gameStarted = true;
  }
  if (!gameOver) {
    bird.velocity = -2;
  }
  if (gameOver) {
    resetGame();
  }
}

canvas.addEventListener('click', jump);

function drawPipes() {
  for (let pipe of pipes) {
    ctx.fillStyle = '#5EED5E';
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  }
}

function updatePipes() {
  if (gameStarted && !gameOver) {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - pipeFrequency) {
      let top = Math.random() * (canvas.height - pipeGap - 100) + 50;
      pipes.push({ x: canvas.width, top });
    }

    for (let pipe of pipes) {
      pipe.x -= 1;

      if (pipe.x + pipeWidth < 0) {
        pipes.shift();
        score++;
      }
    }
  }
}

function checkCollision(pipe) {
  return (
    bird.y < pipe.top ||
    bird.y + bird.size > pipe.top + pipeGap ||
    bird.y + bird.size > canvas.height ||
    bird.y < 0
  );
}

function resetGame() {
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  gameStarted = false;
  gameOver = false;
}

function drawScore() {
  ctx.fillStyle = 'red';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawRetryButton() {
  if (gameOver) {
    ctx.fillStyle = 'blue';
    ctx.font = '24px Arial';
    ctx.fillText('Click to retry🔄', canvas.width / 2 - 70, canvas.height / 2);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  updateBird();
  drawPipes();
  updatePipes();
  drawScore();
  drawRetryButton();

  if (gameStarted && !gameOver) {
    for (let pipe of pipes) {
      if (bird.x + bird.size > pipe.x && bird.x < pipe.x + pipeWidth && checkCollision(pipe)) {
        gameOver = true;
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
