import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import S from "./Post.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ post, getAllPosts }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);

  const like = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}/like`;

    axios.put(url, { likerId: uid }).then(() => {
      getAllPosts();
    });
  };
  const unlike = () => {};

  useEffect(() => {
    const likers = post.likers || [];

    if (likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className={S.likeButton}>
      {uid && liked && (
        <FontAwesomeIcon icon={faHeart} color="green"></FontAwesomeIcon>
      )}
      {uid && liked === false && (
        <FontAwesomeIcon icon={faHeartBroken} onClick={like}></FontAwesomeIcon>
      )}
      <span>{post.likers?.length}</span>
    </div>
  );
};

export default LikeButton;
