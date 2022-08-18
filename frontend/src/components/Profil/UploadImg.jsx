import React, { useState } from "react";
import axios from "axios";

const UploadImg = () => {
  const [file, setFile] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handlePicture(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/user/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", user.pseudo);
    formData.append("userId", user.id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <form
      action=""
      onSubmit={handlePicture}
      className="upload-pic"
      encType="multipart/form-data"
    >
      <label htmlFor="file">Modifier l'image de profil</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
