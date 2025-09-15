// frontend/src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/'); // Redireciona para a home page após o registo
    } catch (error) {
      alert('Falha no registo. Verifique os dados.');
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">Registar</button>
      </form>
    </div>
  );
};

export default RegisterPage;