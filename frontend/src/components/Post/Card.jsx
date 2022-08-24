import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser } from "../Utils";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";

import S from "./Post.module.css";

const Card = ({ post, getAllPosts }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loadUsers, setLoadUsers] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  function handleMessage(e) {
    setMessage(e.target.value);
  }
  const updatePost = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}`;
    const formData = new FormData();
    formData.append("message", message);

    axios.put(url, { message }).then((response) => {
      console.log(response.data);
      setIsUpdating(false);
      getAllPosts();
    });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/`,
      withCredentials: true,
    })
      .then((res) => {
        setLoadUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={S.cardContainer} key={post.id}>
      <div className={S.cardLeft}>
        <img
          src={
            !!loadUsers[0] &&
            loadUsers
              .map((user) => {
                if (user.id.toString() === post.posterId) {
                  return user.picture;
                } else return null;
              })
              .join("")
          }
          alt="poster-pic"
        />
      </div>
      <div className={S.cardRight}>
        <div className={S.cardHeader}>
          <div className="pseudo">
            <h3>
              {!!loadUsers[0] &&
                loadUsers
                  .map((user) => {
                    if (user.id.toString() === post.posterId)
                      return user.pseudo;
                    else return null;
                  })
                  .join("")}
            </h3>
          </div>
          <span>{dateParser(post.createdAt)}</span>
        </div>
        {isUpdating === false && <p>{post.message}</p>}
        {isUpdating && (
          <div className={S.postTextArea}>
            <textarea defaultValue={post.message} onChange={handleMessage} />
          </div>
        )}

        {post.picture && (
          <img src={post.picture} alt="card-pic" className="card-pic"></img>
        )}

        <div className={S.cardFooter}>
          {user.id.toString() === post.posterId && (
            <div className={S.buttonContainer}>
              <button
                className={S.updatePost}
                onClick={() => {
                  isUpdating ? updatePost() : setIsUpdating(!isUpdating);
                }}
              >
                Modifier
              </button>
              <DeleteCard post={post} getAllPosts={getAllPosts} />
            </div>
          )}
          <LikeButton post={post} getAllPosts={getAllPosts} />
        </div>
      </div>
    </div>
  );
};

export default Card;
