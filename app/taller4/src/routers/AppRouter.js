import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/allsongs"
            element={
              <MainContainer>
                <Allsongs />
              </MainContainer>
            }
          />
          <Route
            path="/createplaylist"
            element={
              <MainContainer>
                <CreatePlaylist />
              </MainContainer>
            }
          />
          <Route
            path="/allplaylist"
            element={
              <MainContainer>
                <AllPlaylist />
              </MainContainer>
            }
          />
          <Route
            path="/playlist/:code"
            element={
              <MainContainer>
                <PlaylistDetails />
              </MainContainer>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
