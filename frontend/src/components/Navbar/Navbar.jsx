import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";

const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser || null);

  const uid = useContext(UidContext);
  if (!user) return null;
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
                <h5>Bienvenue {localUser.pseudo}</h5>
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
