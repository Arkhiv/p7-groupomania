import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(false);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.token && res.data.userId) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          window.location = "/";
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setLoginError(true);
        }
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {loginError && <div className="">Email ou Mot de passe incorrect!</div>}
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
