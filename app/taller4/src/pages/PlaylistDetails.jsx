import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongCard from '../components/SongCard';
import SongxPlaylistServices from '../services/SongxPlaylistServices';
import context from '../context/UserContext';

const PlaylistDetails = () => {
    const { code } = useParams();
    const [playlist, setPlaylist] = useState(null);

    console.log('code: ' + code);

    useEffect(() => {
        fetchPlaylistDetails();
    }, []);

    const fetchPlaylistDetails = async () => {
        let token = context.getToken();
        let response = await SongxPlaylistServices.findAllSongByPlaylist(token, code);
        console.log(response);

        if (!response.error) {
            let data = response; // Acceder a response.playlist en lugar de response
            setPlaylist(data);
        }
    }

    if (!playlist) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
          <h1 className="text-3xl font-bold m-4">Playlist {playlist.playlist.title}</h1>
          <p className="text-sm text-gray-600 mb-4">Descripción: {playlist.playlist.description}</p>
          <p className="text-sm text-gray-600 mb-4">Total de reproducción: {playlist.total}</p>
          
          <h2 className="text-lg font-bold mb-2">Canciones:</h2>
          {playlist.songs.length > 0 ? (
            <ul className="space-y-4">
              {playlist.songs.map((song) => (
                <li key={song.title}>
                  <SongCard
                    title={song.title}
                    duration={song.duration}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay canciones en esta playlist.</p>
          )}
        </div>
      );
      
};

export default PlaylistDetails;

