import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

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
  }, [dice]);

  function newDiceObj() {
    const random = Math.floor(Math.random() * 6) + 1;
    return {
      value: random,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDiceArr = [];
    for (let i = 0; i < 10; i++) {
      const dieObj = newDiceObj();
      newDiceArr.push(dieObj);
    }
    return newDiceArr;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? { ...die } : newDiceObj();
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

  function resetGame() {
    setDice(allNewDice());
    setTenzies(false);
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
      {tenzies && <Confetti />}
      <div className="info">
        <h1 className="info-header">Tenzies</h1>
        <p className="info-text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice">{dieElements} </div>
      <button onClick={tenzies ? resetGame : rollDice} className="roll-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
