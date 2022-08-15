import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext.jsx";
import Routes from "./components/Routes/index.jsx";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem("token");
    console.log("ICI", origin, allowedOrigins);
    if (allowedOrigins.includes(origin)) {
      console.log("ici", token);
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

  return (
    <UidContext.Provider value={token}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
