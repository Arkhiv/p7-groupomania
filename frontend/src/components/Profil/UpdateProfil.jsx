import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import UploadImg from "./UploadImg";
import { NavLink } from "react-router-dom";
import UpdateBio from "./UpdateBio";

const UpdateProfil = () => {
  const localUser = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const uid = useContext(UidContext);
  if (!user) return null;

  return (
    <div>
      {uid ? (
        <>
          <h1>Profil de {user.pseudo}</h1>
          <div className="update-container">
            <div className="picture-container">
              <h3>Photo de profil</h3>
              <img src={user.picture} alt="PROFILPIC" />
              <UploadImg />
            </div>
            <div className="bio-component">
              <UpdateBio />
            </div>
          </div>
        </>
      ) : (
        <NavLink exact to="/profil"></NavLink>
      )}
    </div>
  );
};

export default UpdateProfil;
