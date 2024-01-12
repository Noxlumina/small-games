import { h } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import {generateGridCards} from "../services/emoji"

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import FairPrice from '../routes/fair_price';
import Motus from '../routes/motus';
import NumberGame from '../routes/bull&cow';
import FlipGame from '../routes/flipgame';
import Tictactoe from '../routes/tictactoe';


const App = () => (
	<div id="app">
		<Header />
		<main className='main-content'>
			<Router>
				<Home path="/" />
				<FairPrice path="/fairprice" />
				<Motus path="/motus" />
				<NumberGame path="/bull&cow" />
				<FlipGame path="/flipgame" cards={generateGridCards()}/>
				<Tictactoe path="/tictactoe" />
			</Router>
		</main>
	</div>
);

export default App;
