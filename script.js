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

// event handler functions
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
    if (playersScores[activePlayer] >= 20) {
      gameInProgress = false;
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
// -------------- Main script ----------------
init(); //start the game
// events listeners
btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', holdPlayerScore);
btnNew.addEventListener('click', init);
