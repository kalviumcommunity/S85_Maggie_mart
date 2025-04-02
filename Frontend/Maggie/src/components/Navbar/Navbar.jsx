import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you have a CSS file for styling

function Navbar() {
  //const navigate = useNavigate();

  // Example function to handle notifications
  const handleNotifications = () => {
    // Implement logic to show notifications
    console.log("Notifications clicked");
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Home
        </Link>
      </div>  
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/sell" className="btn btn-ghost">
              Sell
            </Link>
          </li>
          <li>
            <Link to="/orders" className="btn btn-ghost">
              Orders
            </Link>
          </li>
          <li>
            <button onClick={handleNotifications} className="btn btn-ghost">
              Notifications
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
