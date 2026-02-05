const HEX_SIZE = 25;
const HEX_WIDTH = 0;
const HEX_HEIGHT = HEX_SIZE / 2;
const BOARD_ROW = 8;
const BOARD_COL = 10;

const HEX_COLOR = "#ffffff2f";
const HEX_DISABLE_COLOR = "#646464";
const HEX_COLOR_PLAYER1 = "rgb(203, 25, 25)f";
const HEX_COLOR_PLAYER2 = "rgb(42, 113, 205)";

let gameState = {
  board: [],
  player1: "",
  player2: "",
  currentNumber: 0,
  currentPlayer: 1,
  difficultyInput: "",
  difficulty: {
    easy: 4,
    medium: 6,
    hard: 8,
  },
  gameOver: false,
  isBot: false,
};

const opponents = document.querySelectorAll("input[name='opponent']");
const startButton = document.getElementById("startGameBtn");
const inputPlayer2 = document.querySelector(".input-player2");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const difficulty = document.querySelectorAll("input[name='difficult']");
const selectDIfficulty = document.querySelector(
  "input[name='difficult']:checked",
);

startButton.disabled;
startButton.style.background = "#ababab";
startButton.style.cursor = "not-allowed";

opponents.forEach((opponent) => {
  opponent.addEventListener("change", function () {
    const chose = opponent.value;
    validatePlayButton;
    if (chose === "bot") {
      inputPlayer2.style.display = "none";
      gameState.player2 = "bot";
    } else {
      inputPlayer2.style.display = "inline";
      gameState.player2 = player2.value;
    }
  });
});

difficulty.forEach((diff) => {
  diff.addEventListener("change", validatePlayButton);
});
player1.addEventListener("input", validatePlayButton);
player2.addEventListener("input", validatePlayButton);


function validatePlayButton() {
  console.log(gameState);
  const player1 = player1.value 
  if (
    (!player1.value === "" && !player2.value === "" && selectDIfficulty) ||
    (!player1.value === "" && selectDIfficulty && gameState.player === "bot")
  ) {
    startButton.enabled;
    startButton.style.background = "green";
    startButton.style.cursor = "pointer";
  } else {
    startButton.disabled;
    startButton.style.background = "#ababab";
    startButton.style.cursor = "not-allowed";
  }
}

startButton.addEventListener("click", function () {
  console.log(gameState);
});