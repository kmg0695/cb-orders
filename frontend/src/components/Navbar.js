import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ click }) {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="navbar_logo">
          <h2>CB Orders</h2>
        </Link>
      </div>
      <ul className="navbar_links">
        <li>
          <Link to="/cart" className="cart_link">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="http://localhost:5002">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}
