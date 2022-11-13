import React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { pt1, pt2 } from "./game/gabugabu"
import { range } from "./utils/util"
import "./App.css"

function App() {
  let pt = pt1
  const stageElement = useRef<HTMLInputElement>(null)
  const bossElement = useRef<HTMLInputElement>(null)
  const startBtnElement = useRef<HTMLInputElement>(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [statePt, setStatePt] = useState<number[]>(pt1)
  const [isFinishedGabu, setIsFinishedGabu] = useState(false)

  window.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, {passive: false});

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
        if(i===7) callBackGamePause()
      })(i)
    }
  }

  async function callBackGamePause() {
    await new Promise((resolve: (value?: string) => void) =>
      setTimeout(() => {
        resolve()
      }, 2000)
    )
    // @ts-ignore
    bossElement.current.style.visibility = "hidden"
    initBossPosition()

    // after remove
    setIsFinishedGabu(true)
  }

  function gameStart() {
    setIsFinishedGabu(false)
    // @ts-ignore
    startBtnElement.current.style.visibility = "hidden"
    // @ts-ignore
    bossElement.current.style.visibility = "visible"
    // after delete
    pt = statePt
    moveGabu()
  }

  function initBossPosition() {
    setPosition(0);
  }

  useEffect(() => {
    if (isFinishedGabu) {
      // @ts-ignore
      startBtnElement.current.style.visibility = "visible"
    }
  }, [isFinishedGabu])

  useEffect(() => {
    initBossPosition()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



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
        <div className="radio-btn-wrapper">
          <label>
            <input type="radio" name="pt" value="pt1" defaultChecked onChange={() => setStatePt(pt1)} />
            <p>pattern1</p>
          </label>
          <label>
            <input type="radio" name="pt" value="pt2" onChange={() => setStatePt(pt2)}/>
            <p>pattern2</p>
          </label>
        </div>
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
