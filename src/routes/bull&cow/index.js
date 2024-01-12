import { Fragment, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from "./style.css";
import { hasUniqueDigits, generateSecretNumber } from "../../services/number";
import Losing from "../../components/losing";
import Winning from "../../components/winning";
import Solution from "../../components/solution";

const NumberGame = () => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [win, setWin] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [secretNumber, setSecretNumber] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  /**
   * increase the attempt counter
   */
  const increaseAttempts = () => {
    setAttempts((prevAttempts) => prevAttempts + 1);
  };

  /**
   * Reset the game
   */
  const handleReset = () => {
    try {
      secretNumber.splice(0, secretNumber.length);
      secretNumber.push(...generateSecretNumber());
      setError("");
      setAttempts(0);
      setUserInput("");
      setWin(false);
      console.log(secretNumber);
    } catch (error) {
      console.error("Error generating secret number:", error);
    }
  };

  /**
   *
   * @returns
   */
  const handleGuessClick = () => {
    try {
      let secretString = secretNumber.join("");
      let bulls = 0;
      let cows = 0;
      if (userInput.includes("0")) {
        setError(
          `${userInput} est invalide, aucun 0 dans le nombre recherché.\n`
        );
        return null;
      }
      if (!hasUniqueDigits(userInput)) {
        setError(
          `${userInput} est invalide, chaque chiffre doit être saisi une seule fois.\n`
        );
        return null;
      }
      if (userInput.length != secretString.length) {
        setError(
          `${userInput} est invalide, veuillez entrer un nombre composé de exactement 4 chiffres différents.\n`
        );
        return null;
      }
      increaseAttempts();
      for (let i = 0; i < 4; i += 1) {
        if (secretString[i] == userInput[i]) {
          bulls++;
          console.log("bulls", bulls);
        } else if (secretString.includes(userInput[i])) {
          cows++;
          console.log("cows", cows);
        }
      }
      if (bulls === 4) {
        setWin(true);
      }
      setError(`${userInput} - ${bulls}B ${cows}C, try: ${attempts + 1}\n`);
    } catch (error) {
      console.error("Error handling guess click:", error);
    }
  };

  useEffect(() => {
    secretNumber.push(...generateSecretNumber());
    console.log(secretNumber);
    return () => {};
  }, []);

  return (
    <div className="center-page">
      <label className="centerLabel" for="4digits">
        Welcome to the Bull & Cow, in this game you should guess the hidden
        number. You have a limited number of attempts ({10 - attempts}) . With
        each failed attempt, you will have a hint: nB for the number of right
        number a the right place and nC for a number present but at the wrong
        position. Each position contains a number different so no need to use
        the same number many times and the range of number goes from 1 to 9.
        Here we go you can start to guess :
      </label>
      <div className="inputContainer">
        <input
          type="number"
          id="4digits"
          name="4digits"
          placeholder="your number"
          value={userInput}
          onChange={handleInputChange}
          className={error ? style.error : ""}
          disabled={win}
        />
        <button
          onClick={handleGuessClick}
          disabled={win || !userInput}
          hidden={attempts === 10}
        >
          {!win ? "Guess" : "Found"}
        </button>
        <button onClick={handleReset} hidden={!win}>
          Reset
        </button>
        <button onClick={handleReset} hidden={attempts < 10}>
          Reset
        </button>
      </div>
      {error && <div className={style.errormessage}>{error}</div>}
      {attempts == 10 && (
        <Fragment>
          <Losing />
          {secretNumber !== null && (
            <Solution type="number" solution={secretNumber} />
          )}
        </Fragment>
      )}
      {win && <Winning />}
    </div>
  );
};

export default NumberGame;
