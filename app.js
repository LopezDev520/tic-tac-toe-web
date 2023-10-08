import TicTacToe from './TicTacToe.js'

export const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

const $board = $(".board")

const tictactoe = new TicTacToe()

document.addEventListener("DOMContentLoaded", () => {
  repaintBoard()
  changeTurn()
})

function repaintBoard () {
  tictactoe.board.forEach((row, y) => {
    const div = document.createElement("div")
    div.className = "row"
      
    $board.append(div)

    
    row.forEach((square, x) => {
      const divSquare = document.createElement("div")
      divSquare.className = `square ${square === " " ? "free" : "busy"}`
      divSquare.innerHTML = square
  
      console.log(divSquare.className)

      divSquare.onclick = () => {
        if(!(divSquare.className === "square busy color-red" || divSquare.className === "square busy color-blue")) {
          tictactoe.mark(`${x + 1}x${y + 1}`)
          $board.innerHTML = ""
          
          repaintBoard()
          changeTurn()
        }
      }

      divSquare.className = 
        `${divSquare.className}${(square === " ") ? "" : (square === "X" ? " color-red" : " color-blue")}`

      div.append(divSquare)
    })
  })
}

function changeTurn() {
  const $actualTurn = $("#actual-turn")

  $actualTurn.innerHTML = tictactoe.turn === 0 ? "X" : "O"
  $actualTurn.style = `
    color: ${tictactoe.turn === 0 ? "red" : "blue"};
    font-weight: bold;
  `
}

const $resetButton = $(".reset-button")
$resetButton.addEventListener("click", () => {
  tictactoe.resetGame()
  $resetButton.style = "display: none"
  
  $(".turn").style = "display. block"
  changeTurn()

  $board.innerHTML = ""
  repaintBoard()
})