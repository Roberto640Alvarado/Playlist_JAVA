import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import AppServices from '../services/AppServices';
import context from '../context/UserContext';
import Buttons from '../components/Buttons';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchAllSongs();
  }, [title, page]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchAllSongs = async () => {
    let token = context.getToken();
    let response;

    if (title !== '') {
      response = await AppServices.fetchAllSongs(token, page, 6, title);
    } else {
      response = await AppServices.fetchAllSongs(token, page, 6);
    }

    if (!response.error) {
      let data = response.content;
      setSongs(data);
    }
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold m-4">Todas las Canciones</h1>
        <div className="mb-4 flex justify-center">
          <input
            id='title'
            type="text"
            onChange={handleTitleChange}
            placeholder="Buscar canciones"
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
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
      <Buttons
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </>
  );
};

export default AllSongs;

