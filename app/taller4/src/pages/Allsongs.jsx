import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';

const Allsongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('/song/song')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => {
        console.error('Error al obtener las canciones:', error);
      });
  }, []);

      return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Todas las Canciones</h1>
        
          <div id="play" className=" p-4 rounded-lg">
            
            <div>
              {songs.map(song => (
                <div key={song.id} className="mb-4">
                  <SongCard
                    title={song.title}
                    duration={song.duration}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );


};

export default Allsongs;
