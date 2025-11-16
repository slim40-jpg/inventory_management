import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './tableaudebord.css';

const TableauDeBord = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [depots, setDepots] = useState([]);
  const [notifications] = useState({
    count: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');

      // Load depots from localStorage for this user
      const userId = user.username;
      const savedDepots = localStorage.getItem(`depots_${userId}`);
      if (savedDepots) {
        setDepots(JSON.parse(savedDepots));
      }
    }
  }, []);

  const stats = [];
  const alertes = [];
  const reservations = [];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="tableau-container">
      {/* Sidebar */}
      <Sidebar activePage="tableau-de-bord" />

      {/* Main Content */}
      <main className="tableau-main">
        {/* Header */}
        <header className="tableau-header">
          <h1>Tableau de bord</h1>
          <div className="header-actions">
            <button className="notification-btn">
              🔔
              {notifications.count > 0 && (
                <span className="notification-badge">{notifications.count}</span>
              )}
            </button>
            <div className="user-profile">
              <span className="user-name">{userName}</span>
              <div className="user-avatar">{userInitial}</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="tableau-content">
          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-change">{stat.change || stat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <div className="content-grid">
            {/* Dépôts Section */}
            <section className="depots-section">
              <div className="section-header">
                <h2>Dépôts principaux</h2>
                <p className="section-subtitle">Capacité de stockage par dépôt</p>
              </div>
              <div className="depots-list">
                {depots.map((depot, idx) => (
                  <div
                    key={idx}
                    className="depot-item"
                    onClick={() => navigate(`/depots?depot=${depot.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="depot-info">
                      <h4>{depot.name}</h4>
                      <span className="depot-capacity">{depot.capacity.used} / {depot.capacity.total}</span>
                    </div>
                    <div className="depot-bar">
                      <div className="depot-fill" style={{ width: `${Math.round((depot.capacity.used / depot.capacity.total) * 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Alertes Section */}
            <section className="alertes-section">
              <div className="section-header">
                <h2>Alertes Stock Faible</h2>
                <p className="section-subtitle">Articles nécessitant un réapprovisionnement</p>
              </div>
              <div className="alertes-list">
                {alertes.map((alerte, idx) => (
                  <div key={idx} className="alerte-item">
                    <div className="alerte-info">
                      <h4>{alerte.name}</h4>
                      <span className="alerte-category">{alerte.category}</span>
                    </div>
                    <div className="alerte-percent">{alerte.percent}%</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Réservations Section */}
          <section className="reservations-section">
            <div className="section-header">
              <h2>Réservations à venir</h2>
              <p className="section-subtitle">Prochains événements programmés</p>
            </div>
            <div className="reservations-list">
              {reservations.map((reservation, idx) => (
                <div key={idx} className="reservation-item">
                  <div className="reservation-info">
                    <h4>{reservation.name}</h4>
                    <span className="reservation-date">{reservation.date}</span>
                    <span className="reservation-articles">{reservation.articles}</span>
                  </div>
                  <div className={`reservation-status ${reservation.status}`}>
                    {reservation.status}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Floating Menu */}
      <div className="floating-menu">
        <button className="floating-btn" title="Logout" onClick={handleLogout}>
          🚪
        </button>
        <button className="floating-btn" title="Settings">
          ⚙️
        </button>
        <button className="floating-btn" title="Help">
          ?
        </button>
      </div>
    </div>
  );
};

export default TableauDeBord;
