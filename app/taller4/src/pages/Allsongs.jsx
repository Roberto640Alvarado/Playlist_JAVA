import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import AppServices from '../services/AppServices';
import context from '../context/UserContext';
import Buttons from '../components/Buttons';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchAllSongs();
  }, []);

  const fetchAllSongs = async () => {
    let token = context.getToken();
    console.log(token);
    let response = await AppServices.fetchAllSongs(token, 0, 10);
    console.log(response);


    if (!response.error) {
      let data = response;
      setSongs(data);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold m-4">Todas las Canciones</h1>
        <div className='grid grid-cols-3 px-32 gap-10 mt-8'>
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
      </div>
      <Buttons />
    </>
  );
};

export default AllSongs;
