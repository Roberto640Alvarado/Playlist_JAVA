import React from "react";
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../routers/PrivateRoutes';

import Login from "../pages/Login";
import AllPlaylist from "../pages/AllPlaylist";
import Allsongs from "../pages/Allsongs";
import Register from "../pages/Register";
import CreatePlaylist from "../pages/CreatePlaylist";
import { Navbar } from "../components/Navbar";
import PlaylistDetails from "../pages/PlaylistDetails";

const MainContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allsongs" element={<PrivateRoute path="/allsongs" element={<Allsongs />} />} />
        <Route path="/createplaylist" element={<PrivateRoute path="/createplaylist" element={<CreatePlaylist />} />} />
        <Route path="/allplaylist" element={<MainContainer><AllPlaylist /></MainContainer>} />
        <Route path="/playlist/:code" element={<MainContainer><PlaylistDetails /></MainContainer>} />
      </Routes>
    </div>
  );
};

export default AppRouter;
