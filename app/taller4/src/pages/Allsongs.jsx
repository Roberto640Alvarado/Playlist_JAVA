import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import AppServices from '../services/AppServices';
import SongServices from '../services/SongServices';
import context from '../context/UserContext';
import Buttons from '../components/Buttons';
import { useParams, useNavigate } from 'react-router-dom';

const AllSongs = () => {
  const { code } = useParams(); // code de la playlist
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [selectedCodes, setSelectedCodes] = useState(new Set()); // array de code de las canciones

  useEffect(() => {
    fetchAllSongs();
  }, [title, currentPage]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchAllSongs = async () => {
    const token = context.getToken();
    const response = await AppServices.fetchAllSongs(token, currentPage, 6, title);

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

  const handleSelectSong = (code) => {
    setSelectedCodes((prevSelectedCodes) => {
      const newSelectedCodes = new Set(prevSelectedCodes);

      if (newSelectedCodes.has(code)) {
        newSelectedCodes.delete(code);
      } else {
        newSelectedCodes.add(code);
      }

      return newSelectedCodes;
    });
  };

  const handleSave = async () => {
    const token = context.getToken();

    const promises = Array.from(selectedCodes).map((songCode) => {
      return SongServices.addSongToPlaylist(token, code, { song_code: songCode });
    });

    try {
      const responses = await Promise.all(promises);
      console.log(responses);
      navigate('/allplaylist'); // Navegar a la página "/allplaylist" después de guardar exitosamente
    } catch (error) {
      console.log(error);
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
                key={song.code}
                isMainView={true}
                code={song.code}
                title={song.title}
                duration={song.duration}
                onSelect={handleSelectSong}
                isSelected={selectedCodes.has(song.code)}
              />
            ))}
        </div>
      </div>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mb-4 rounded"
        onClick={handleSave}
      >
        Guardar ({selectedCodes.size})
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









