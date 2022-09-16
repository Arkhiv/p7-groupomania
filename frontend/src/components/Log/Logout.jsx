import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    window.location = "/profil";
  };
  return (
    <li onClick={logout}>
      <FontAwesomeIcon icon={faSignOut} />
    </li>
  );
};

export default Logout;
