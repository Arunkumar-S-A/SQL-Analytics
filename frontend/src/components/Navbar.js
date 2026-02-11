import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">SQL Analytics Engine</h2>

      <div className="links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/trends">Trends</NavLink>
        <NavLink to="/categories">Categories</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
