import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Product Catalogue</div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar; 