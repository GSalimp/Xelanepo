// Header component
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Search">Search</Link></li>
                <li><Link to="/Profile/1">Profile</Link></li>
            </ul>
        </nav>
    );
}

export { Header };