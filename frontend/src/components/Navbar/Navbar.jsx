import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="" alt="" />
              <h3>Groupomania Network</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue'VALEUR DYNAMIQUE REDUX</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/profil"></NavLink>
              <img src="" alt="LOGOUTLOGO" />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
