import { useEffect, useState } from 'react';
import './App.css';
import Square from './components/Square';
import {nanoid} from 'nanoid';
import Confetti  from 'react-confetti';

function App() {
  let _generateNewDice = () => {
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }

  let allNewDice = () => {
    let randomNumbers = [];
    for(let i=0; i<=9; i++){
      randomNumbers.push(_generateNewDice())
    }
    return randomNumbers;
  }


  const rollDice = () => {
    if(rollTheDice) {
      setRollTheDice(false)
      setNumbers(allNewDice())
      return 0;
    }

    setNumbers(prevDices =>
      prevDices.map(item =>
        item.isHeld?
          item : 
          _generateNewDice()
      )
    )
  }

  const holdDice = (id) => {
    setNumbers(prevDices => prevDices.map(item => item.id === id ? { ...item, isHeld: !item.isHeld } : item));
  }

  const [numbers, setNumbers] = useState(allNewDice())
  const [rollTheDice, setRollTheDice] = useState(false);

  useEffect(() => {
    let isWon = numbers.every(item => item.value === numbers[0].value && item.isHeld)
    if(isWon) {
      setRollTheDice(true);
    }
  }, [numbers])

  return (
    <>
    { rollTheDice && <Confetti /> }
    <div className="App">
      <main>
        <h1 className="title">Roll the dice</h1>
        <p className="instructions">Roll until all dice match. Tap on each die to freeze it at its current value between rolls.</p>
        <div className='squares-container'>
        { numbers.map((item) => {
            return <Square key={item.id} dice={item} holdDice={holdDice} />
          })}
        </div>
        <button id="roll-dice" onClick={rollDice} className='roll-dice'>{rollTheDice ? 'New Game' : 'Roll Dice'}</button>
      </main>
    </div>
    </>
  );
}

export default App;
