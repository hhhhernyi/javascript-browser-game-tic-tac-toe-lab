/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
}
function render() {
  updateBoard();
  updateMessage();
}
function updateBoard() {
  for (let i = 0; i < board.length; i++) {
    squareEls[i].textContent = board[i];
  }
}
function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `It is player ${turn}'s turn!`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It is a draw!";
  } else {
    messageEl.textContent = `The winner is player ${turn}! Congratulations!`;
  }
}
function handleClick(event) {
  //console.log(event.target.id);
  const squareIndex = event.target.id;
  if (board[squareIndex] === "X" || board[squareIndex] === "O"||winner === true) {
    return;
  }
  placePeice(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePeice(index) {
  board[index] = turn;
  //squareEls[index].textContent = board[index];
  console.log(board);
}
function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    // console.log(board[winningCombos[i][0]]);
    // console.log(board[winningCombos[i][1]]);
    // console.log(board[winningCombos[i][2]]);
    if (
      board[winningCombos[i][0]] !== "" &&
      board[winningCombos[i][1]] === board[winningCombos[i][0]] &&
      board[winningCombos[i][0]] === board[winningCombos[i][2]]
    ) {
      winner = true;
      //console.log("winner",winner);
    }
  }
}

function checkForTie() {
    if (winner===true) {
        return;
    } else {
        for (let i = 0; i < board.length; i++) {
        if (board[i]==='') {
            tie=false;
            //console.log('tie', tie);
        } else {
            tie=true;
            //console.log('tie', tie);
        }
    } 

    }
}

function switchPlayerTurn() {
    if(winner===true) {
        return;
    } else if(turn==='X') {
        turn="O";
        //console.log("turn", turn);
    } else {
        turn="X";
        //console.log("turn", turn);
    }
}



/*----------------------------- Event Listeners -----------------------------*/
for (let i = 0; i < squareEls.length; i++) {
  squareEls[i].addEventListener("click", handleClick);
}

resetBtnEl.addEventListener("click", init);

init();
