import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Thread from "../components/Post/Thread";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <Thread />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Home;
