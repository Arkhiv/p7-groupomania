import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import S from "../components/Profil/Profil.module.css";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className={S.profilPage}>
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className={S.logContainer}>
          <Log signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
