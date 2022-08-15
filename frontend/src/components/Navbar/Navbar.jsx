import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

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
                <h5>Bienvenue {user.pseudo}</h5>
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
