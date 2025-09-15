// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redireciona para a home page após o login
    } catch (error) {
      alert('Falha no login. Email ou senha inválidos.');
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">Entrar</button>
        <p className="text-center mt-4">
          Não tem uma conta? <Link to="/register" className="text-blue-500">Registe-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;