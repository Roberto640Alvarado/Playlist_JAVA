import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../services/RegisterService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate('/login');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Realizar lógica de registro o enviar datos a un servidor
    try {
      let response = await registerService.register(name,email,password);
      console.log(response);
      if (response != null) {
        alert('Usuario Creado');
      }else{
        console.log('No se pudo crear el usuario');
      }
    } catch (error) {
      console.log('Error',error);
    }
    // Reiniciar los campos del formulario
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-6">Registro</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleEmailChange}
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

        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
          <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
