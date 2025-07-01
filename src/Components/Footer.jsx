// src/Components/Footer.jsx
import React, { useEffect } from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-4 text-center mt-20">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} Galactic Code Systems by Jake 🛸 | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

