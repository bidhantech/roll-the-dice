import React from 'react';

export default function Square(props){
    const squareStyle = {
        backgroundColor: props.dice.isHeld? '#59E391' : '#FFFFFF'
    }
    const handleClick = () => {
        props.holdDice(props.dice.id)
    }

    return (
        <div className="square" style={squareStyle} onClick={handleClick}>
            <h2>{props.dice.value}</h2>
        </div>
    )
}