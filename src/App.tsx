import React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import selectPt from "./game/gabugabu"
import { range } from "./utils/util"
import "./App.css"

function App() {
  function setPosition(i: number) {
    let node = stageElement.current?.children.namedItem("stage-" + pt[i])
    if (node != null) {
      let pos = node.getBoundingClientRect()
      setX(pos.x - 50)
      setY(pos.y - 50)
    }
  }
  function gameStart() {
    // @ts-ignore
    startBtnElement.current.style.visibility = "hidden"
    pt = selectPt()
    for (let i = 0; i < pt.length; i++) {
      ;(function (i) {
        setTimeout(setPosition, i * 1000, i)
      })(i)
    }
  }

  let pt: number[]
  const stageElement = useRef<HTMLInputElement>(null)
  const bossElement = useRef<HTMLInputElement>(null)
  const startBtnElement = useRef<HTMLInputElement>(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

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
          ref={bossElement}
        >
          <p>boss</p>
        </motion.div>
        <div ref={startBtnElement}>
          <button className="start-btn" onClick={() => gameStart()}>
            Start!
          </button>
        </div>
      </header>
    </div>
  )
}

export default App
