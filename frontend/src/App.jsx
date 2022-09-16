import React, { useState, useEffect } from "react";
import { UidContext } from "./components/AppContext.jsx";
import Routes from "./components/Routes/index.jsx";
import axios from "axios";

// FA
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
library.add(faSignOut);
//

const apiUrl = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const App = () => {
  const jwt = localStorage.getItem("token");
  const [token, setToken] = useState(jwt || null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        withCredentials: true,
      })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <UidContext.Provider value={token}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
