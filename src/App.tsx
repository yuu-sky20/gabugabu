import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { gabuPosition, pt1, pt2 } from "./game/gabuArray"
import { range } from "./utils/util"
import "./App.css"

function selectPt(): number[] {
  const patternNum = 3
  let randomPt = Math.floor(Math.random() * patternNum)
  let pt: number[] = []
  switch (randomPt) {
    case 0:
      pt = pt1
      break
    case 1:
      pt = pt2
      break
    default:
      break
  }
  return pt
}

function App() {
  let pt: number[]
  const [x, setX] = useState(gabuPosition[pt1[0]][0] * 100)
  const [y, setY] = useState(gabuPosition[pt2[0]][0] * 100)
  function gameStart() {
    pt = selectPt()
    function setPosition(i: number) {
      setX(gabuPosition[pt[i]][0] * 100)
      setY(gabuPosition[pt[i]][1] * 100)
    }
    for (let i = 0; i < pt.length; i++) {
      ;(function (i) {
        setTimeout(setPosition, i * 1000, i)
      })(i)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="stage">
          {range(0, 3).map((i) => (
            <div id={"stage-" + i} key={i}></div>
          ))}
          <motion.div
            className="boss"
            animate={{ x, y }}
            transition={{ type: String }}
          />
        </div>
        <button className="start-btn" onClick={() => gameStart()}>
          Start!
        </button>
      </header>
    </div>
  )
}

export default App
