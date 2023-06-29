import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import AppServices from '../services/AppServices';
import context from '../context/UserContext';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchAllSongs();
  }, []);

  const fetchAllSongs = async () => {
    let token = context.getToken();
    console.log(token);
    let response = await AppServices.fetchAllSongs(token, 0, 5);
    console.log(response);
    

    if (!response.error) {
      let data = response;
      setSongs(data);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4 mt-4">Todas las Canciones</h1>
      {songs && songs.map((post) => (
        <SongCard
          key={post._id}
          isMainView={true}
          code={post._id}
          title={post.title}
          duration={post.duration}
        />
      ))}
    </div>
  );
};

export default AllSongs;
