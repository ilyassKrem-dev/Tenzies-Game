
import { useEffect, useState } from "react"
import Dice from "./Dice"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import homelg from "../Logos/icon-home.svg"

function Main2(props) {
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
    const [numsDice , setNumsDice] = useState(allNewDice)
    const [tenzeies , setTenzies] = useState(false)
    const [rollsCount, setRollsCount] = useState(0)
    const [timeTrack , setTimeTrack] = useState(0)
    const [changed , setChanged] = useState(false)
    const [player1Time , setPlayer1Time] = useState(0)
    const [player2Time , setPlayer2Time] = useState(0)
    const [player , setPlayer] = useState(1)
    const [nextplayer , setNextPlayer] = useState(false)
    const [timeStart , setTimeStart] = useState(false)
    useEffect(()=> {
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
        if (!timeStart) {
            setNextPlayer(true)
            console.log(nextplayer)
            setChanged(false)
            setPlayer1Time(timeTrack)
        } else {
            setPlayer2Time(timeTrack)
            setTenzies(true)
            setChanged(false)
            
        }  
      } 
    }, [numsDice])
    function handleClick() {
        if(nextplayer) {
            setPlayer(2)
            setNumsDice(allNewDice())
            setTimeTrack(0)
            setChanged(false)
            setNextPlayer(prev => !prev)
            setTimeStart(true)
            setRollsCount(0)
        } else {
            setChanged(true)
        }
        
      
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
        setPlayer(1)
        setChanged(false)
        setTimeStart(false)
        setPlayer1Time(0)
        setPlayer2Time(0)
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
    function Back() {
        props.show(false)
    }
    let winningText = "";
    if (player1Time === player2Time) {
      winningText = "Draw"
    } else if (player1Time<player2Time) {
      winningText ="Player 1 win's"
    } else {
      winningText= "Player 2 win's"
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
            <div className="gruped-player">
                <div className={player === 2 ? "player-text player-box shadow" : "player-text player-box"}>Player 1
                </div>
                <div className={player === 1 ? "player-text player-box shadow" : "player-text player-box"}>Player 2
                </div>
            </div>
            
           <main >
                <div className="top-level">
                        <img src={homelg} onClick={Back} alt="" />
                        <h1 className="title">Tenzies</h1>
                </div>
              {tenzeies && winningText !== "Draw" && <Confetti />}
              
              
              <p className="description">Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.
              </p>
              <p className="text">{timeTrack}s</p>
              <div  className="grouped-dice">
                      {diceNumberd}
              </div>
              {tenzeies && <p className="winning">
                {`${winningText}`}
              </p>}
              <div className="button-and-count">
                {tenzeies && <button onClick={handleClick} className="roll-dice button-text">{tenzeies ? "New Game" : "Roll"}</button>}
                {!tenzeies && <button onClick={handleClick} className="roll-dice button-text">{nextplayer ? "Next Player" : "Roll"}</button>}
                <p className="rolls text">Rolls: {rollsCount}</p>
              </div>
              <p className="text time-text">Time</p>
              <div className="grouped-time">
                <p className="best-time text">Player 1: {player1Time}s</p>
                <p className="best-time text">Player 2: {player2Time}s</p>
              </div>
              
           </main>
        </div>
      )
    }
  
export default Main2