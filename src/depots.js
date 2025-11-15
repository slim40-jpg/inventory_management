import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './depots.css';

const Depots = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [depots, setDepots] = useState([]);
  const [notifications] = useState({
    count: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [editingDepotId, setEditingDepotId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    region: '',
    manager: '',
    capacityTotal: '',
    capacityUsed: '',
    stockType: '',
    expirationDate: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Load depots from localStorage for this user
    const userId = user?.username;
    const savedDepots = localStorage.getItem(`depots_${userId}`);
    if (savedDepots) {
      setDepots(JSON.parse(savedDepots));
    }
  }, []);

  const menuItems = [
    { icon: '📊', label: 'Accueil', id: 'dashboard' },
    { icon: '📊', label: 'Tableau de bord', id: 'tableau-de-bord' },
    { icon: '📦', label: 'Dépôts', id: 'depots', isActive: true },
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
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleDeleteDepot = (id) => {
    const updatedDepots = depots.filter(depot => depot.id !== id);
    setDepots(updatedDepots);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));
  };

  const handleAddDepot = () => {
    if (!formData.name || !formData.address || !formData.region || !formData.manager || !formData.capacityTotal || !formData.capacityUsed || !formData.stockType || !formData.expirationDate) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (editingDepotId) {
      // Update existing depot
      const updatedDepots = depots.map(depot =>
        depot.id === editingDepotId
          ? {
              ...depot,
              name: formData.name,
              region: formData.region,
              address: formData.address,
              manager: formData.manager,
              stockType: formData.stockType,
              expirationDate: formData.expirationDate,
              capacity: { used: parseInt(formData.capacityUsed), total: parseInt(formData.capacityTotal) }
            }
          : depot
      );
      setDepots(updatedDepots);
      
      // Save to localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.username;
      localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));
      
      setEditingDepotId(null);
    } else {
      // Add new depot
      const newDepot = {
        id: Math.max(...depots.map(d => d.id), 0) + 1,
        name: formData.name,
        region: formData.region,
        status: 'actif',
        address: formData.address,
        manager: formData.manager,
        stockType: formData.stockType,
        expirationDate: formData.expirationDate,
        capacity: { used: parseInt(formData.capacityUsed), total: parseInt(formData.capacityTotal) }
      };

      const updatedDepots = [...depots, newDepot];
      setDepots(updatedDepots);
      
      // Save to localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.username;
      localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));
    }
    
    setFormData({ name: '', address: '', region: '', manager: '', capacityTotal: '', capacityUsed: '', stockType: '', expirationDate: '' });
    setShowModal(false);
  };

  const handleEditDepot = (depot) => {
    setFormData({
      name: depot.name,
      address: depot.address,
      region: depot.region,
      manager: depot.manager,
      capacityTotal: depot.capacity.total.toString(),
      capacityUsed: depot.capacity.used.toString(),
      stockType: depot.stockType,
      expirationDate: depot.expirationDate
    });
    setEditingDepotId(depot.id);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredDepots = depots.filter(depot =>
    depot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    depot.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCapacityPercent = (used, total) => Math.round((used / total) * 100);

  return (
    <div className="depots-container">
      {/* Sidebar */}
      <aside className="depots-sidebar">
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
              className={`menu-item ${item.isActive ? 'active' : ''}`}
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
      <main className="depots-main">
        {/* Header */}
        <header className="depots-header">
          <h1>Dépôts</h1>
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
        <div className="depots-content">
          {/* Search and Add Button */}
          <div className="depots-toolbar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Rechercher un dépôt ou une région..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="add-depot-btn" onClick={() => {
              setEditingDepotId(null);
              setFormData({ name: '', address: '', region: '', manager: '', capacityTotal: '', capacityUsed: '', stockType: '', expirationDate: '' });
              setShowModal(true);
            }}>
              <span>+</span> Nouveau dépôt
            </button>
          </div>

          {/* Depots Grid */}
          <div className="depots-grid">
            {filteredDepots.map((depot) => (
              <div key={depot.id} className="depot-card">
                <div className="depot-header">
                  <div className="depot-title">
                    <div className="location-icon">📍</div>
                    <div className="depot-name-section">
                      <h3>{depot.name}</h3>
                      <p className="region">{depot.region}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${depot.status}`}>
                    {depot.status}
                  </span>
                </div>

                <div className="depot-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{depot.address}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">👤</span>
                    <span className="detail-text">{depot.manager}</span>
                  </div>
                </div>

                <div className="depot-capacity">
                  <div className="capacity-header">
                    <span className="capacity-icon">📦</span>
                    <span className="capacity-label">Capacité</span>
                    <span className="capacity-value">
                      {depot.capacity.used} / {depot.capacity.total}
                    </span>
                  </div>
                  <div className="capacity-bar">
                    <div
                      className="capacity-fill"
                      style={{
                        width: `${getCapacityPercent(
                          depot.capacity.used,
                          depot.capacity.total
                        )}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="depot-actions">
                  <button className="btn-edit" onClick={() => handleEditDepot(depot)}>
                    <span>✎</span> Modifier
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteDepot(depot.id)}>
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDepots.length === 0 && (
            <div className="empty-state">
              <p>Aucun dépôt trouvé</p>
            </div>
          )}
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingDepotId ? 'Modifier le dépôt' : 'Ajouter un dépôt'}</h2>
              <p className="modal-subtitle">{editingDepotId ? 'Modifiez les informations du dépôt' : 'Créez un nouveau dépôt de stockage'}</p>
              <button className="modal-close" onClick={() => {
                setShowModal(false);
                setEditingDepotId(null);
                setFormData({ name: '', address: '', region: '', manager: '', capacityTotal: '', capacityUsed: '', stockType: '', expirationDate: '' });
              }}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nom du dépôt</label>
                <input
                  type="text"
                  name="name"
                  placeholder="ex: Paris Nord"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  placeholder="45 Rue..."
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Région</label>
                <input
                  type="text"
                  name="region"
                  placeholder="ex: Île-de-France"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Responsable</label>
                <input
                  type="text"
                  name="manager"
                  placeholder="Nom"
                  value={formData.manager}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Capacité utilisée</label>
                  <input
                    type="number"
                    name="capacityUsed"
                    placeholder="0"
                    value={formData.capacityUsed}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Capacité totale</label>
                  <input
                    type="number"
                    name="capacityTotal"
                    placeholder="500"
                    value={formData.capacityTotal}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Type de stock</label>
                <input
                  type="text"
                  name="stockType"
                  placeholder="ex: Électronique, Textile..."
                  value={formData.stockType}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Date d'expiration</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowModal(false);
                setEditingDepotId(null);
                setFormData({ name: '', address: '', region: '', manager: '', capacityTotal: '', capacityUsed: '', stockType: '', expirationDate: '' });
              }}>Annuler</button>
              <button className="btn-create" onClick={handleAddDepot}>{editingDepotId ? 'Mettre à jour' : 'Créer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Depots;
