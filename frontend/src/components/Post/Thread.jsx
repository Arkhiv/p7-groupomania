import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import AddPostForm from "./AddPostForm";

const Thread = () => {
  const [loadPosts, setLoadPosts] = useState(true);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        setLoadPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="thread-container">
      <AddPostForm reloadPosts={getAllPosts} />
      <ul>
        {!!loadPosts[0] &&
          loadPosts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
