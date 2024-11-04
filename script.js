'use strict';
// -------------- selecting elements ----------------
let activePlayer, currentScore, playersScores, gameInProgress;

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// const btnInfo = document.getElementById('info');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');

// -------------- function definitons ----------------
const init = function () {
  // Initialize score values and reset game to inital state
  playersScores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gameInProgress = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document.getElementById('wins').textContent = '';
};

const switchPlayers = function () {
  currentScore = 0;
  // reset the prev player score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // update active player status
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  // switch current player
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const rollTheDice = function () {
  if (gameInProgress) {
    // generate a random dice rool
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // display dice
    dice.classList.remove('hidden');
    // dynamique roll of the dice img
    dice.src = `./images/dice-${diceNumber}.png`;
    // check if there's need to swithc players
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      // select current player and set it's current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
};

const holdPlayerScore = function () {
  if (gameInProgress) {
    playersScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playersScores[activePlayer];
    // check for winner?
    if (playersScores[activePlayer] >= 100) {
      gameInProgress = false;
      document.getElementById('wins').textContent = `Player ${
        activePlayer + 1
      } wins!!!`;
      // Throw confetti on winning
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
      // hide the dice
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // swithc players
      switchPlayers();
    }
  }
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// -------------- Main script ----------------
init(); //start the game
// events listeners
btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', holdPlayerScore);
btnNew.addEventListener('click', init);

// Game info - event listeners for modal
btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Handle closing the modal with "Escape" key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
