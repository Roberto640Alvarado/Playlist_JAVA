import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import AllPlaylist from "../pages/AllPlaylist";
import Allsongs from "../pages/Allsongs";



export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/allplaylist" element={<AllPlaylist />} />
          <Route path="/allsongs" element={<Allsongs/>} />
        </Routes>
      </div>
    </Router>
  );
};