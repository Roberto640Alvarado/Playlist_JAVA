import React, { useState, useEffect } from 'react';
import Playlist from '../components/Playlist';
import AppServices from "../services/AppServices";
import Buttons from '../components/Buttons';
import context from '../context/UserContext';

const AllPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, [currentPage, searchTitle]);

  const fetchPlaylists = async () => {
    let token = context.getToken();

    const response = await AppServices.findAllPlaylistsByUser(token, currentPage, 6, searchTitle);
    if (!response.error) {
      const { content, total_pages } = response;
      setPlaylists(content);
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

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold m-4">Todas las Playlist</h1>
      <div className="mb-4 flex">
        <input
          id='title'
          type="text"
          onChange={handleTitleChange}
          placeholder="Buscar playlist"
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
      {playlists && playlists.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <Playlist
                key={playlist.code}
                title={playlist.title}
                description={playlist.description}
              />
            ))}
          </div>
          <Buttons
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p>No se encontraron playlists.</p>
      )}
    </div>
  );
};

export default AllPlaylist;



