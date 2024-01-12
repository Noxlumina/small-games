import { useState, useEffect } from "preact/hooks";
import style from "./style.css";

const Tictactoe = () => {
  const initialPlateau = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const initialState = {
    plateau: initialPlateau,
    user: "",
    joueur1: "Player 1",
    joueur2: "Player 2",
    win: 0,
    tour: 1,
    mark: "",
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    definirNomJoueur();
  }, []);

  useEffect(() => {
    if (state.tour % 2 === 0) {
      setState((prev) => ({
        ...prev,
        user: state.joueur2 || "Player 2",
        mark: "X",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        user: state.joueur1 || "Player 1",
        mark: "O",
      }));
    }
  }, [state.tour]);

  const definirNomJoueur = () => {
    setState((prev) => ({
      ...prev,
      joueur1: prompt("Name of player 1 : "),
      joueur2: prompt("Name of player 2 : "),
    }));
  };

  const conditionwin = () => {
    const checkWin = (a, b, c) =>
      a === state.mark && b === state.mark && c === state.mark;

    const isEquality = () => {
      const plateauRempli = state.plateau.every((row) =>
        row.every((cell) => cell !== "")
      );
      return plateauRempli && state.win !== 1;
    };

    for (let i = 0; i < 3; i++) {
      if (
        checkWin(
          state.plateau[i][0],
          state.plateau[i][1],
          state.plateau[i][2]
        ) ||
        checkWin(state.plateau[0][i], state.plateau[1][i], state.plateau[2][i])
      ) {
        setState((prev) => ({ ...prev, win: 1 }));
        alert(`${state.user} won !`);
        return;
      }
    }

    if (
      checkWin(state.plateau[0][0], state.plateau[1][1], state.plateau[2][2]) ||
      checkWin(state.plateau[0][2], state.plateau[1][1], state.plateau[2][0])
    ) {
      setState((prev) => ({ ...prev, win: 1 }));
      alert(`${state.user} won !`);
      return;
    }

    if (isEquality()) {
      setState(prev => ({ ...prev, gagne: 2 }));
      alert("Equality !");
    }
  };

  const changementTour = () => {
    console.table(state.plateau);
    console.log(`turn : ${state.tour}`);
  };

  const tourJoueur = (row, col) => {
    if (state.win === 1) {
      return;
    }
    if (state.plateau[row][col] === "") {
      const newPlateau = [...state.plateau];
      newPlateau[row][col] = state.mark;
      setState((prev) => ({
        ...prev,
        plateau: newPlateau,
        tour: prev.tour + 1,
      }));
      conditionwin();
    }
  };

  const renderPlateau = () => (
    <div className={style.grid}>
      {state.plateau.map((row, rowIndex) => (
        <div key={rowIndex} className={style.row}>
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              id={`case${rowIndex}${colIndex}`}
              className={`${style.cell} ${style.customButton}`}
              onClick={() => tourJoueur(rowIndex, colIndex)}
              disabled={cell !== ""}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  const handleButtonClick = () => {
    changementTour();
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <div className="center-page">
      <h1>Tic Tac Toe</h1>
      {renderPlateau()}
      {/* <button onClick={handleButtonClick} disabled={state.win === 1}>
        {state.win === 1 ? "Partie terminée" : "Continuer"}
      </button> */}
      <button onClick={reset}>Réinitialiser</button>
    </div>
  );
};

export default Tictactoe;
