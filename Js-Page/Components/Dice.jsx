

const Pip = () => <span className="pip" />;

const Face = (props) => {
        
        return <div onClick={props.toggle} style={props.styleChange} className="face dice-div">{props.children}</div>};

const Dice = (props) => {
    const styles= {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
	let pips = Number.isInteger(props.number)
		? Array(props.number)
				.fill(0)
				.map((_, i) => <Pip key={i} />)
		: null;
	return <Face 
            children={pips}
            styleChange={styles}
            toggle={props.toggle}/>;
};




/*function Dice(props) {
    const styles= {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    
    return (
        <div  className="dice-div" onClick={props.toggle} style={styles}>
            <h2 className="dice-num">{props.number}</h2>
        </div>
    )
}*/

export default Dice