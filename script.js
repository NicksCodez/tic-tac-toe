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
  let playerOneScore = 0;
  let playerTwoScore = 0;

  function checkWinner(){
    let gameOver = 1;
    for(let i = 0; i < 3; i ++){
      if(board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
        // winner = board[i][0] === 'X' ? 0 : 1;
        if(board[i][0] === 'X'){
          winner = 0;
          playerOneScore++;
        } else {
          winner = 1;
          playerTwoScore++;
        }
        alert(`Winner: ${winner}`);
        return;
      }
      if(board[0][i] !== '' && board[0][i] === board[1][i]  && board[1][i]  === board[2][i]){
        // winner = board[0][i] === 'X' ? 0 : 1;
        if(board[0][i] === 'X'){
          winner = 0;
          playerOneScore++;
        } else {
          winner = 1;
          playerTwoScore++;
        }
        alert(`Winner: ${winner}`);
        return;
      }
    }
    if(board[0][0] !== '' && board[0][0] === board[1][1]  && board[1][1]  === board[2][2]){
      // winner = board[0][0] === 'X' ? 0 : 1;
      if(board[0][0] === 'X'){
        winner = 0;
        playerOneScore++;
      } else {
        winner = 1;
        playerTwoScore++;
      }
      alert(`Winner: ${winner}`);
      return;
    }
    if(board[0][2] !== '' && board[0][2] === board[1][1]  && board[1][1]  === board[2][0]){
      // winner = board[0][2] === 'X' ? 0 : 1;
      if(board[0][2] === 'X'){
        winner = 0;
        playerOneScore++;
      } else {
        winner = 1;
        playerTwoScore++;
      }
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
  
  function getActivePlayer(){return activePlayer};
  function getWinner(){return winner};
  function getPlayerOneScore(){return playerOneScore};
  function getPlayerTwoScore(){return playerTwoScore};

  return {
    getBoard,
    playRound,
    resetGame,
    getActivePlayer,
    getWinner,
    getPlayerOneScore,
    getPlayerTwoScore
  }

})();


const playerFactory = (playerName) => {
  let name = playerName;
  function setName(newName){
    name = newName;
  }
  function getName(){return name;}
  
  return{
    setName,
    getName
  }
}

const displayController = (() => {
  const boardDiv = document.querySelector('#boardDiv');
  const playerTurnDiv = document.querySelector('#playerTurn');
  const playerOneScoreDiv = document.querySelector('#playerOneScore');
  const playerTwoScoreDiv = document.querySelector('#playerTwoScore');
  const restartButton = document.querySelector('.restart');
  const playerOneName = document.querySelector('input[id="playerOneName"');
  const playerTwoName = document.querySelector('input[id="playerTwoName"');
  const submitPlayers = document.querySelector('.form-submit');

  const board = gameBoard.getBoard();
  const playerOne = playerFactory('Player One');
  const playerTwo = playerFactory('Player Two');

  function clearBoard() {
    while(boardDiv.firstChild){
      boardDiv.removeChild(boardDiv.lastChild);
    }
  }

  const printBoard = () => {
    clearBoard();
    playerTurnDiv.textContent = `It is ${gameBoard.getActivePlayer() === 0 ? playerOne.getName() : playerTwo.getName()}'s turn`;
    switch(gameBoard.getWinner()){
      case 0:
      case 1:
        playerTurnDiv.textContent = `${gameBoard.getWinner() === 0 ? playerOne.getName() : playerTwo.getName()} won! Congratulations!`;
        break;
      case 2:
        playerTurnDiv.textContent = 'It\'s a tie!';
        break;
      default: break;
    }
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
    playerOneScoreDiv.textContent = gameBoard.getPlayerOneScore();
    playerTwoScoreDiv.textContent = gameBoard.getPlayerTwoScore();
  }
    
    

    function clickHandlerBoard(e) {
      const cellRow = e.target.dataset.row;
      if(!cellRow) return;
      const cellColumn = e.target.dataset.column;
      gameBoard.playRound(cellRow, cellColumn);
      console.log(gameBoard.getActivePlayer());
      printBoard();
    }

    printBoard();

    boardDiv.addEventListener('click', clickHandlerBoard);
    restartButton.addEventListener('click', (e) =>{
      e.preventDefault();
      gameBoard.resetGame();
      printBoard();
    });

    submitPlayers.addEventListener('click', (e) =>{
      e.preventDefault();
      playerOne.setName(playerOneName.value);
      playerOneName.value = '';
      playerTwo.setName(playerTwoName.value);
      playerTwoName.value = '';
      printBoard();
    });
    
    
})();

