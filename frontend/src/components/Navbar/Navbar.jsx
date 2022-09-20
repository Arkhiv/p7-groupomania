import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Log/Logout";
import S from "./Navbar.module.css";
import logo from "../../assets/img/groupomaniaSvg.svg";

const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser || null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))?.id !== localUser?.id) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [localUser?.id, setUser]);

  if (!user) return null;
  return (
    <nav className={S.navContainer}>
      <div className={S.navBlock}>
        <NavLink to="/">
          <h1>
            <img className="logo" src={logo} alt="groupomania-logo" />
          </h1>
        </NavLink>

        <ul>
          <li className="welcome">
            <NavLink to="/profil">
              <h2>Bienvenue {user.pseudo}</h2>
            </NavLink>
          </li>
          <Logout />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
