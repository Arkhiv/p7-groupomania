import React, { useState } from "react";
import axios from "axios";
import S from "./Log.module.css";

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

          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/api/user/${res.data.userId}`,
            withCredentials: true,
          })
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => console.log(err));
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
    <form
      className={S.signInForm}
      action=""
      onSubmit={handleLogin}
      id="sign-up-form"
    >
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
      {loginError && (
        <div className={S.signInError}>Email ou Mot de passe incorrect!</div>
      )}
      <br />
      <button type="submit" value="Se connecter">
        Se connecter
      </button>
    </form>
  );
};

export default SignInForm;
