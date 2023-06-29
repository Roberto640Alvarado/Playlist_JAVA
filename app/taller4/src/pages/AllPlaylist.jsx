import React, { useState, useEffect } from 'react';
import Playlist from '../components/Playlist';
import AppServices from "../services/AppServices";
import context from '../context/UserContext';

const AllPlaylist = () => {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    let token = context.getToken();
    console.log(token);
    let response = await AppServices.findAllPlaylistsByUser(token, 0, 5);
    console.log(response);

    if (!response.error) {
      let data = response.content;
      setPlaylists(data);
    }

  };



  return (

    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Todas las Playlist</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar canciones"
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
        {playlists.map((post) => {
          return (
            <Playlist
              key={post._id}
              isMainView={true}
              code={post._id}
              title={post.title}
              description={post.description}
            />
          );
        })}
      </div>
    </>

  );
};

export default AllPlaylist;
