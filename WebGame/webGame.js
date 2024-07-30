const gameButton = document.getElementById('gameButton');
const reloadButton = document.getElementById('reload');
const shotsDisplay = document.getElementById('shots-taken');
const ducksDisplay = document.getElementById('ducks');
const missedDisplay = document.getElementById('missed');
const winnerDisplay = document.querySelector('.winner');
const loserDisplay = document.querySelector('.loser');
const tryAgainButton = document.querySelector('#tryAgainButton');
const shell1 = document.querySelector('.shell1');
const shell2 = document.querySelector('.shell2');
const shell3 = document.querySelector('.shell3');
const shell4 = document.querySelector('.shell4');
const shell5 = document.querySelector('.shell5');
const shell6 = document.querySelector('.shell6');
const shell7 = document.querySelector('.shell7');
const countdownDisplay = document.getElementById('countdown');
const accuracyDisplay = document.getElementById('accuracy');


let gameStarted = false;
let ammoLeft = 7;
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
let timer =60; 

// Initialize variables
let currentScore = 0;
let highScore = 0;

// Get references to DOM elements
const currentScoreElement = document.getElementById('currentScore');
const highScoreElement = document.getElementById('highScore');

// Function to update the current score
function updateAccuracy() {
  const accuracy = (shotsTaken > 0) ? ((currentScore / shotsTaken) * 100).toFixed(2) : 0;
  accuracyDisplay.textContent = `${accuracy}%`;
}
function updateScore() {
  speed += 5;
  currentScore ++;
  currentScoreElement.textContent = currentScore;

  // Update high score only if new score is higher
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreElement.textContent = highScore;
  }
  const newScore = currentScore + Math.floor(Math.random() * 10) + 1;
}





function updateDisplay() {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Format time as HH:MM:SS
 
}

// Update the countdown every second
const interval = setInterval(() => {
  if (timer <= 0) {
    clearInterval(interval); // Stop the countdown when it reaches zero
    countdownDisplay.textContent = 'Time is up!';
  } else if(gameStarted === true){
    
    timer--; // Decrement the timer
    updateDisplay(); // Update the display
  }
}, 1000);



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
  gameStarted = true;
  ducksMissed = 0;
  duckCounter = 0;
  shotsTaken = 0;
  speed = 4;
  ammoLeft = 7;
  outOfAmmo = false;
  currentScore =0;

  // missedDisplay.textContent = ducksMissed;
  // ducksDisplay.textContent = duckCounter;
  // shotsDisplay.textContent = shotsTaken;
  tryAgainButton.classList.add('hidden');

  const ambianceAudio = document.getElementById('ambiance1');
  ambianceAudio.play();

  newButton();
}

function reloadAmmo() {
  ammoLeft = 7;
  outOfAmmo = false;
  let shells = [shell1, shell2, shell3, shell4, shell5, shell6,shell7];
  let delay = 400; // Adjust delay time in milliseconds

  // Define a recursive function to show shells with delay
  function showShell(index) {
    setTimeout(() => {
      shells[index].classList.remove('hide');
      shells[index].classList.add('show');
      
      // Move to the next shell if there are more
      if (index < shells.length - 1) {
        showShell(index + 1);
      }
    }, delay);
  }

  // Start showing shells with the first one
  showShell(0);
}
 


function reduceAmmo() {
  ammoLeft--;

  if (ammoLeft === 0) {
    outOfAmmo = true;
    shell7.classList.remove('show');
    shell7.classList.add('hide');
  }else if(ammoLeft === 6){
    shell1.classList.remove('show');
    shell1.classList.add('hide');

  }else if(ammoLeft === 5){
    shell2.classList.remove('show');
    shell2.classList.add('hide');

  }else if(ammoLeft === 4){
    shell3.classList.remove('show');
    shell3.classList.add('hide');
    

  }else if(ammoLeft === 3){
    shell4.classList.remove('show');
    shell4.classList.add('hide');

  }else if(ammoLeft === 2){
    shell5.classList.remove('show');
    shell5.classList.add('hide');

  }else if(ammoLeft === 1){
    shell6.classList.remove('show');
    shell6.classList.add('hide');    
}
}

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
  updateDisplay();
}

// Event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const ambianceAudio = document.getElementById('ambiance1');
  ambianceAudio.play();

  countdownDisplay.textContent = '0:00:00';

  gameButton.addEventListener('mouseover', () => {
    isHoveringGameButton = true;
  });

  gameButton.addEventListener('mouseout', () => {
    isHoveringGameButton = false;
  });

  // Handle keydown events for the Space key
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      if (isAudioPlaying) return;

      if (isHoveringGameButton && !outOfAmmo) {
        newButton();
        reduceAmmo();
        playSound('shotgun');
        playSound('shell');        
        updateScore();
        shotsTaken++;
        updateAccuracy();

      } else if (!isHoveringGameButton && !outOfAmmo) {
        playSound('shotgun');
        playSound('shell');
        shotsTaken++;
        reduceAmmo();
        updateAccuracy();

      }
      if(timer ===0){
        tryAgainButton.classList.remove('hidden');
      }

      // if (ammoLeft === 0) {
      //   outOfAmmo = true;
      //   shotsDisplay.textContent = shotsTaken;
      //   missedDisplay.textContent = ducksMissed;
        
      // }

      // if (totalRounds <= 0) {
      //   if (duckCounter > ducksMissed) {
      //     winnerDisplay.classList.remove('hidden');
      //   } else {
      //     loserDisplay.classList.remove('hidden');
      //   }
      //   
      // }
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
