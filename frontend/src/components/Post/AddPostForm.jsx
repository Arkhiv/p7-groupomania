import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { dateParser } from "../Utils";
import axios from "axios";

const AddPostForm = ({ reloadPosts }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [postMessage, setPostMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [file, setFile] = useState(null);

  const handleNewPost = async () => {
    console.log(postMessage, postPicture);
    if (postMessage || postPicture) {
      const url = `${process.env.REACT_APP_API_URL}/api/post/`;
      const postFormData = new FormData();
      postFormData.append("posterId", user.id);
      postFormData.append("message", postMessage);

      if (file) postFormData.append("picture", file);

      await axios.post(url, postFormData).then((response) => {
        console.log(response.data);
        cancelPost();
        reloadPosts();
      });
    } else {
      alert("Votre post est vide !");
    }
  };

  function handlePostPicture(e) {
    console.log(e.target.files[0]);
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  function handlePostMessage(e) {
    console.log(e);
    setPostMessage(e.target.value);
  }

  const cancelPost = () => {
    setPostMessage("");
    setPostPicture("");
    setFile(null);
  };

  useEffect(() => {});

  return (
    <div className="post-form-container">
      <div className="user-data">
        <NavLink exact to="/profil">
          <div className="user-info">
            <img src={user.picture} alt="user-img" />
          </div>
        </NavLink>
        <div className="post-form">
          <textarea
            name="message"
            id="message"
            placeholder="Partagez avec Groupomania !"
            onChange={handlePostMessage}
          />
          {postMessage || postPicture ? (
            <li className="post-preview">
              <div className="left-preview">
                <img src={user.picture} alt="user-pic-preview" />
              </div>
              <div className="right-preview">
                <div className="header-preview">
                  <div className="pseudo">
                    <h3>{user.pseudo}</h3>
                  </div>
                  <span>{dateParser(Date.now())}</span>
                </div>
                <div className="message-preview">
                  <p>{postMessage}</p>
                  <img src={postPicture} alt="" />
                </div>
              </div>
            </li>
          ) : null}
          <div className="footer-form">
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg,.png"
              onChange={(e) => handlePostPicture(e)}
            />
            <div className="btn-post-form-send">
              {postMessage || postPicture ? (
                <button className="cancel" onClick={cancelPost}>
                  Annuler
                </button>
              ) : null}

              <button
                className="send"
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
  );
};

export default AddPostForm;
