import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import "./main.css";
import Confetti from "react-confetti";

function App() {
  const [rollDice, setRollDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(
    function () {
      const allHeld = rollDice.every((die) => die.isHeld);
      const firstValue = rollDice[0].value;
      const allSameValue = rollDice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        console.log("You won!");
      }
    },
    [rollDice]
  );

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // console.log(allNewDice());
  const diceElements = rollDice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function handleChange() {
    if (!tenzies) {
      setRollDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setRollDice(allNewDice());
    }
  }

  function holdDice(id) {
    setRollDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={handleChange}> {tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
