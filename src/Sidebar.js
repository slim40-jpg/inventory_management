import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ activePage = 'materiel' }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📊', label: 'Accueil', id: 'dashboard' },
    { icon: '📊', label: 'Tableau de bord', id: 'tableau-de-bord' },
    { icon: '📦', label: 'Dépôts', id: 'depots' },
    { icon: '📋', label: 'Matériel', id: 'materiel' },
    { icon: '📈', label: 'Mouvements', id: 'movements' },
    { icon: '📅', label: 'Réservations', id: 'reservations' },
    { icon: '👥', label: 'Gestion des utilisateurs', id: 'users' }
  ];

  const handleMenuClick = (id) => {
    if (id === 'dashboard') {
      navigate('/dashboard');
    } else if (id === 'tableau-de-bord') {
      navigate('/tableau-de-bord');
    } else if (id === 'depots') {
      navigate('/depots');
    } else if (id === 'materiel') {
      navigate('/materiel');
    } else if (id === 'movements') {
      navigate('/movements');
    } else if (id === 'reservations') {
      navigate('/reservations');
    } else if (id === 'users') {
      navigate('/user_management');
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  return (
    <aside className="shared-sidebar">
      <div className="sidebar-header">
        <div className="logo-box">
          <span className="logo-icon">📦</span>
        </div>
        <div className="logo-text">
          <h2>web</h2>
          <p>Gestion de stock</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`menu-item ${item.id === activePage ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick(item.id);
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
