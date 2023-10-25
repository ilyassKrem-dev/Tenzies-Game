import { useState } from "react"
import Main1 from "./Components/Main1"
import Main2 from "./Components/Main2"

function App() {

  const [player , setPlayer] = useState(0)
  const [show , setShow] = useState(false)

  function showGame(pl) {
    setShow(prev => !prev)
    setPlayer(pl)
  }
  return (
    <div className="app-css">
      
      {player===1 && show ?<Main1 show={setShow} /> : ""}
      {player===2 && show?<Main2 show={setShow}/> : "" }
      {!show && 
        <div className="grouped">
          <h1 className="title">Tenzie Game</h1>
          <div className="button-group">
            <button onClick={() => showGame(1)} className="player bu-text">1 Player</button>
            <button onClick={() => showGame(2)} className="bu-text player">2 Player</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App
    

    