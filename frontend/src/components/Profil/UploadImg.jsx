import React, { useState } from "react";
import axios from "axios";
import S from "./Profil.module.css";
import cx from "classnames";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [labelText, setLabelText] = useState("Choisir une image");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleChange(event) {
    setFile(event.target.files[0]);
    setLabelText(event.target.files[0].name);
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
    <>
      <form
        action=""
        onSubmit={handlePicture}
        className={S.formUploadPic}
        encType="multipart/form-data"
      >
        <input
          className={S.inputFile}
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        />
        <label className={cx(file && S.selected)} htmlFor="file">
          {labelText}
        </label>
        <br />
        <button type="submit">Envoyer !</button>
      </form>
    </>
  );
};

export default UploadImg;
