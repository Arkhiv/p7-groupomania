import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";
import S from "./Navbar.module.css";
import logo from "../../assets/img/groupomaniaSvg.svg";

const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser || null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).id !== localUser.id) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [JSON.parse(localStorage.getItem("user")), setUser]);

  const uid = useContext(UidContext);
  if (!user) return null;
  return (
    <nav className={S.navContainer}>
      <div className={S.navBlock}>
        <NavLink exact to="/">
          <img className="logo" src={logo} alt="" />
        </NavLink>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {localUser.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
