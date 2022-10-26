import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { gabuPosition, pt1, pt2 } from "./game/gabuArray"
import { range } from "./utils/util"
import "./App.css"

function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <div className="stage">
          {range(0, 3).map((i) => (
            <div id={"stage-" + i} key={i}>
              {i}
            </div>
          ))}
        </div>
        <div>
          <motion.div
            className="boss"
            animate={{ x, y }}
            transition={{ type: String }}
          />
        </div>
        <button onClick={() => setX(x + 200)}>x+</button>
        <button onClick={() => setX(x - 200)}>x-</button>
        <button onClick={() => setY(y - 200)}>y+</button>
        <button onClick={() => setY(y + 200)}>y-</button>
        <button onClick={() => {}}>Start!</button>
      </header>
    </div>
  )
}

export default App
