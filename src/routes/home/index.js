import { h } from "preact";
import { route } from "preact-router";
import style from "./style.css";

const Home = () => {


  return (
    <div className={style.home}>
      <div className={style.head}>
        <h2>Choose a game</h2>
      </div>
      <button
        className={style.button}
        onClick={() => {
          route("/fairprice");
        }}
      >
        Go to the "Fair price"
      </button>
      <button
        className={style.button}
        onClick={() => {
          route("/motus");
        }}
      >
        Go to "Motus"
      </button>
      <button
        className={style.button}
        onClick={() => {
          route("/bull&cow");
        }}
      >
        Go to "Bull & Cow"
      </button>
      <button
        className={style.button}
        onClick={() => {
          route("/flipgame");
        }}
      >
        Go to "Flip the cards"
      </button>
      <button
        className={style.button}
        onClick={() => {
          route("/tictactoe");
        }}
      >
        Go to "Tic Tac Toe"
      </button>
    </div>
  );
};

export default Home;
