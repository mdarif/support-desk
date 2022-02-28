import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="lgo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt />
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
