import { $ } from "./app.js"

export default class TicTacToe {
  constructor() {
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]

    this.turn = 0
    this.onGame = true

    this.htmlAlert = $(".alert")
    this.htmlResetButton = $(".reset-button")
  }

  mark(coords) {
    if(!this.onGame)
      return

    const symbol = this.turn === 0 ? "X" : "O"
    let splittedCoords = coords.split("x")
    splittedCoords = splittedCoords.map(stringNumber => parseInt(stringNumber))

    const [x, y] = splittedCoords

    if(x >= 4 || y >= 4)
      return

    this.board[y - 1][x - 1] = symbol

    this.turn = this.turn === 0 ? 1 : 0
    this.checkWinner()
  }

  checkWinner() {
    let winner = ""
    let draw = false
    const possibleWinnings = []

    // horizontals
    possibleWinnings.push([this.board[0][0], this.board[0][1], this.board[0][2]]) // 1
    possibleWinnings.push([this.board[1][0], this.board[1][1], this.board[1][2]]) // 2
    possibleWinnings.push([this.board[2][0], this.board[2][1], this.board[2][2]]) // 3

    // verticals
    possibleWinnings.push([this.board[0][0], this.board[1][0], this.board[2][0]]) // 1
    possibleWinnings.push([this.board[0][1], this.board[1][1], this.board[2][1]]) // 2
    possibleWinnings.push([this.board[0][2], this.board[1][2], this.board[2][2]]) // 3

    // diagonals
    possibleWinnings.push([this.board[0][0], this.board[1][1], this.board[2][2]])
    possibleWinnings.push([this.board[0][2], this.board[1][1], this.board[2][0]])

    possibleWinnings.forEach(posibility => {
      if(posibility.every(symbol => symbol === "X")) {
        winner = "X"
        return
      }

      if(posibility.every(symbol => symbol === "O")) {
        winner = "O"
        return
      }

      if(this.boardIsFull()) 
        draw = true
      
    })

    if(winner) {
      this.designWinner(winner)
    } else if(draw) {
      this.designDraw()
    }
  }

  designWinner(symbol) {
    this.printBoard()
    this.onGame = false

    this.htmlAlert.innerHTML = `El ganador es: ${symbol}`
    this.htmlAlert.className = "alert winner"
    this.htmlAlert.style = `
      display: block; 
      color: white; 
      background: ${symbol === "X" ? "red" : "blue"}
      `
    
    this.htmlResetButton.style = "display: block"

    $(".turn").style = "display: none"
  }

  designDraw() {
    this.htmlAlert.innerHTML = "EMPATE!"
    this.htmlAlert.className = "alert draw"
    this.htmlAlert.style = "display: block"

    this.htmlResetButton.style = "display: block"
  }

  printBoard() {
    this.board.forEach((row, index) => {
      let listString = row.toString()
      listString = listString.replace("[", "")
      listString = listString.replace("]", "")
      listString = listString.replace(",", " ")
      listString = listString.replace(",", " ")
    })
  }

  boardIsFull() {
    let isFull = true;

    this.board.forEach((row, y) => {
      row.forEach((square, x) => {
        if(square === " ") {
          isFull = false
        }
      })
    })

    return isFull
  }

  resetGame() {
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]

    this.turn = 0
    this.onGame = true

    this.htmlAlert.style = "display: none"
  }
}