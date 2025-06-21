const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultDisplay = document.getElementById('result');
const playerScoreDisplay = document.getElementById('player');
const computerScoreDisplay = document.getElementById('computer');

let playerScore = 0;
let computerScore = 0;

const choice = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choice.length);
  return choice[randomIndex];
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  let result = '';

  if (playerChoice === computerChoice) {
    result = `Both sides chose ${playerChoice}, it's a tie`;
  } else if (
      (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
      (playerChoice === 'Paper' && computerChoice === 'Rock') ||
      (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    result = `The Player won this round.`;
    playerScore += 1;
  } else {
    result = `The Computer won this round.`;
    computerScore += 1;
  }

  resultDisplay.textContent = result;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

rockBtn.addEventListener('click', () => playRound('Rock'));
paperBtn.addEventListener('click', () => playRound('Paper'));
scissorsBtn.addEventListener('click', () => playRound('Scissors'));