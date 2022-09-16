import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import UploadImg from "./UploadImg";
import { NavLink } from "react-router-dom";
import UpdateBio from "./UpdateBio";
import S from "./Profil.module.css";

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
    <div className={S.profilUpdateContainer}>
      {uid ? (
        <>
          <h1>
            Profil de<p>{"" + user.pseudo}</p>
          </h1>
          <div className={S.updateContainer}>
            <div className={S.pictureContainer}>
              <h3>Photo de profil</h3>
              <div className={S.pictureWrapper}>
                {user?.picture && <img src={user.picture} alt="PROFILPIC" />}
              </div>
              <UploadImg />
            </div>
            <div className={S.bioContainer}>
              <UpdateBio />
            </div>
          </div>
        </>
      ) : (
        <NavLink to="/profil"></NavLink>
      )}
    </div>
  );
};

export default UpdateProfil;
