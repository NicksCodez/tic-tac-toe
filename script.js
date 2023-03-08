const gameBoard = (() => {
  const board = [[],[],[]];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = '';
    }
  }
  const getBoard = () => board;
  const setBoard = ((row, column, sign) => {
    board[row][column] = sign;
  });

  let activePlayer = 0;
  let winner = -1;

  function checkWinner(){
    let gameOver = 1;
    for(let i = 0; i < 3; i ++){
      if(board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
        winner = board[i][0] === 'X' ? 0 : 1;
        alert(`Winner: ${winner}`);
        return;
      }
      if(board[0][i] !== '' && board[0][i] === board[1][i]  && board[1][i]  === board[2][i]){
        winner = board[0][i] === 'X' ? 0 : 1;
        alert(`Winner: ${winner}`);
        return;
      }
    }
    if(board[0][0] !== '' && board[0][0] === board[1][1]  && board[1][1]  === board[2][2]){
      winner = board[0][0] === 'X' ? 0 : 1;
      alert(`Winner: ${winner}`);
      return;
    }
    if(board[0][2] !== '' && board[0][2] === board[1][1]  && board[1][1]  === board[2][0]){
      winner = board[0][2] === 'X' ? 0 : 1;
      alert(`Winner: ${winner}`);
      return;
    }
    for(let i = 0; i < 3; i++){
      for( let j = 0; j < 3; j++){
        if(board[i][j] === ''){
          gameOver = 0;
        }
      }
    }
    if(gameOver === 1) {
      winner = 2;
      alert(`Winner: ${winner}`);
  }
}
  
  function playRound(row, column){
    if(board[row][column] !== ''){
      return;
    }
    if(winner !== -1) return;

    const sign = activePlayer === 0 ? 'X' : '0';
    setBoard(row, column, sign);
    activePlayer = activePlayer === 0 ? 1 : 0;
    checkWinner();
  }

  function resetGame(){
    for(let i = 0; i < 3; i++){
      for( let j = 0; j < 3; j++){
        board[i][j] = '';
      }
    }
    winner = -1;
    activePlayer = 0;
  }

  return {
    getBoard,
    playRound,
    resetGame
  }

})();


const playerFactory = function(name, symbol) {
  return {name, symbol};
}

const displayController = (() => {
  const board = gameBoard.getBoard();
  const boardDiv = document.querySelector('#boardDiv');

  function clearBoard() {
    while(boardDiv.lastChild){
      boardDiv.removeChild(boardDiv.firstChild);
    }
  }

  const printBoard = () => {
    clearBoard();
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        const button = document.createElement('button');
        button.textContent = board[i][j];
        button.dataset.row = i;
        button.dataset.column = j;
        if(i === 1){
          button.classList.add('middle-row');
        }
        switch(j){
          case 0:
            button.classList.add('left-column');
            break;
          case 2:
            button.classList.add('right-column');
            break;
          default: break;
        }
        boardDiv.appendChild(button);
      }
    }
  }
  

    function clickHandlerBoard(e) {
      const cellRow = e.target.dataset.row;
      if(!cellRow) return;
      const cellColumn = e.target.dataset.column;
      gameBoard.playRound(cellRow, cellColumn);
      printBoard();
    }

    printBoard();

    boardDiv.addEventListener('click', clickHandlerBoard);

})();

