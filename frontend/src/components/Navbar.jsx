import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>KnowXchange</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-skills">My Skills</Link>
        <Link to="/find-skills">Find Skills</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;