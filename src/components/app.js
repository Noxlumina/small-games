import { h } from "preact";
import { Route, Router } from "preact-router";
import Header from "./header";
import { generateGridCards } from "../services/emoji";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import FairPrice from "../routes/fair_price";
import Motus from "../routes/motus";
import NumberGame from "../routes/bull&cow";
import FlipGame from "../routes/flipgame";
import Tictactoe from "../routes/tictactoe";
import { createHashHistory } from "history";

const App = () => (
  <div id="app">
    <Header />
    <main className="main-content">
      <Router history={createHashHistory()}>
        <Route path="/" component={Home} />
        <Route path="/fairprice" component={FairPrice} />
        <Route path="/motus" component={Motus} />
        <Route path="/bull&cow" component={NumberGame} />
        <Route path="/flipgame" component={FlipGame} cards={generateGridCards()} />
        <Route path="/tictactoe" component={Tictactoe} />
      </Router>
    </main>
  </div>
);

export default App;
