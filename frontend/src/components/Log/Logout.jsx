import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const logout = async () => {
    localStorage.removeItem("token");
    window.location = "/profil";
  };
  return (
    <li onClick={logout}>
      <FontAwesomeIcon icon={faSignOut} color="black" />
    </li>
  );
};

export default Logout;
