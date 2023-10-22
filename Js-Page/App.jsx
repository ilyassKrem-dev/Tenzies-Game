
import { useState } from "react"
import Dice from "./Components/Dice"



function App() {

    function allNewDice() {
      const randomArrayNumber = []
      for(let i=0 ; i <10 ; i++) {
        const randomNumber = Math.floor(Math.random() * 6 + 1)
        randomArrayNumber.push(randomNumber)
      }
      return randomArrayNumber
    }

    const [numsDice , setNumsDice] = useState(allNewDice)

    function handleClick() {
      const newArray = allNewDice()
      setNumsDice(prevNum => {
        return newArray
      })
    }

    const diceNumberd = numsDice.map((numDice) => {
        return <Dice key={numDice === numDice ? numDice*Math.random() : numDice} number={numDice} />
    })

    

    return (
      <div className="tenzies-box">
         <main >
            <div  className="grouped-dice">
                    {diceNumberd}
            </div>
            
            <button onClick={handleClick} className="roll-dice button-text">Roll</button>

         </main>
      </div>
    )
  }

export default App