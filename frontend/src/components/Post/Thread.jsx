import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Thread = () => {
  const [loadPosts, setLoadPosts] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        setLoadPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [loadPosts]);

  return (
    <div className="thread-container">
      <ul>
        {!!loadPosts[0] &&
          loadPosts.map((post) => {
            return <Card post={loadPosts} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
