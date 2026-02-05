const HEX_SIZE = 20;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = HEX_SIZE * 2;
const BOARD_ROW = 8;
const BOARD_COL = 10;

const HEX_COLOR = "#ffffff2f";
const HEX_DISABLE_COLOR = "#646464";
const HEX_COLOR_PLAYER1 = "rgb(203, 25, 25)";
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
const gameScreen = document.querySelector(".game-screen");
const welcomeScreen = document.querySelector(".welcome-screen");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

startButton.disabled = true;
startButton.style.background = "#ababab";
startButton.style.cursor = "not-allowed";

opponents.forEach((opponent) => {
  opponent.addEventListener("change", function () {
    const chose = opponent.value;
    if (chose === "bot") {
      inputPlayer2.style.display = "none";
      player2.value = "bot";
    } else {
      inputPlayer2.style.display = "inline";
      player2.value = "Player 2";
    }
    validatePlayButton();
  });
});

difficulty.forEach((diff) => {
  diff.addEventListener("change", validatePlayButton);
});
player1.addEventListener("input", validatePlayButton);
player2.addEventListener("input", validatePlayButton);

function validatePlayButton() {
  const selectDIfficulty = document.querySelector(
    "input[name='difficult']:checked",
  );
  const opponent = document.querySelector("input[name='opponent']:checked");
  if (
    (player1.value !== "" && player2.value !== "" && selectDIfficulty) ||
    (player1.value !== "" && selectDIfficulty && opponent.value === "bot")
  ) {
    startButton.disabled = false;
    startButton.style.background = "green";
    startButton.style.cursor = "pointer";
  } else {
    startButton.disabled = true;
    startButton.style.background = "#ababab";
    startButton.style.cursor = "not-allowed";
  }
  gameState.difficultyInput = selectDIfficulty.value;
  gameState.isBot = opponent.value === "bot" ? true : false;
}

startButton.addEventListener("click", function () {
  gameState.player1 = player1.value;
  gameState.player2 = player2.value;
  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";

  player1Name.textContent = gameState.player1;
  player2Name.textContent = gameState.player2;

  initGameBoard();
});

function initGameBoard() {
  gameState.board = [];
  for (let row = 0; row < BOARD_ROW; row++) {
    gameState.board[row] = [];
    for (let col = 0; col < BOARD_COL; col++) {
      gameState.board[row][col] = {
        value: 0,
        player: 0,
        disable: false,
      };
    }
  }
  disableBoard();
  renderHex();
}

function disableBoard() {
  let disable = [];
  const count = gameState.difficulty[gameState.difficultyInput];
  while (disable.length < count) {
    row = Math.floor(Math.random() * BOARD_ROW);
    col = Math.floor(Math.random() * BOARD_COL);
    const coor = `${row}-${col}`;
    if (!disable.includes(coor)) {
      disable.push(coor);
      gameState.board[row][col].disable = true;
    }
  }
}

function renderHex() {
  const svg = document.getElementById("hexSvg");
  svg.innerHTML = "";
  for (let row = 0; row < BOARD_ROW; row++) {
    for (let col = 0; col < BOARD_COL; col++) {
      const x = col * HEX_WIDTH + (row % 2 === 0 ? HEX_WIDTH / 2 : 0) + 40;
      const y = row * (HEX_HEIGHT * 0.75) + 40;

      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", "group");
      group.setAttribute("data-row", row);
      group.setAttribute("data-col", col);
      svg.appendChild(group);

      const points = getCoorPoint(x, y);
      const polygon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon",
      );

      group.appendChild(polygon);
      polygon.setAttribute("class", "polygon");
      polygon.setAttribute("points", points);
      polygon.setAttribute("fill", HEX_COLOR);
      polygon.setAttribute("stroke", "#fff");
      polygon.setAttribute("stroke-width", "1");
    }
  }
}

function getCoorPoint(cx, cy) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 90;
    const angleRad = (Math.PI / 180) * angleDeg;
    const x = cx + HEX_SIZE * Math.cos(angleRad);
    const y = cy + HEX_SIZE * Math.sin(angleRad);
    const point = `${x},${y}`;
    points.push(point);
  }
  return points.join(" ");
}
