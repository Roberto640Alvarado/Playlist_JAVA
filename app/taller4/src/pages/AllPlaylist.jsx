import React, { useState, useEffect } from 'react';
import Playlist from '../components/Playlist';
import AppServices from "../services/AppServices";
import context from '../context/UserContext';
import Buttons from '../components/Buttons';

const AllPlaylist = () => {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    let token = context.getToken();
    let response = await AppServices.findAllPlaylistsByUser(token, 0, 5);

    if (!response.error) {
      let data = response.content;
      setPlaylists(data);
    }

  };

  return (

    <>
      <div>
        <h1 className="text-4xl font-bold m-4">Todas las Playlist</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar canciones"
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div >
        <div className='grid grid-cols-3 px-32'>
        {playlists.map((post) => {
          return (
            <Playlist
              key={post.code}
              code={post.code}
              title={post.title}
              description={post.description}
            />
          );
        })}
        </div>
      </div>
      <Buttons />
    </>

  );
};

export default AllPlaylist;
