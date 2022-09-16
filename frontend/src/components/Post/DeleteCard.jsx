import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import S from "./Post.module.css";

const DeleteCard = ({ post, getAllPosts }) => {
  const deletePost = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}`;

    axios.delete(url).then((response) => {
      getAllPosts();
    });
  };
  return (
    <div
      className={S.deletePost}
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce Post ?")) {
          deletePost();
        }
      }}
    >
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

export default DeleteCard;
