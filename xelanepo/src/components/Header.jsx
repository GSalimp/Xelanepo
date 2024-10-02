// Header component
import { Link } from "react-router-dom";
import './styles/Header.css';

const Header = () => (
    <header className="header">
      <div className="logo">XELANEPO</div>
      <nav>
        <ul>
          <li><Link to="/"><span>Home</span></Link></li>
          <li><Link to="/Search"><span>App</span></Link></li>
        </ul>
      </nav>
    </header>
  );

export { Header };