import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar/Navbar";

const index = () => (
  <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/profil" element={<Profil />}></Route>
      <Route path="/" element={<Navigate replace to="/" />} />
    </Routes>
  </Router>
);

export default index;
