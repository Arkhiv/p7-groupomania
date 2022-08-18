import axios from "axios";
import React, { useState } from "react";
import { dateParser } from "../Utils";

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
    formData.append("userId", user.id);

    axios.put(url, formData).then((response) => {
      console.log(response.data);
    });
  }

  if (!user) return null;

  return (
    <>
      <div className="bio-container"></div>
      <div className="bio-update">
        <h3>Bio</h3>
        {updateForm === false && (
          <>
            <p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
            <button onClick={() => setUpdateForm(!updateForm)}>
              Modifier la description
            </button>
          </>
        )}
        {updateForm && (
          <>
            <textarea
              type="text"
              defaultValue={user.bio}
              onChange={handleChange}
            ></textarea>
            <button onClick={handleBio}>Valider modifications</button>
          </>
        )}
      </div>
      <h4> Membre depuis le : {dateParser(user.createdAt)}</h4>
    </>
  );
};

export default UpdateBio;
