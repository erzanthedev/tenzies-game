import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [bestTime, setBestTime] = useState(Infinity);
  const [isGameRunning, setIsGameRunning] = useState(false);

  console.log("Is Game running: ", isGameRunning);
  console.log("Start Time: ", startTime);

  useEffect(() => {
    const allHeldDice = dice.every((die) => die.isHeld);
    const firstNum = dice[0].value;
    const allValueSame = dice.every((die) => die.value === firstNum);

    if (allHeldDice && allValueSame) {
      setIsGameRunning(false);
      setTenzies(true);
    }
  }, [dice]);

  function timeFormat(time) {
    let totalSeconds = Math.floor(time / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

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
      newDiceArr.push(newDiceObj());
    }
    return newDiceArr;
  }

  function rollDice() {
    setCount((oldCount) => oldCount + 1);

    // Reset Game
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setCount(0);
      setStartTime(null);
    } else {
      // Roll Dice
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? { ...die } : newDiceObj();
        }),
      );
    }
  }

  function holdDice(id) {
    if (!isGameRunning && startTime === null) {
      setIsGameRunning(true);
      setStartTime(Date.now());
    }
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
      {tenzies && <Confetti />}
      <div className="info">
        <h1 className="info-header">Tenzies</h1>
        <p className="info-text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice">{dieElements} </div>
      {tenzies && <h2 className="message">Tenzies!!....You Won</h2>}
      <button onClick={rollDice} className="roll-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div>
        {tenzies && <p>Rolled Dice {count} times</p>}
        <p>Best Time:</p>
      </div>
    </main>
  );
}
