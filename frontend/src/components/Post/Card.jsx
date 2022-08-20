import React, { useEffect, useState } from "react";
import axios from "axios";
import { dateParser } from "../Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [loadUsers, setLoadUsers] = useState(true);

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
                  })
                  .join("")}
            </h3>
          </div>
          <span>{dateParser(post.createdAt)}</span>
        </div>
        <p>{post.message}</p>
        {post.picture && (
          <img src={post.picture} alt="card-pic" className="card-pic"></img>
        )}
        <div className="card-footer">
          <LikeButton post={post} />
        </div>
      </div>
    </>
  );
};

export default Card;
