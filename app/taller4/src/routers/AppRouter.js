import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import AllPlaylist from "../pages/AllPlaylist";
import Allsongs from "../pages/Allsongs";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allplaylist" element={<AllPlaylist />} />
            <Route path="/allsongs" element={<Allsongs />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;