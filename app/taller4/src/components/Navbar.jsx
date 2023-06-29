import React from 'react'

export const Navbar = () => {
  return (
    <nav>
      <div>
        <ul className="flex p-8 bg-gradient-to-tr from-indigo-600 to-purple-600 justify-end">
        <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300">
              Crear canciones
            </button>
          </li>
          <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300">
              Crear playlist
            </button>
          </li>
          <li className="mr-4">
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300">
              Mis canciones
            </button>
          </li>
          <li className='mr-4'>
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300">
              Mis playlist
            </button>
          </li>
          <li>
            <button className="text-xl text-white tracking-wide cursor-pointer hover:border-white hover:border-b-2 
              border-b-2 border-transparent transition duration-300">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;

