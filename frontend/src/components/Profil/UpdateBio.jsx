import axios from "axios";
import React, { useState } from "react";
import { dateParser } from "../Utils";
import S from "./Profil.module.css";

const UpdateBio = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  function handleChange(e) {
    setBio(e.target.value);
  }

  function handleBio(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/user/${user.id}`;
    const formData = new FormData();
    formData.append("bio", bio);

    axios.put(url, { bio }).then((response) => {
      axios.get(url).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUpdateForm(false);
      });
    });
  }

  if (!user) return null;

  return (
    <>
      <div className="bio-container"></div>
      <div className="bio-update">
        <div className={S.bioWrapper}>
          <h3>Bio</h3>
          {updateForm === false && (
            <>
              <div className={S.bioWrapper2}>
                <p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
                <button
                  className={S.bioButton}
                  onClick={() => setUpdateForm(!updateForm)}
                >
                  Modifier la description
                </button>
              </div>
            </>
          )}
          {updateForm && (
            <>
              <div className={S.bioWrapper2}>
                <textarea
                  type="text"
                  defaultValue={user.bio}
                  onChange={handleChange}
                ></textarea>
                <button className={S.bioButton} onClick={handleBio}>
                  Valider modifications
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <h4> Membre depuis le : {dateParser(user.createdAt)}</h4>
    </>
  );
};

export default UpdateBio;
