const gameButton = document.getElementById('gameButton');
const reloadButton = document.getElementById('reload');
const shotsDisplay = document.getElementById('shots-taken');
const ducksDisplay = document.getElementById('ducks');
const missedDisplay = document.getElementById('missed');
const winnerDisplay = document.querySelector('.winner');
const loserDisplay = document.querySelector('.loser');
const tryAgainButton = document.querySelector('#tryAgainButton');

let ammoLeft = 6;
let totalRounds = 11;
let ducksMissed = 0;
let duckCounter = 0;
let shotsTaken = 0;
let speed = 4;
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;
let isHoveringGameButton = false;
let isHoveringReloadButton = false;
let outOfAmmo = false;
let animationFrameId;
let isAudioPlaying = false;

// Moves the button around the screen
function moveButton() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const buttonWidth = gameButton.offsetWidth;
  const buttonHeight = gameButton.offsetHeight;

  posX += directionX * speed;
  posY += directionY * speed;

  if (posX + buttonWidth > viewportWidth) {
    posX = viewportWidth - buttonWidth;
    directionX *= -1;
    quack('duckSound1')
  } else if (posX < 0) {
    posX = 0;
    directionX *= -1;
  }

  if (posY + buttonHeight > viewportHeight) {
    posY = viewportHeight - buttonHeight;
    directionY *= -1;
    quack('duckSound2')
  } else if (posY < 0) {
    posY = 0;
    directionY *= -1;
  }

  const angle = Math.atan2(directionY, directionX) * (180 / Math.PI);
  gameButton.style.left = `${posX}px`;
  gameButton.style.top = `${posY}px`;
  gameButton.style.transform = `rotate(${angle}deg)`;
  animationFrameId = requestAnimationFrame(moveButton);
}

// Plays a sound based on the input ID
function quack(input) {
  const audio = document.getElementById(input);
  audio.play();
}

// Plays a reload sound and updates the audio state
function reloadSound(input) {
  const audio = document.getElementById(input);
  audio.play();
  isAudioPlaying = true;
  audio.onended = () => {
    isAudioPlaying = false;
  };
}

// Plays a sound and updates the audio state
function playSound(input) {
  const audio = document.getElementById(input);
  audio.play();
  isAudioPlaying = true;
  audio.onended = () => {
    isAudioPlaying = false;
  };
}

// Resets the game state
function resetGame() {
  totalRounds = 11;
  ducksMissed = 0;
  duckCounter = 0;
  shotsTaken = 0;
  speed = 4;
  ammoLeft = 6;
  outOfAmmo = false;

  missedDisplay.textContent = ducksMissed;
  ducksDisplay.textContent = duckCounter;
  shotsDisplay.textContent = shotsTaken;

  winnerDisplay.classList.add('hidden');
  loserDisplay.classList.add('hidden');
  tryAgainButton.classList.add('hidden');

  const ambianceAudio = document.getElementById('ambiance1');
  ambianceAudio.play();

  newButton();
}
function reloadAmmo(){
 ammoLeft = 6;
}


function reduceAmmo() {
  ammoLeft--;

  if (ammoLeft === 0) {
    outOfAmmo = true;
  }
}

// Updates the score and speed
function updateScore() {
  speed += 5;
  duckCounter++;
  ducksDisplay.textContent = duckCounter;
  shotsDisplay.textContent = shotsTaken;
}

// Moves the button to a new random position
function newButton() {
  const x = Math.floor(Math.random() * (window.innerWidth - gameButton.clientWidth));
  const y = Math.floor(Math.random() * (window.innerHeight - gameButton.clientHeight));

  gameButton.style.position = 'absolute';
  gameButton.style.left = `${x}px`;
  gameButton.style.top = `${y}px`;

  posX = x;
  posY = y;
  directionX = 1;
  directionY = 1;

  cancelAnimationFrame(animationFrameId);
  moveButton();
}

// Event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const ambianceAudio = document.getElementById('ambiance1');
  ambianceAudio.play();

  gameButton.addEventListener('mouseover', () => {
    isHoveringGameButton = true;
  });

  gameButton.addEventListener('mouseout', () => {
    isHoveringGameButton = false;
  });

  reloadButton.addEventListener('mouseover', () => {
    isHoveringReloadButton = true;
  });

  reloadButton.addEventListener('mouseout', () => {
    isHoveringReloadButton = false;
  });

  // Handle keydown events for the Space key
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      if (isAudioPlaying) return;

      if (isHoveringGameButton && !outOfAmmo) {
        updateScore();
        shotsTaken++;
        shotsDisplay.textContent = shotsTaken;
        newButton();
        playSound('shotgun');
        playSound('shell');
        totalRounds--;
        reduceAmmo();
      } else if (!isHoveringGameButton && !outOfAmmo) {
        playSound('shotgun');
        playSound('shell');
        shotsTaken++;
        shotsDisplay.textContent = shotsTaken;
        reduceAmmo();   
      }

      if (ammoLeft === 0) {
        outOfAmmo = true;
        shotsDisplay.textContent = shotsTaken;
        ducksMissed++;
        missedDisplay.textContent = ducksMissed;
        totalRounds--;
      }

      if (totalRounds <= 0) {
        if (duckCounter > ducksMissed) {
          winnerDisplay.classList.remove('hidden');
        } else {
          loserDisplay.classList.remove('hidden');
        }
        tryAgainButton.classList.remove('hidden');
      }
    }else if(event.code ==='KeyR'){
      if (!isAudioPlaying) {
      reloadSound('reloadSound');
      reloadAmmo();
    }
      
    }
  }); 
  

  tryAgainButton.addEventListener('click', resetGame);

  

  newButton();
});
