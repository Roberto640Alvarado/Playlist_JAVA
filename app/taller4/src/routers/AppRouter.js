import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import AllPlaylist from "../pages/AllPlaylist";
import Allsongs from "../pages/Allsongs";
import Register from "../pages/Register";
import CreatePlaylist from "../pages/CreatePlaylist";
import { Navbar } from "../components/Navbar";
import PlaylistDetails from "../pages/PlaylistDetails";

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allplaylist" element={<AllPlaylist />} />
          <Route path="/allsongs" element={<Allsongs/>} />
          <Route path="/createplaylist" element={<CreatePlaylist/>} />
          <Route path="/playlist/:code" element={<PlaylistDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;