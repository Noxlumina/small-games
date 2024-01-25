import { Fragment, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from "./style.css";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import tresor from "../../assets/images/tresor.png";
import ZoomableImage from "../../components/zoomableImage";
import { getRandomInt } from "../../services/number";
import Losing from "../../components/losing";
import Winning from "../../components/winning";
import Solution from "../../components/solution";

const FairPrice = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [error, setError] = useState("");
  const [lives, setLives] = useState(10);
  const [win, setWin] = useState(false);

  const resetGame = () => {
    setUserInput("");
    setPreviousGuesses([]);
    setError("");
    setLives(5);
    setWin(false);
    generateRandomNumber();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleLives = (input) => {
    if (input !== randomNumber) {
      setLives((prevLives) => prevLives - 1); // Décrémenter le nombre de vies
    } else {
      console.log("win");
      setWin(true);
    }
  };

  const moreOrLess = (input) => {
    return input < randomNumber
    ? "More"
    : "Less";
  }

  const handleFocus = () => {
    setError(""); 
  };

  const handleBlur = () => {
    try {
      const parsedInput = parseInt(userInput, 10);
      if (
        !isNaN(parsedInput) &&
        parsedInput >= 1 &&
        parsedInput <= 1000 &&
        lives > 0
      ) {
        setError("");
      } else if (lives === 0) {
        setError("You have no lives left, Lost!");
      } else {
        setError("Please enter a number between 1 and 1000.");
      }
    } catch (error) {
      console.error("Error parsing input:", error);
      setError("Error parsing input. Please enter a valid number.");
    }
  };

  const handleGuessClick = () => {
    try {
      const parsedInput = parseInt(userInput, 10);
      if (previousGuesses.some((guess) => guess.guess === parsedInput)) {
        setError(
          `${parsedInput} has already been guessed. Try a different number.\n`
        );
        return;
      }
      if (
        !isNaN(parsedInput) &&
        parsedInput >= 1 &&
        parsedInput <= 1000 &&
        lives > 0
      ) {
        const guessRelation =
          parsedInput === randomNumber
            ? "You found it !!"
            : moreOrLess(parsedInput);
        setPreviousGuesses((prevGuesses) => [
          ...prevGuesses,
          { guess: parsedInput, relation: guessRelation },
        ]);
        setError("");
        handleLives(parsedInput);
      } else if (lives === 0) {
        setError("You have no lives left, Lost!");
      } else {
        setError("Please enter a number between 1 and 1000.");
      }
    } catch (error) {
      console.error("Error parsing input:", error);
      setError("Error parsing input. Please enter a valid number.");
    }
  };

  const generateRandomNumber = () => {
    try {
      const randomNum = getRandomInt(1000);
      setRandomNumber(randomNum);
    } catch (error) {
      console.error("Error generating random number:", error);
    }
  };

  useEffect(() => {
    try {
      generateRandomNumber();
      return () => {};
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);

  return (
    <div className="center-page">
      <label className="centerLabel" for="price">
        Welcome to the Fair price, in this game you should guess the hidden
        price. You have a limited number of lives ({lives}). With each failed
        attempt, you will have a hint <b>less</b> or <b>more</b>. Here we go you
        can start to guess :
      </label>
      <div className="inputContainer">
        <input
          type="number"
          id="price"
          name="price"
          placeholder="your proposition"
          value={userInput}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={error ? style.error : ""}
          disabled={win}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleGuessClick();
            }
          }}
        />
        <button onClick={handleGuessClick} disabled={win}>
          {!win ? "Guess" : "Found"}
        </button>
      </div>
      {error && <div className={style.errormessage}>{error}</div>}
      {lives == 0 && <Losing />}
      {win && (
        <Fragment>
          <Winning />
          <ZoomableImage src={tresor} />
        </Fragment>
      )}
      {previousGuesses.length > 0 && (
        <div>
          <p>Previous guesses:</p>
          <ul>
            {previousGuesses.map((guess, index) => (
              <li key={index}>
                {guess.guess} -{" "}
                {guess.relation === "You found it !!" ? (
                  <FaThumbsUp color="green" style={{ marginRight: "5px" }} />
                ) : (
                  <FaThumbsDown color="red" style={{ marginRight: "5px" }} />
                )}
                {guess.relation}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        Lives number: {lives}
        {lives != 0 ? (
          <FaHeart style={{ fontSize: "2em", margin: "0 5px" }} />
        ) : (
          ""
        )}
      </div>
      {win || lives === 0 ? (
        <div>
          {randomNumber !== null && (
            <Solution type="number" solution={randomNumber} />
          )}
          <button onClick={resetGame}>Reset Game</button>
        </div>
      ) : null}
    </div>
  );
};

export default FairPrice;
