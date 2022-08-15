import React from "react";

const Logout = () => {
  const logout = async () => {
    localStorage.removeItem("token");
    window.location = "/profil";
  };
  return (
    <li onClick={logout}>
      <img src="" alt="LOGOLOGOUT" />
    </li>
  );
};

export default Logout;
