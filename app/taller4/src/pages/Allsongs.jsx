import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import AppServices from '../services/AppServices';
import context from '../context/UserContext';
import Buttons from '../components/Buttons';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchAllSongs();
  }, [title, currentPage]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchAllSongs = async () => {
    const token = context.getToken();
    let response;

    if (title !== '') {
      response = await AppServices.fetchAllSongs(token, currentPage, 6, title);
    } else {
      response = await AppServices.fetchAllSongs(token, currentPage, 6);
    }

    if (!response.error) {
      const { content, total_pages } = response;
      setSongs(content);
      setTotalPages(total_pages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold m-4">Todas las Canciones</h1>
        <div className="mb-4 flex justify-center">
          <input
            id="title"
            type="text"
            onChange={handleTitleChange}
            placeholder="Buscar canciones"
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="grid grid-cols-3 px-32 gap-10 mt-8">
          {songs &&
            songs.map((song) => (
              <SongCard
                key={song._id}
                isMainView={true}
                code={song._id}
                title={song.title}
                duration={song.duration}
              />
            ))}
        </div>
      </div>
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-4 rounded">
        Guardar
      </button>
      <Buttons
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default AllSongs;



