import React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import selectPt from "./game/gabugabu"
import { range } from "./utils/util"
import "./App.css"

function App() {
  let pt: number[]
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const stageElement = useRef<HTMLInputElement>(null)

  function gameStart() {
    pt = selectPt()
    function setPosition(i: number) {
      let node = stageElement.current?.children.namedItem("stage-" + pt[i])
      if (node != null) {
        let pos = node.getBoundingClientRect()
        setX(pos.x - 50)
        setY(pos.y - 50)
      }
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
        <div className="stage" ref={stageElement}>
          {range(0, 3).map((i) => (
            <div id={"stage-" + i} key={i}></div>
          ))}
        </div>
        <motion.div
          className="boss"
          animate={{ x, y }}
          transition={{ type: "tween" }}
        />
        <button className="start-btn" onClick={() => gameStart()}>
          Start!
        </button>
      </header>
    </div>
  )
}

export default App
