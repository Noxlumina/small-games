import { Link } from 'preact-router/match';
import style from './style.css';
import { h } from 'preact';


const Header = () => (
	<header className={style.header}>
		<a href="/" className={style.logo}>
			<img src="../../assets/preact-logo-inverse.svg" alt="Preact Logo" height="32" width="32" />
			<h1>Small Games App</h1>
		</a>
		<nav>
			<Link activeClassName={style.active} href="/">
				Home
			</Link>
		</nav>
	</header>
);

export default Header;
