import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeldDice = dice.every((die) => die.isHeld);
    const firstNum = dice[0].value;
    const allValueSame = dice.every((die) => die.value === firstNum);

    if (allHeldDice && allValueSame) {
      setTenzies(true);
      console.log("You Won");
    }
    // at the same time the values are the same
    // if both are true then tenzies is set to true/ console log "You Won"
  }, [dice]);

  function allNewDice() {
    const newDiceArr = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 6) + 1;
      const dieObj = {
        value: random,
        isHeld: false,
        id: nanoid(),
      };
      newDiceArr.push(dieObj);
    }
    return newDiceArr;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? { ...die }
          : {
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
              id: nanoid(),
            };
      }),
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      handleHoldDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
    />
  ));

  return (
    <main>
      <div className="info">
        <h1 className="info-header">Tenzies</h1>
        <p className="info-text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice">{dieElements} </div>
      <button onClick={rollDice} className="roll-btn">
        Roll
      </button>
    </main>
  );
}
