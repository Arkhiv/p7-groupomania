import React, { useEffect, useState } from "react";
import { dateParser } from "../Utils";
import axios from "axios";
import S from "./Post.module.css";
import cx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const AddPostForm = ({ reloadPosts }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [postMessage, setPostMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [file, setFile] = useState(null);
  const [labelText, setLabelText] = useState("Choisir une image");

  const handleNewPost = async () => {
    if (postMessage || postPicture) {
      const url = `${process.env.REACT_APP_API_URL}/api/post/`;
      const postFormData = new FormData();
      postFormData.append("posterId", user.id);
      postFormData.append("message", postMessage);

      if (file) postFormData.append("picture", file);

      await axios.post(url, postFormData).then((response) => {
        cancelPost();
        reloadPosts();
      });
    } else {
      alert("Votre post est vide !");
    }
  };

  function handlePostPicture(e) {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setLabelText(e.target.files[0].name);
  }

  function handlePostMessage(e) {
    setPostMessage(e.target.value);
  }

  const cancelPost = () => {
    setPostMessage("");
    setPostPicture("");
    setFile(null);
  };

  useEffect(() => {});

  return (
    <>
      <div className={S.postFormContainer}>
        <div className={S.postFormWrapper}>
          {user?.picture && (
            <div className={S.userData}>
              <img src={user.picture} alt="user-img" />
            </div>
          )}
          <div className={S.postForm} label="postform">
            <textarea
              aria-labelledby="message"
              name="message"
              id="message"
              placeholder="Partagez avec Groupomania !"
              onChange={handlePostMessage}
            />
            <div className={S.footerForm}>
              <input
                className={S.inputFile}
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg,.png"
                onChange={(e) => handlePostPicture(e)}
              />
              <label className={cx(file && S.selected)} htmlFor="file-upload">
                {labelText}
              </label>
              <div className="btn-post-form-send">
                <button
                  className={S.sendPostForm}
                  onClick={handleNewPost}
                  disabled={!postMessage && !postPicture}
                >
                  Partager !
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={S.postPreview}>
        {postMessage || postPicture ? (
          <div className={S.postPreviewWrapper}>
            <div className={S.leftPreview}>
              <img src={user.picture} alt="user-pic-preview" />
              {postMessage || postPicture ? (
                <button className={S.cancel} onClick={cancelPost}>
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
              ) : null}
            </div>
            <div className={S.rightPreview}>
              <div className={S.headerPreview}>
                <div className="pseudo">
                  <h3>{user.pseudo}</h3>
                </div>
                <span>{dateParser(Date.now())}</span>
              </div>
              <div className={S.messagePreview}>
                <p>{postMessage}</p>
              </div>
              <div className={S.messagePicPreview}>
                <img src={postPicture} alt="" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AddPostForm;
