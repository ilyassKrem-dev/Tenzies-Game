

function Dice(props) {
    const styles= {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    
    return (
        <div  className="dice-div" onClick={props.toggle} style={styles}>
            <h2 className="dice-num">{props.number}</h2>
        </div>
    )
}

export default Dice