import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import S from "./Log.module.css";

const Log = (props) => {
  const [isSignUpModal, setIsSignUpModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setIsSignUpModal(true);
    } else if (e.target.id === "login") {
      setIsSignUpModal(false);
    }
  };

  return (
    <div className={S.connectionForm}>
      <div className={S.formContainer}>
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={isSignUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={!isSignUpModal ? "active-btn" : null}
          >
            Connexion
          </li>
        </ul>
        {isSignUpModal && <SignUpForm />}
        {!isSignUpModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
