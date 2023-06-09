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

  function shuffleButton() {
    const newGrid = [...grid]
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        const randomIndex: number = Math.floor(Math.random() * newGrid.length)
        const temp = newGrid[i][j]
        newGrid[i][j] = newGrid[randomIndex][j]
        newGrid[randomIndex][j] = temp
      }
    }
    setGrid(newGrid)
  }

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  )

  const isAnyCardRevealed = revealedGrid.some((row) => row.some((col) => col))

  const [previousClick, setPreviousClick] = useState<TCell | undefined>()

  function handelCardClicked(rowIndex: number, colIndex: number) {
    if (revealedGrid[rowIndex][colIndex]) return

    const clickedNumber = grid[rowIndex][colIndex]
    const newRevealedGrid = [...revealedGrid]
    newRevealedGrid[rowIndex][colIndex] = true
    setRevealedGrid(newRevealedGrid)

    if (previousClick) {
      const previousClickNumber = grid[previousClick.row][previousClick.col]
      if (previousClickNumber !== clickedNumber) {
        setTimeout(() => {
          newRevealedGrid[rowIndex][colIndex] = false
          newRevealedGrid[previousClick.row][previousClick.col] = false
          setRevealedGrid([...newRevealedGrid])
        }, 1000)
      } else {
        if (newRevealedGrid.every((row) => row.every((col) => col))) {
          alert("you win")
          setRevealedGrid(newRevealedGrid.map((row) => row.map(() => false)))
        }
      }
      setPreviousClick(undefined)
    } else {
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
      {/* the shuffle button */}
      <button
        onClick={shuffleButton}
        disabled={isAnyCardRevealed}
        className=" flex self-center border-solid border-black border-2 w-[220px]"
      >
        shuffle the cards
      </button>
    </div>
  )
}

export default App
