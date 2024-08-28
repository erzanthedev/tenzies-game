import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDiceArr = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 6) + 1;
      newDiceArr.push(random);
    }
    return newDiceArr;
  }

  const dieElements = dice.map((die) => <Die key={nanoid()} value={die} />);
  console.log(dieElements);
  return (
    <main>
      <div className="dice">{dieElements} </div>
    </main>
  );
}
