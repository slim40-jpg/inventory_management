import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './movements.css';

const Movements = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [movements, setMovements] = useState([]);
  const [notifications] = useState({
    count: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0],
    type: 'Entrée',
    material: '',
    quantity: '',
    source: '',
    destination: '',
    user: '',
    reason: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Load movements from localStorage
    const userId = user?.username;
    const savedMovements = localStorage.getItem(`movements_${userId}`);
    if (savedMovements) {
      setMovements(JSON.parse(savedMovements));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleAddMovement = () => {
    if (!formData.material || !formData.quantity || !formData.user || !formData.reason) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const newMovement = {
      id: Date.now(),
      date: formData.date,
      time: formData.time,
      type: formData.type,
      material: formData.material,
      quantity: parseInt(formData.quantity),
      source: formData.source,
      destination: formData.destination,
      user: formData.user,
      reason: formData.reason
    };

    const updatedMovements = [newMovement, ...movements];
    setMovements(updatedMovements);

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`movements_${userId}`, JSON.stringify(updatedMovements));

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      type: 'Entrée',
      material: '',
      quantity: '',
      source: '',
      destination: '',
      user: '',
      reason: ''
    });
    setShowModal(false);
  };

  const handleDeleteMovement = (id) => {
    const updatedMovements = movements.filter(m => m.id !== id);
    setMovements(updatedMovements);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`movements_${userId}`, JSON.stringify(updatedMovements));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Entrée':
        return 'type-entry';
      case 'Sortie':
        return 'type-exit';
      case 'Transfert':
        return 'type-transfer';
      default:
        return 'type-exit';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Entrée':
        return '⬇️';
      case 'Sortie':
        return '⬆️';
      case 'Transfert':
        return '⤴️';
      default:
        return '⬆️';
    }
  };

  const filteredMovements = movements.filter(movement => {
    const matchesType = filterType === 'Tous' || movement.type === filterType;
    const matchesSearch = movement.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    totalMovements: movements.length,
    entries: movements.filter(m => m.type === 'Entrée').length,
    exits: movements.filter(m => m.type === 'Sortie').length,
    transfers: movements.filter(m => m.type === 'Transfert').length
  };

  return (
    <div className="movements-container">
      {/* Sidebar */}
      <Sidebar activePage="movements" />

      {/* Main Content */}
      <main className="movements-main">
        {/* Header */}
        <header className="movements-header">
          <h1>Mouvements</h1>
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
        <div className="movements-content">
          {/* Subtitle */}
          <p className="content-subtitle">Suivez tous les mouvements de votre stock</p>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Mouvements</h3>
              <p className="stat-number">{stats.totalMovements}</p>
              <span className="stat-period">Ce mois</span>
            </div>
            <div className="stat-card">
              <h3>Entrées</h3>
              <p className="stat-number entry-color">{stats.entries}</p>
              <span className="stat-period">Articles reçus</span>
            </div>
            <div className="stat-card">
              <h3>Sorties</h3>
              <p className="stat-number exit-color">{stats.exits}</p>
              <span className="stat-period">Articles sortis</span>
            </div>
            <div className="stat-card">
              <h3>Transferts</h3>
              <p className="stat-number transfer-color">{stats.transfers}</p>
              <span className="stat-period">Entre dépôts</span>
            </div>
          </div>

          {/* Toolbar */}
          <div className="movements-toolbar">
            <div className="search-and-filter">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-box">
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option>Tous</option>
                  <option>Entrée</option>
                  <option>Sortie</option>
                  <option>Transfert</option>
                </select>
              </div>
            </div>

            <button className="btn-add-movement" onClick={() => setShowModal(true)}>
              + Nouveau mouvement
            </button>
          </div>

          {/* Movements Table */}
          <div className="movements-table-wrapper">
            <table className="movements-table">
              <thead>
                <tr>
                  <th>Date & Heure</th>
                  <th>Type</th>
                  <th>Matériel</th>
                  <th>Quantité</th>
                  <th>Provenance</th>
                  <th>Destination</th>
                  <th>Utilisateur</th>
                  <th>Raison</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.length > 0 ? (
                  filteredMovements.map((movement) => (
                    <tr key={movement.id}>
                      <td className="date-cell">
                        <div className="date-display">
                          <span className="date">{movement.date}</span>
                          <span className="time">{movement.time}</span>
                        </div>
                      </td>
                      <td className="type-cell">
                        <span className={`type-badge ${getTypeColor(movement.type)}`}>
                          <span className="type-icon">{getTypeIcon(movement.type)}</span>
                          {movement.type}
                        </span>
                      </td>
                      <td className="material-cell">
                        <div className="material-info">
                          <span className="material-name">{movement.material}</span>
                          {movement.code && <span className="material-code">{movement.code}</span>}
                        </div>
                      </td>
                      <td className="quantity-cell">
                        <strong>{movement.quantity}</strong>
                      </td>
                      <td className="location-cell">{movement.source || '—'}</td>
                      <td className="location-cell">{movement.destination || '—'}</td>
                      <td className="user-cell">{movement.user}</td>
                      <td className="reason-cell">{movement.reason}</td>
                      <td className="actions-cell">
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteMovement(movement.id)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="empty-message">
                      Aucun mouvement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

      {/* Add Movement Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouveau Mouvement</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Heure</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Type de Mouvement</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Entrée</option>
                  <option>Sortie</option>
                  <option>Transfert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Matériel *</label>
                <input
                  type="text"
                  placeholder="Nom du matériel"
                  value={formData.material}
                  onChange={(e) => setFormData({...formData, material: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Quantité *</label>
                <input
                  type="number"
                  placeholder="Quantité"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Provenance</label>
                <input
                  type="text"
                  placeholder="Lieu d'origine"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Lieu de destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Utilisateur *</label>
                <input
                  type="text"
                  placeholder="Nom de l'utilisateur"
                  value={formData.user}
                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Raison *</label>
                <textarea
                  placeholder="Raison du mouvement"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button className="btn-submit" onClick={handleAddMovement}>
                Ajouter Mouvement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movements;
