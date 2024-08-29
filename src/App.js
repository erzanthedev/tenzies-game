import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

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
    setDice(allNewDice);
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
