import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import S from "./Post.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ post, getAllPosts }) => {
  const [liked, setLiked] = useState(false);
  const localUserId = JSON.parse(localStorage.getItem("userId"));

  const like = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}/like`;

    axios.put(url, { likerId: localUserId }).then(() => {
      getAllPosts();
    });
  };

  useEffect(() => {
    const likers = post.likers || [];

    if (likers.includes(localUserId)) setLiked(true);
    else setLiked(false);
  }, [localUserId, post.likers, liked]);

  return (
    <div className={S.likeButton}>
      {localUserId && liked && (
        <FontAwesomeIcon icon={faHeart} color="#FD2D01"></FontAwesomeIcon>
      )}
      {localUserId && liked === false && (
        <FontAwesomeIcon icon={faHeart} onClick={like}></FontAwesomeIcon>
      )}
      <span>{post.likers?.length}</span>
    </div>
  );
};

export default LikeButton;
