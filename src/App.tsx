import React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import selectPt from "./game/gabugabu"
import { range } from "./utils/util"
import "./App.css"

function App() {
  let pt: number[]
  const stageElement = useRef<HTMLInputElement>(null)
  const bossElement = useRef<HTMLInputElement>(null)
  const startBtnElement = useRef<HTMLInputElement>(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [isFinishedGabu, setIsFinishedGabu] = useState(false)

  function setPosition(i: number) {
    let node = stageElement.current?.children.namedItem("stage-" + pt[i])
    if (node != null) {
      let pos = node.getBoundingClientRect()
      setX(pos.x - 50)
      setY(pos.y - 50)
    }
  }

  function moveGabu() {
    for (let i = 0; i < pt.length; i++) {
      ;(async function (i) {
        await new Promise((resolve: (value?: string) => void) =>
            setTimeout(() => {
              setPosition(i)
              resolve()
            }, i * 1000)
        )
        if(i===7) {
          setIsFinishedGabu(true)
        }
      })(i)
    }
  }

  function gameStart() {
    setIsFinishedGabu(false)
    // @ts-ignore
    startBtnElement.current.style.visibility = "hidden"
    pt = selectPt()
    moveGabu()
  }

  useEffect(() => {
    if (isFinishedGabu) {
      // @ts-ignore
      startBtnElement.current.style.visibility = "visible"
    }
  }, [isFinishedGabu])


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
