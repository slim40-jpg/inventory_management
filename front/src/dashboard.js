import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    count: 0,
    items: [],
    message: ''
  });
  const [depots, setDepots] = useState([]);
  const [stats, setStats] = useState({
    totalDepots: 0,
    totalMaterials: 0,
    totalMovements: 0,
    totalReservations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Set up axios interceptors for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If no user, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Fetch dashboard data from backend
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch multiple data in parallel
      const [depotsResponse, statsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/stock/depots`),
        axios.get(`${API_URL}/api/dashboard/stats`)
      ]);

      // Process depots data
      const depotsData = depotsResponse.data.data || depotsResponse.data;
      setDepots(depotsData);

      // Process statistics
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      // Calculate notifications for low stock
      calculateNotifications(depotsData);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else if (err.response?.status === 403) {
        setError('Vous n\'avez pas la permission d\'accéder à ces données');
      } else {
        setError('Erreur lors du chargement des données du tableau de bord');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateNotifications = (depotsData) => {
    // Check for high capacity usage (>=80%) OR low stock remaining (<10%)
    const lowStockDepots = depotsData.filter(depot => {
      if (!depot.capacity || !depot.stockLevel) return false;
      
      const capacityPercent = (depot.capacity.used / depot.capacity.total) * 100;
      const remainingPercent = 100 - capacityPercent;
      return capacityPercent >= 80 || remainingPercent < 10 || depot.stockLevel === 'low';
    });

    setNotifications({
      count: lowStockDepots.length,
      items: lowStockDepots,
      message: lowStockDepots.length > 0 
        ? `${lowStockDepots.length} dépôt${lowStockDepots.length > 1 ? 's' : ''} avec stock faible`
        : 'Tous les dépôts sont en bon état'
    });
  };

  const quickCards = [
    { 
      icon: '📊', 
      title: 'Tableau de bord', 
      id: 'dashboard',
      count: stats.totalDepots || 0,
      subtitle: 'Dépôts'
    },
    { 
      icon: '📦', 
      title: 'Dépôts', 
      id: 'depots',
      count: stats.totalDepots || 0,
      subtitle: 'Total'
    },
    { 
      icon: '📋', 
      title: 'Matériel', 
      id: 'materiel',
      count: stats.totalMaterials || 0,
      subtitle: 'Articles'
    },
    { 
      icon: '📈', 
      title: 'Mouvements', 
      id: 'movements',
      count: stats.totalMovements || 0,
      subtitle: 'Activité'
    },
    { 
      icon: '📅', 
      title: 'Réservations', 
      id: 'reservations',
      count: stats.totalReservations || 0,
      subtitle: 'En cours'
    },
    { 
      icon: '👥', 
      title: 'Utilisateurs', 
      id: 'users',
      count: '5', // This would come from API
      subtitle: 'Actifs'
    }
  ];

  const handleMenuClick = (id) => {
    switch(id) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'depots':
        navigate('/depots');
        break;
      case 'materiel':
        navigate('/materiel');
        break;
      case 'movements':
        navigate('/movements');
        break;
      case 'reservations':
        navigate('/reservations');
        break;
      case 'users':
        navigate('/users');
        break;
      default:
        console.log(`Navigate to: ${id}`);
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      
      // Clear axios headers
      delete axios.defaults.headers.common['Authorization'];
      
      // Redirect to login
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar activePage="dashboard" />
        <main className="dashboard-main">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement du tableau de bord...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Tableau de bord</h1>
          <div className="header-actions">
            {error && <span className="error-badge">⚠️</span>}
            
            <div className="notification-wrapper">
              <button className="notification-btn">
                🔔
                {notifications.count > 0 && (
                  <span className="notification-badge">{notifications.count}</span>
                )}
              </button>
              {/* Notification dropdown would go here */}
            </div>
            
            <div className="user-profile">
              <span className="user-name">{user?.username || 'Utilisateur'}</span>
              <div className="user-avatar">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-dropdown">
                <button onClick={() => navigate('/profile')}>👤 Profil</button>
                <button onClick={handleLogout}>🚪 Déconnexion</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="welcome-text">
              <h2>Bonjour, {user?.username || 'Utilisateur'}!</h2>
              <p className="user-role">
                {user?.role === 'admin' ? 'Administrateur' : 
                 user?.role === 'manager' ? 'Gestionnaire' : 
                 user?.role === 'staff' ? 'Employé' : 'Utilisateur'}
              </p>
              <p className="user-company">
                {user?.company?.name || 'Sans entreprise'}
              </p>
            </div>
            {error && (
              <div className="error-message">
                ⚠️ {error}
                <button onClick={fetchDashboardData} className="retry-btn">
                  Réessayer
                </button>
              </div>
            )}
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              {quickCards.map((card) => (
                <div
                  key={card.id}
                  className="stat-card"
                  onClick={() => handleMenuClick(card.id)}
                >
                  <div className="stat-icon">{card.icon}</div>
                  <div className="stat-content">
                    <h3>{card.title}</h3>
                    <div className="stat-number">{card.count}</div>
                    <p className="stat-subtitle">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notification Alert */}
          <section className={`notification-section ${notifications.count > 0 ? 'alert' : 'success'}`}>
            <div className="notification-icon">
              {notifications.count > 0 ? '⚠️' : '✅'}
            </div>
            <div className="notification-content">
              <h4>{notifications.message}</h4>
              {notifications.count > 0 && (
                <div className="depot-list">
                  {notifications.items.slice(0, 3).map((depot, index) => (
                    <span key={index} className="depot-tag">
                      {depot.name}
                    </span>
                  ))}
                  {notifications.items.length > 3 && (
                    <span className="depot-tag more">
                      +{notifications.items.length - 3} autres
                    </span>
                  )}
                </div>
              )}
            </div>
            {notifications.count > 0 && (
              <button 
                className="view-details-btn"
                onClick={() => navigate('/depots')}
              >
                Voir détails →
              </button>
            )}
          </section>

          {/* Recent Activity Section */}
          <section className="recent-activity">
            <h3>Activité récente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">➕</span>
                <div className="activity-content">
                  <p>Nouveau matériel ajouté</p>
                  <span className="activity-time">Il y a 2 heures</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📦</span>
                <div className="activity-content">
                  <p>Stock mis à jour dans le dépôt principal</p>
                  <span className="activity-time">Il y a 5 heures</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">👤</span>
                <div className="activity-content">
                  <p>Nouvel utilisateur enregistré</p>
                  <span className="activity-time">Il y a 1 jour</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        className="floating-action-btn"
        onClick={() => navigate('/materiel/add')}
        title="Ajouter du matériel"
      >
        <span className="fab-icon">+</span>
      </button>
    </div>
  );
};

export default Dashboard;