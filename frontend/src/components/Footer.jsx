
// frontend/src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Pega o ano atual automaticamente

  return (
    <footer className="bg-gray-800 text-white mt-8">
      <div className="container mx-auto p-4 text-center">
        <p>DevShop &copy; {currentYear} - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;