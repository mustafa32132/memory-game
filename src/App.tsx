import { useState } from "react"
import "./App.css"

type TCell = {
  row: number
  col: number
}

function App() {
  const [grid, setGrid] = useState([
    [1, 2, 0, 5],
    [4, 3, 3, 4],
    [2, 0, 1, 5],
  ])

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

  return (
    <div
      id="App"
      className=" font-serif text-3xl flex flex-col justify-center pt-3 gap-3"
    >
      {/* display the sub arrays from the main array */}
      {grid.map((row, rowIndex) => {
        return (
          // get index of the sub arrays
          // display the numbers from the sub arrays
          <div
            id="row"
            key={rowIndex}
            className=" flex place-content-center gap-7 pb-3"
          >
            {/* disply the numbers from the sub arrays */}
            {row.map((number, colIndex) => {
              return (
                <div
                  id="card"
                  // click on the card to flip it "hide the number"
                  onClick={() => {
                    handelCardClicked(rowIndex, colIndex)
                  }}
                  key={colIndex}
                  className=" grid place-content-center bg-slate-400 w-[60px] h-[85px] rounded-lg"
                >
                  {revealedGrid[rowIndex][colIndex] ? number : ""}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default App
