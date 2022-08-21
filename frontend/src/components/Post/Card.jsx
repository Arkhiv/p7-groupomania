import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [loadUsers, setLoadUsers] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState(null);

  function handleMessage(e) {
    setMessage(e.target.value);
  }
  const updatePost = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}`;
    const formData = new FormData();
    formData.append("message", message);

    axios.put(url, formData).then((response) => {
      console.log(response.data);
    });
    setIsUpdated(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/`,
      withCredentials: true,
    })
      .then((res) => {
        setLoadUsers(false);
      })
      .catch((err) => console.log(err));
  }, [loadUsers]);

  return (
    <>
      <li className="card-container" key={post.id}>
        CARD
      </li>
      <></>
      <div className="card-left">
        <img
          src={
            !!loadUsers[0] &&
            loadUsers
              .map((user) => {
                if (user.id === post.posterId) return user.picture;
                else return null;
              })
              .join("")
          }
          alt="poster-pic"
        />
      </div>
      <div className="card-right">
        <div className="card-header">
          <div className="pseudo">
            <h3>
              {!!loadUsers[0] &&
                loadUsers
                  .map((user) => {
                    if (user.id === post.posterId) return user.pseudo;
                    else return null;
                  })
                  .join("")}
            </h3>
          </div>
          <span>{dateParser(post.createdAt)}</span>
        </div>
        {isUpdated === false && <p>{post.message}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea defaultValue={post.message} onChange={handleMessage} />
            <div className="button-container">
              <button className="btn" onClick={updatePost}>
                Valider la modification
              </button>
            </div>
          </div>
        )}

        {post.picture && (
          <img src={post.picture} alt="card-pic" className="card-pic"></img>
        )}
        {loadUsers.id === post.posterId && (
          <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
              <i>BTNUPDATEPOST</i>
            </div>
            <DeleteCard id={post.id} />
          </div>
        )}
        <div className="card-footer">
          <LikeButton post={post} />
        </div>
      </div>
    </>
  );
};

export default Card;
