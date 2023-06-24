import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import AllPlaylist from "../pages/AllPlaylist";


export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/allplaylist" element={<AllPlaylist />} />
        </Routes>
      </div>
    </Router>
  );
};