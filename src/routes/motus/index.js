import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from "./style.css";
import { generate } from "random-words";
import { FaHeart } from "react-icons/fa";
import {
  containsSpecialCharacters,
  returnMaskedWord,
} from "../../services/regex";
import Losing from "../../components/losing";
import Winning from "../../components/winning";
import Solution from "../../components/solution";


const Motus = () => {
  let myWord = generate({ minLength: 4, maxLength: 10000 });
  const [secretWord, setSecretWord] = useState(myWord || "error");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [maskedWordList, setMaskedWordList] = useState([]);
  const [lives, setLives] = useState(5);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setMaskedWord(secretWord[0] + "?".repeat(secretWord.length - 1));
    console.log(secretWord);
  }, [secretWord]);

  const resetGame = () => {
    try {
        setMaskedWordList([]);
        myWord = generate({ minLength: 4, maxLength: 10000 });
        setSecretWord(myWord);
        setWin(false);
        setLives(5);
        setUserInput("");
    } catch (error) {
        console.error("Error generating random word:", error);
    }
};


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const updateMaskedWord = (secretWord, userInput) => {
    try {
        setMaskedWord(returnMaskedWord(secretWord, userInput));
    } catch (error) {
        console.error("Error updating masked word:", error);
    }
};


  const startGame = () => {
    if (userInput.toLowerCase() == secretWord) {
      updateMaskedWord(secretWord, userInput);
      setMaskedWordList((prevList) => [...prevList, maskedWord]);
      setWin(true);
      setFeedback("Congratulations! You guessed the word.");
    } else if (containsSpecialCharacters(userInput)) {
      setFeedback(
        "Incorrect. Your guess should not contain numbers or special characters."
      );
    } else if (userInput.length !== secretWord.length) {
      setFeedback(
        "Incorrect. Your guess should have the exact number of letters."
      );
    } else if (lives > 1) {
      setFeedback("Incorrect. Try again!");
      setLives((prevLives) => prevLives - 1); // Décrémenter le nombre de vies
      updateMaskedWord(secretWord, userInput);
      setMaskedWordList((prevList) => [...prevList, maskedWord]);
    } else {
      setFeedback("");
      setLives((prevLives) => prevLives - 1); // Décrémenter le nombre de vies
      updateMaskedWord(secretWord, userInput);
      setMaskedWordList((prevList) => [...prevList, maskedWord]);
    }
  };

  const renderScrabbleTiles = (word) => {
    return word.split("").map((letter, index) => (
      <span class={style.scrabbletile} key={index}>
        {letter.toUpperCase()}
      </span>
    ));
  };

  return (
    <div className="center-page">
      <h1>Welcome to Motus!</h1>
      <p>Try to guess the secret word.</p>
      <label for="word">Enter your guess: </label>
      <div className="inputContainer">
        <input
          type="text"
          id="word"
          name="word"
          placeholder="guess the word"
          value={userInput}
          onInput={handleInputChange}
          disabled={win || !lives}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              startGame();
            }
          }}
        />
        <button onClick={startGame} disabled={win || !lives}>
          Start
        </button>
      </div>
      {lives == 0 && <Losing />}
      {win && <Winning />}
      {feedback && <p>{feedback}</p>}
      <div className={style.scrabbletilecontainer}>
        {maskedWordList.map((word, index) => (
          <div key={index}>{renderScrabbleTiles(word)}</div>
        ))}
      </div>
      <div className={style.scrabbletilecontainer}>
        {renderScrabbleTiles(maskedWord)}
      </div>
      <div>
        Live number:{" "}
        {[...Array(lives)].map((_, index) => (
          <FaHeart
            key={index}
            style={{ fontSize: "2em", marginRight: "5px" }}
          />
        ))}
        {lives === 0 && "0"}
      </div>
      {win || lives === 0 ? (
        <div>
          {secretWord !== null && (
            <Solution type="word" solution={secretWord} />
          )}
          <button onClick={resetGame}>Reset Game</button>
        </div>
      ) : null}
    </div>
  );
};

export default Motus;
