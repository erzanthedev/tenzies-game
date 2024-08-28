import Die from "./Die";

export default function App() {
  function allNewDice() {
    const newDiceArr = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * 6) + 1;
      newDiceArr.push(random);
    }
    return newDiceArr;
  }

  console.log(allNewDice());
  return (
    <main>
      <div className="dice">
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="6" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
      </div>
    </main>
  );
}
