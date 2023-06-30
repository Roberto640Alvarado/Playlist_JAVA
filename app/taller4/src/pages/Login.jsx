import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../context/UserContext';

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //let response = AuthServices.login(identifier, password);
      let response = await context.login(identifier, password);
      console.log(response);
      if (response != null) {
        //Navigate a Home o todas las palylist
        navigate('/allplaylist');
      } else {
        //Mostrar mensaje de error
        console.log('Error al iniciar sesión');
      }
    } catch (error) {
      console.log('Error al iniciar sesión', error);
    }

    // Reiniciar los campos del formulario
    setIdentifier('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#DBDFEA]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-6">Iniciar sesión</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Identificador
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identifier"
            placeholder="Ingrese su identificador"
            value={identifier}
            onChange={handleIdentifierChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            ¿Olvidó su contraseña?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
