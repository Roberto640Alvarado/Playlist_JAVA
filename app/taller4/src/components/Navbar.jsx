import React from 'react'
import { useNavigate } from 'react-router-dom';
import context from '../context/UserContext';

export const Navbar = () => {

    const navigate = useNavigate();

    const handleCreateSong = () => {
        navigate('/create-song');

    }

    const handleCreatePlaylist = () => {
        navigate('/create-playlist');
    }

    const handleMySongs = () => {
        navigate('/allsongs');
    }

    const handleMyPlaylist = () => {
        navigate('/allplaylist');
    }

    const handleLogout = () => {
      context.logout();
        navigate('/login');
    }


  return (
    <nav>
      <div>
        <ul className="flex p-8 bg-gradient-to-tr from-indigo-600 to-purple-600 justify-end">
        <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300" onClick={handleCreateSong}>
              Crear canciones
            </button>
          </li>
          <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300" onClick={handleCreatePlaylist}>
              Crear playlist
            </button>
          </li>
          <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300" onClick={handleMySongs}>
              Mis canciones
            </button>
          </li>
          <li className='mr-4'>
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300" onClick={handleMyPlaylist}>
              Mis playlist
            </button>
          </li>
          <li>
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

