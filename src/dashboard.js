import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [notifications, setNotifications] = useState({
    count: 0,
    items: []
  });

  useEffect(() => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserRole(user.role || 'Utilisateur');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Load depots and calculate low stock notifications
    const userId = user?.username;
    const savedDepots = localStorage.getItem(`depots_${userId}`);
    if (savedDepots) {
      const depots = JSON.parse(savedDepots);
      
      // Check for high capacity usage (>=80%) OR low stock remaining (<10%)
      const lowStockDepots = depots.filter(depot => {
        const capacityPercent = (depot.capacity.used / depot.capacity.total) * 100;
        const remainingPercent = 100 - capacityPercent;
        return capacityPercent >= 80 || remainingPercent < 10;
      });

      setNotifications({
        count: lowStockDepots.length,
        items: lowStockDepots,
        message: lowStockDepots.length > 0 
          ? `${lowStockDepots.length} dépôt${lowStockDepots.length > 1 ? 's' : ''} avec stock faible`
          : 'Tous les dépôts sont en bon état'
      });
    }
  }, []);

  const menuItems = [
    { icon: '📊', label: 'Tableau de bord', id: 'dashboard' },
    { icon: '📦', label: 'Dépôts', id: 'depots' },
    { icon: '📋', label: 'Matériel', id: 'materiel' },
    { icon: '📈', label: 'Mouvements', id: 'movements' },
    { icon: '📅', label: 'Réservations', id: 'reservations' },
    { icon: '👥', label: 'Gestion des utilisateurs', id: 'users' }
  ];

  const quickCards = [
    { icon: '📊', title: 'Tableau de bord', id: 'dashboard' },
    { icon: '📦', title: 'Dépôts', id: 'depots' },
    { icon: '📋', title: 'Matériel', id: 'materiel' },
    { icon: '📈', title: 'Mouvements', id: 'movements' },
    { icon: '📅', title: 'Réservations', id: 'reservations' },
    { icon: '👥', title: 'Gestion des utilisateurs', id: 'users' }
  ];

  const navigate = useNavigate();

  const handleMenuClick = (id) => {
    if (id === 'dashboard') {
      navigate('/tableau-de-bord');
    } else if (id === 'depots') {
      navigate('/depots');
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
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
              className="menu-item"
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

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Accueil</h1>
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
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-avatar">{userInitial}</div>
            <h2>Bienvenue M. {userName}</h2>
            <p>{userRole} - web</p>
          </section>

          {/* Quick Access Cards */}
          <section className="quick-access">
            <div className="cards-grid">
              {quickCards.map((card) => (
                <div
                  key={card.id}
                  className="quick-card"
                  onClick={() => handleMenuClick(card.id)}
                >
                  <div className="card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Notification Alert */}
          {notifications.count > 0 && (
            <section className="notification-alert">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h4>{notifications.message}</h4>
                <p>
                  {notifications.items.map(depot => `${depot.name} (${depot.capacity.used}/${depot.capacity.total})`).join(', ')}
                </p>
              </div>
            </section>
          )}
          {notifications.count === 0 && (
            <section className="notification-alert success">
              <div className="alert-icon">✅</div>
              <div className="alert-content">
                <h4>{notifications.message}</h4>
                <p>Tous vos dépôts sont en bon état de stockage</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Floating Menu */}
      <div className="floating-menu">
        <button className="floating-btn menu-toggle" title="Menu">
          ⋮
        </button>
        <button className="floating-btn" title="Camera">
          📷
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

export default Dashboard;
