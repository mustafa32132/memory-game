import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* // make a copy of the grid
    const newGrid = [...grid]
    // get the number from the sub array
    const number = newGrid[rowIndex][colIndex]
    // check if the number is 0
    if (number === 0) {
      // if the number is 0 make it 1
      newGrid[rowIndex][colIndex] = 1
    } else {
      // if the number is 1 make it 0
      newGrid[rowIndex][colIndex] = 0
    }
    // update the grid
    setGrid(newGrid) */}
  </React.StrictMode>
)
