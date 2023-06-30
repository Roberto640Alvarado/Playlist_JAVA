import React, { useState, useEffect } from 'react';
import Playlist from '../components/Playlist';
import AppServices from "../services/AppServices";
import context from '../context/UserContext';
import Buttons from '../components/Buttons';

const AllPlaylist = () => {

  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchData();
  }, [title, page]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const fetchData = async () => {
    let token = context.getToken();

    let response;

    if (title !== '') {
      response = await AppServices.findAllPlaylistsByUser(token, page, 6, title);
    } else {
      response = await AppServices.findAllPlaylistsByUser(token, page, 6);
    }

    if (!response.error) {
      let data = response.content;
      setPlaylists(data);
    }
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold m-4">Todas las Playlist</h1>
      <div className="mb-4 flex">
        <input
          id='title'
          type="text"
          onChange={handleTitleChange}
          placeholder="Buscar canciones"
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
      <div className='grid grid-cols-3 mx-auto'>
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
      <Buttons
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default AllPlaylist;


