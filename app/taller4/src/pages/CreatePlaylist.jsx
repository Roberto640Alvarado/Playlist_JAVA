import React, { useState } from 'react';
import context from '../context/UserContext';
import appService from '../services/AppServices';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [songs, setSongs] = useState([]);

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handlePlaylistDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value);
  };

  const handleSongChange = (e, index) => {
    const updatedSongs = [...songs];
    updatedSongs[index] = e.target.value;
    setSongs(updatedSongs);
  };

  const handleAddSong = () => {
    setSongs([...songs, '']);
  };

  const handleRemoveSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Realizar lógica de creación de la playlist o enviar datos a un servidor
    let content = context.getToken();
    let payload = {
      title:playlistName,
      description:playlistDescription,
    };
    
    try {
      let response = await appService.createPlaylist(content,payload);
      if (response != null) {
      alert(response.message);
    }
    console.log(response.message);
    } catch (error) {
      console.log('Error',error);
    }  
    // Reiniciar los campos del formulario
    setPlaylistName('');
    setPlaylistDescription('');
    setSongs([]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-6">Crear Playlist</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playlistName">
            Nombre de la Playlist
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playlistName"
            type="text"
            placeholder="Ingrese el nombre de la playlist"
            value={playlistName}
            onChange={handlePlaylistNameChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playlistDescription">
            Descripción de la Playlist
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playlistDescription"
            type="text"
            placeholder="Ingrese la descripción de la playlist"
            value={playlistDescription}
            onChange={handlePlaylistDescriptionChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songs">
            Canciones
          </label>
          {songs.map((song, index) => (
            <div className="flex mb-2" key={index}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingrese una canción"
                value={song}
                onChange={(e) => handleSongChange(e, index)}
                required
              />
              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleRemoveSong(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddSong}
          >
            Agregar Canción
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Playlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;
