
import { useState } from "react"
import Dice from "./Components/Dice"
import { nanoid } from 'nanoid'


function App() {

    function allNewDice() {
      const randomArrayNumber = []
      for(let i=0 ; i <10 ; i++) {
        const randomNumber = Math.floor(Math.random() * 6 + 1)
        randomArrayNumber.push({
          value: randomNumber, 
          isHeld:false,
          id:nanoid()
        })
      }
      return randomArrayNumber

    }
    
    const [numsDice , setNumsDice] = useState(allNewDice)
    
    function handleClick() {
      setNumsDice(prevNum => {
        const newNum = prevNum.map(die => {
          if(die.isHeld) {
            return die
          } else {
            return { 
              value: Math.floor(Math.random() * 6 + 1), 
              isHeld:false,
              id:nanoid()
            }
          }
        })
        return newNum
      })  
    }

    function handletoggle(id) {
      setNumsDice(prevDice => {
        
        const newDice = prevDice.map(die => {
          if (die.id === id) {
            return {
              ...die,isHeld: !die.isHeld
            }
          } else {
            return die
          }
          
        })
        return newDice
      })
      
    }
    
    const diceNumberd = numsDice.map((numDice) => {
        return <Dice 
            key={numDice.id}
            number={numDice.value}
            isHeld={numDice.isHeld}
            toggle={() => handletoggle(numDice.id)} />
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