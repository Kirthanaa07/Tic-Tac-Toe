import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  // 2D array
  const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  // makes the board disabled after the game is over, preventing from editing the board.
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [result, setResult] = useState();

  function handleCellClick(rowIndex, colIndex) {
    console.warn(`clicked:${rowIndex}${colIndex}`);

    // creating new object instance. that's when the html seems to update.
    // https://github.com/vercel/next.js/discussions/32802
    let curBoard = JSON.parse(JSON.stringify(board));
    console.warn(JSON.stringify(board));
    if (!curBoard[rowIndex][colIndex]) {
      // mark X on the user input
      curBoard[rowIndex][colIndex] = 1;

      let winner = didAnyoneWin(curBoard);
      if (winner) {
        setBoard(curBoard);
        setBoardDisabled(true);
        setResult(winner);
        return;
      }
      // computer's move
      // calculate next move and mark O
      // Play winning move
      // checking 1st row and if the sum of the column values equals to -2, it says that we have an empty cell to win.so its finding that empty cell and setting the value to -1.
      if ((curBoard[0][0] + curBoard[0][1] + curBoard[0][2]) === -2) curBoard[0][curBoard[0].indexOf(0)] = -1;
      else if ((curBoard[1][0] + curBoard[1][1] + curBoard[1][2]) === -2) curBoard[1][curBoard[1].indexOf(0)] = -1;
      else if ((curBoard[2][0] + curBoard[2][1] + curBoard[2][2]) === -2) curBoard[2][curBoard[2].indexOf(0)] = -1;
      // for columns and diagonals checks same thing but sets all of the cells to -1, since we are'nt sure about the value.  
      else if ((curBoard[0][0] + curBoard[1][0] + curBoard[2][0]) === -2) curBoard[0][0] = curBoard[1][0] = curBoard[2][0] = -1;
      else if ((curBoard[0][1] + curBoard[1][1] + curBoard[2][1]) === -2) curBoard[0][1] = curBoard[1][1] = curBoard[2][1] = -1;
      else if ((curBoard[0][2] + curBoard[1][2] + curBoard[2][2]) === -2) curBoard[0][2] = curBoard[1][2] = curBoard[2][2] = -1;
      else if ((curBoard[0][0] + curBoard[1][1] + curBoard[2][2]) === -2) curBoard[0][0] = curBoard[1][1] = curBoard[2][2] = -1;
      else if ((curBoard[0][2] + curBoard[1][1] + curBoard[2][0]) === -2) curBoard[0][2] = curBoard[1][1] = curBoard[2][0] = -1;

      // Block enemy win
      else if ((curBoard[0][0] + curBoard[0][1] + curBoard[0][2]) === 2) curBoard[0][curBoard[0].indexOf(0)] = -1;
      else if ((curBoard[1][0] + curBoard[1][1] + curBoard[1][2]) === 2) curBoard[1][curBoard[1].indexOf(0)] = -1;
      else if ((curBoard[2][0] + curBoard[2][1] + curBoard[2][2]) === 2) curBoard[2][curBoard[2].indexOf(0)] = -1;
      else if ((curBoard[0][0] + curBoard[1][0] + curBoard[2][0]) === 2) {
        const col = curBoard.map(x => x[0]);
        curBoard[col.indexOf(0)][0] = -1;
      }
      else if ((curBoard[0][1] + curBoard[1][1] + curBoard[2][1]) === 2) {
        const col = curBoard.map(x => x[1]);
        curBoard[col.indexOf(0)][1] = -1;
      }
      else if ((curBoard[0][2] + curBoard[1][2] + curBoard[2][2]) === 2) {
        const col = curBoard.map(x => x[2]);
        curBoard[col.indexOf(0)][2] = -1;
      }
      else if ((curBoard[0][0] + curBoard[1][1] + curBoard[2][2]) === 2) {
        curBoard[0][0] = curBoard[0][0] === 0 ? -1 : curBoard[0][0];
        curBoard[1][1] = curBoard[1][1] === 0 ? -1 : curBoard[1][1];
        curBoard[2][2] = curBoard[2][2] === 0 ? -1 : curBoard[2][2];
      }
      else if ((curBoard[0][2] + curBoard[1][1] + curBoard[2][0]) === 2) {
        curBoard[0][2] = curBoard[0][2] === 0 ? -1 : curBoard[0][2];
        curBoard[1][1] = curBoard[1][1] === 0 ? -1 : curBoard[1][1];
        curBoard[2][0] = curBoard[2][0] === 0 ? -1 : curBoard[2][0];
      }

      // take middle if available
      else if (!curBoard[1][1])
        curBoard[1][1] = -1;

      // take corner if available
      else if (!curBoard[0][0])
        curBoard[0][0] = -1
      else if (!curBoard[0][2])
        curBoard[0][2] = -1
      else if (!curBoard[2][0])
        curBoard[2][0] = -1
      else if (!curBoard[2][2])
        curBoard[2][2] = -1;
      else {
        for (let i = 0; i < 3; i++) {
          if (curBoard[i].indexOf(0) !== -1) {
            curBoard[i][curBoard[i].indexOf(0)] = -1;
            break;
          }
        }
      }

      setBoard(curBoard);

      winner = didAnyoneWin(curBoard);
      if (winner) {
        setBoardDisabled(true);
        setResult(winner);
        return;
      }
    }
  }

  function didAnyoneWin(curBoard) {
    if ((curBoard[0][0] + curBoard[1][0] + curBoard[2][0]) === 3
      || (curBoard[0][1] + curBoard[1][1] + curBoard[2][1]) === 3
      || (curBoard[0][2] + curBoard[1][2] + curBoard[2][2]) === 3
      || (curBoard[0][0] + curBoard[0][1] + curBoard[0][2]) === 3
      || (curBoard[1][0] + curBoard[1][1] + curBoard[1][2]) === 3
      || (curBoard[2][0] + curBoard[2][1] + curBoard[2][2]) === 3
      || (curBoard[0][0] + curBoard[1][1] + curBoard[2][2]) === 3
      || (curBoard[0][2] + curBoard[1][1] + curBoard[2][0]) === 3)
      return 'You Wins!';
    else if ((curBoard[0][0] + curBoard[1][0] + curBoard[2][0]) === -3
      || (curBoard[0][1] + curBoard[1][1] + curBoard[2][1]) === -3
      || (curBoard[0][2] + curBoard[1][2] + curBoard[2][2]) === -3
      || (curBoard[0][0] + curBoard[0][1] + curBoard[0][2]) === -3
      || (curBoard[1][0] + curBoard[1][1] + curBoard[1][2]) === -3
      || (curBoard[2][0] + curBoard[2][1] + curBoard[2][2]) === -3
      || (curBoard[0][0] + curBoard[1][1] + curBoard[2][2]) === -3
      || (curBoard[0][2] + curBoard[1][1] + curBoard[2][0]) === -3)
      return 'Computer Wins!';
    /* It checks for the value zero in each row and The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present. */
    const indexSum = curBoard.reduce((partial, row) => partial + row.indexOf(0), 0);
    if (indexSum === -3)
      return 'It\'s a DRAW!';
  }

  function resetBoard() {
    setBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    setBoardDisabled(false);
    setResult('');
  }

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="board d-flex flex-column flex-grow-1">
          <h1 className='title'>Tic Tac Toe</h1>
          {
            board.map((row, rowIndex) => {
              // looping through each item in the array getting the row and the index
              return (
                <div key={rowIndex} className="d-flex flex-row flex-grow-1">
                  {row.map((col, colIndex) => (
                    // looping through the cells in a row
                    <button disabled={boardDisabled} type="button" key={`${rowIndex}${colIndex}`} className="flex-grow-1 cell" onClick={() => handleCellClick(rowIndex, colIndex)}>
                      {board[rowIndex][colIndex] === 1 ? 'X' : board[rowIndex][colIndex] === -1 ? 'O' : ''}
                    </button>
                  ))}
                </div>
              )
            })
          }
          <div className='game-result'>{result}
          </div>
          <div className='d-flex justify-content-end'>
            <button className='reset-btn' type='button' onClick={resetBoard}>Reset</button></div>
        </div>
      </main >
    </>
  )
}
