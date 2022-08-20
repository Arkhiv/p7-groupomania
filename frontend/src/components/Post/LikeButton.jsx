import React, { useEffect, useState } from "react";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post.likers.includes(uid))
  })

  return <div>Likeuuuh</div>;
};

export default LikeButton;
