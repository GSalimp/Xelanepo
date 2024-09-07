// Header component
import { Link } from "react-router-dom";
import './styles/Header.css';

const Header = () => (
    <header className="header">
      <div className="logo">XELANEPO</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/Search">App</a></li>
        </ul>
      </nav>
    </header>
  );

export { Header };