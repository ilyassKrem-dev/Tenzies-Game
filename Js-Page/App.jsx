
import { useEffect, useState } from "react"
import Dice from "./Components/Dice"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
    function generateNewDie() {
      const randomNumber = Math.floor(Math.random() * 6 + 1)
      return {
        value: randomNumber, 
        isHeld:false,
        id:nanoid()
      }
    }
    function allNewDice() {
      const randomArrayNumber = []
      for(let i=0 ; i <10 ; i++) {
        randomArrayNumber.push(generateNewDie())
      }
      return randomArrayNumber

    }
    const savedBestTime = JSON.parse(localStorage.getItem('best-time'))
    const [numsDice , setNumsDice] = useState(allNewDice)
    const [tenzeies , setTenzies] = useState(false)
    const [rollsCount, setRollsCount] = useState(0)
    const [timeTrack , setTimeTrack] = useState(0)
    const [changed , setChanged] = useState(false)
    const [bestTime , setBestTime] = useState(savedBestTime || 0)

    useEffect(()=> {
      console.log(changed)
      let intervalId
      if(changed) {
        intervalId = setInterval(() => {
          setTimeTrack(prev => prev+1)
        } , 1000) }
      return () => {
          if(intervalId) {
            clearInterval(intervalId)
          }
        }
    } , [changed])
    useEffect(() => {
      const checkCondition = numsDice.every(die => (
        die.isHeld && die.value === numsDice[0].value
      ))
      if(checkCondition) {
        setTenzies(true)
        setChanged(false)
        if(timeTrack < bestTime) {
          setBestTime(timeTrack)
        } else if (bestTime === 0) {
          setBestTime(timeTrack)
        }
      }
    }, [numsDice])

    useEffect(() => {
      localStorage.setItem('best-time' , JSON.stringify(bestTime))
    }, [bestTime]) 
    function handleClick() {
      setChanged(true)
      setNumsDice(prevNum => {
        const newNum = prevNum.map(die => {
          if(die.isHeld) {
            return die
          } else {
            return generateNewDie()

          }
        })
        return newNum
      })
      setRollsCount(() => rollsCount + 1)
      if (tenzeies) {
        setTimeTrack(0)
        setTenzies(prev => !prev)
        setRollsCount(0)
        setNumsDice(allNewDice())
      }
        
    }

    function handletoggle(id) {
      setChanged(true)
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
            {tenzeies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="description">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.
            </p>
            <p className="text">{timeTrack}s</p>
            <div  className="grouped-dice">
                    {diceNumberd}
            </div>
            {tenzeies && <p className="winning">
              {rollsCount<10 ? "Fast Win!!" : "You win!"}
            </p>}
            <div className="button-and-count">
              <button onClick={handleClick} className="roll-dice button-text">{tenzeies ? "New Game" : "Roll"}</button>
              <p className="rolls text">Rolls: {rollsCount}</p>
            </div>
            <p className="best-time text">Best Time: {bestTime}s</p>
         </main>
      </div>
    )
  }

export default App