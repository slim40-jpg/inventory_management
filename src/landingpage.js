import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landingpage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }
  }, []);

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
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="landing-page-wrapper">
      {/* Sidebar */}
      {userName && (
        <aside className="landing-sidebar">
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
                className={`menu-item ${item.id === 'dashboard' ? 'active' : ''}`}
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
      )}

      <div className="landing-container">
        {/* Main Icon */}
        <div className="main-icon">
          📦
        </div>

        {/* Title */}
        <h1 className="landing-title">Plateforme de Gestion de Stock</h1>

        {/* Subtitle */}
        <p className="landing-subtitle">
          Solution complète pour gérer votre matériel événementiel à travers
          plusieurs entrepôts et régions.
        </p>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon blue">🏬</div>
            <h2>Multi-Entrepôts</h2>
            <p>Gérez plusieurs dépôts répartis dans différentes régions</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">📊</div>
            <h2>Tableaux de Bord</h2>
            <p>Visualisez vos stocks et mouvements en temps réel</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">🧑‍🤝‍🧑</div>
            <h2>Multi-Utilisateurs</h2>
            <p>Gestion des rôles et permissions pour votre équipe</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="landing-buttons">
          {!userName ? (
            <>
              <Link to="/login" className="btn primary">Se connecter</Link>
              <Link to="/register" className="btn secondary">Créer un compte</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn primary">Déconnexion</button>
          )}
        </div>

        {/* User Profile */}
        {userName && (
          <div className="user-info">
            <span>{userName}</span>
            <div className="user-avatar">{userInitial}</div>
          </div>
        )}
      </div>
    </div>
  );
}
