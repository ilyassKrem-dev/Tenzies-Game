
import Dice from "./Components/Dice"



function App() {
    function allNewDice() {
      const randomArrayNumber = []
      
      for(let i=0 ; i <=10 ; i++) {
        const randomNumber = (Math.random().toFixed(1)*10)
          randomArrayNumber.push(randomNumber)
        
        
      }
      
      console.log(randomArrayNumber)
    }
    allNewDice()

    return (
      <div className="tenzies-box">
         <main >
            <div className="grouped-dice">
                    <Dice number="1" />
                    <Dice number="2" />
                    <Dice number="3" />
                    <Dice number="4" />
                    <Dice number="5" />
                    <Dice number="6" />
                    <Dice number="7" />
                    <Dice number="8" />
                    <Dice number="9" />
                    <Dice number="10"/>
                </div>
         </main>
      </div>
    )
  }

export default App