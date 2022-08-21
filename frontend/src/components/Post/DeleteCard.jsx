import React from "react";
import axios from "axios";

const DeleteCard = ({ post }) => {
  const deletePost = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/post/${post.id}`;

    axios.delete(url).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce Post ?")) {
          deletePost();
        }
      }}
    >
      <p>ICONEDELETEPOST</p>
    </div>
  );
};

export default DeleteCard;
