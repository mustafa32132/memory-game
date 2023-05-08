import { useState } from "react"
import "./App.css"

type TCell = {
  row: number
  col: number
}

function Appo() {
  const [grid, setGrid] = useState([
    [1, 2, 0, 5],
    [4, 3, 3, 4],
    [2, 0, 1, 5],
  ])

  // the shuffle button function
  function shuffleButton() {
    // shuffle the numbers in the sub arrays
    const newGrid = [...grid]
    // loop through the sub arrays
    for (let i = 0; i < newGrid.length; i++) {
      // loop through the numbers in the sub arrays
      for (let j = 0; j < newGrid[i].length; j++) {
        // get a random index
        const randomIndex: number = Math.floor(Math.random() * newGrid.length)
        // swap the numbers
        const temp = newGrid[i][j]
        // swap the numbers
        newGrid[i][j] = newGrid[randomIndex][j]
        // swap the numbers
        newGrid[randomIndex][j] = temp
      }
    } // update the grid
    setGrid(newGrid)
  }

  // click on the card to flip it "hide the number"

  const [revealedGrid, setRevealedGrid] = useState(
    // create a new array with the same length of the main array
    // fill the new array with empty strings
    // create a new array with the same length of the sub arrays
    // fill the new array with false
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  )

  // check if any card is revealed
  // if any card is revealed, do nothing
  const isAnyCardRevealed = revealedGrid.some((row) => row.some((col) => col))

  const [previousClick, setPreviousClick] = useState<TCell | undefined>()

  // hide the numbers
  function handelCardClicked(rowIndex: number, colIndex: number) {
    // if the card is already revealed, do nothing
    if (revealedGrid[rowIndex][colIndex]) return
    // reveal the clicked card

    const clickedNumber = grid[rowIndex][colIndex]
    // make a copy of the grid
    const newRevealedGrid = [...revealedGrid]
    // get the number from the sub array
    newRevealedGrid[rowIndex][colIndex] = true
    // update the grid
    setRevealedGrid(newRevealedGrid)

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.col]
      // second click of the 2 clicks
      if (previousClickNumber !== clickedNumber) {
        // if the numbers are not the same, hide the numbers again after 1 second
        setTimeout(() => {
          // hide the 1st numbers
          newRevealedGrid[rowIndex][colIndex] = false
          // hide the 2nd numbers
          newRevealedGrid[previousClick.row][previousClick.col] = false
          // update the grid
          setRevealedGrid([...newRevealedGrid])
        }, 1000)
      } else {
        // ckeck if the numbers are the same, then show a window alert "you win"
        if (newRevealedGrid.every((row) => row.every((col) => col))) {
          alert("you win")
          // reset the grid to hide the numbers again
          setRevealedGrid(newRevealedGrid.map((row) => row.map(() => false)))
        }
      }
      // reset the previous click
      setPreviousClick(undefined)
    } else {
      // first click of the 2 clicks
      setPreviousClick({
        row: rowIndex,
        col: colIndex,
      })
    }
  }

  return <>{handelCardClicked}</>
}
