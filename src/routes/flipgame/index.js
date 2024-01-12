import { useState } from "preact/hooks";
import Card from "../../components/card";
import style from "./style";

const FlipGame = ({ cards }) => {
  const [flippedCards, setFlippedCards] = useState({ first: {}, second: {} });
  const [isMatched, setIsMatched] = useState({});
  const [score, setScore] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);

  const getCardFlipStatus = ({ key, emoji }) => {
    if (isMatched[emoji]) {
      return "MATCHED";
    }

    if ([flippedCards.first.key, flippedCards.second.key].includes(key)) {
      return "FLIPPED";
    }

    return "DEFAULT";
  };

  const createCardClickListener = (card) => () => {
    flipCard(card);
  };

  const flipCard = (card) => {
    const isFirstFlippedCard = Object.keys(flippedCards.first).length === 0;
    if (isFirstFlippedCard) {
      setFlippedCards({ ...flippedCards, first: card });
      return;
    }

    flipSecondCard(card);
  };

  const flipSecondCard = (card) => {
    // Flip the second and then check after 500 ms whether it's a match
    // or mismatch and handle it
    setFlippedCards({ ...flippedCards, second: card });
    setTimeout(() => {
      if (flippedCards.first.emoji === card.emoji) {
        // it's a match
        setScore((prevScore) => prevScore + 1);
        setIsMatched({ ...isMatched, [card.emoji]: true });
        if (score === 5) {
          handleWin();
        }
      }

      // it's a mismatch, so flip the cards back
      setFlippedCards({ first: {}, second: {} });
    }, 500);
  };

  const handleWin = () => {
    setShowWinMessage(true);
  };

  return (
    <div className={style.game}>
      <header className={style.score}>Score: {score}</header>
      <div className={style.grid}>
        {cards.map((card, index) => (
          <Card
            key={index}
            hiddenValue={card.emoji}
            flipStatus={getCardFlipStatus(card)}
            onClick={createCardClickListener(card)}
          />
        ))}
      </div>
      {showWinMessage && (
        <div className={`${style.winMessage} ${showWinMessage ? style.show : ""}`}>
          You Win! Congratulations!
        </div>
      )}
    </div>
  );
};

export default FlipGame;
