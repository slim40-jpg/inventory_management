import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './materiel.css';

const Materiel = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [materiel, setMateriel] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notifications] = useState({
    count: 1
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Function to load materials
    const loadMaterials = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const userId = user?.username;
        const savedDepots = localStorage.getItem(`depots_${userId}`);
        console.log('Saved Depots:', savedDepots); // Debug log
        if (savedDepots) {
          try {
            const depots = JSON.parse(savedDepots);
            console.log('Parsed Depots:', depots); // Debug log
            // Extract all materials from all depots
            const allMaterials = [];
            depots.forEach(depot => {
              if (depot.materials && depot.materials.length > 0) {
                depot.materials.forEach(material => {
                  allMaterials.push({
                    ...material,
                    depotId: depot.id,
                    depotName: depot.name,
                    depotLocation: depot.region
                  });
                });
              }
            });
            console.log('All Materials:', allMaterials); // Debug log
            setMateriel(allMaterials);
          } catch (error) {
            console.error('Error parsing depots:', error);
          }
        }
      }
    };

    // Load materials on mount
    loadMaterials();

    // Listen for custom event when materials are added or deleted
    const handleMaterialChange = () => {
      console.log('Material changed - reloading');
      loadMaterials();
    };

    window.addEventListener('materialAdded', handleMaterialChange);

    return () => {
      window.removeEventListener('materialAdded', handleMaterialChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMaterial(null);
  };

  const filteredMateriel = materiel.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="materiel-container">
      {/* Sidebar */}
      <Sidebar activePage="materiel" />

      {/* Main Content */}
      <main className="materiel-main">
        {/* Header */}
        <header className="materiel-header">
          <h1>Matériel</h1>
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
        <div className="materiel-content">
          {/* Search and Add Button */}
          <div className="materiel-toolbar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Rechercher du matériel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-info">
              <p>💡 Ajoutez du matériel depuis la page "Dépôts"</p>
            </div>
          </div>

          {/* Materiel Grid */}
          <div className="materiel-grid">
            {filteredMateriel.map((item) => (
              <div
                key={item.id}
                id={`materiel-${item.id}`}
                className="materiel-card"
                onClick={() => handleMaterialClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="materiel-header">
                  <div className="materiel-title">
                    <div className="category-icon">📋</div>
                    <div className="materiel-name-section">
                      <h3>{item.name}</h3>
                      <p className="code">{item.code}</p>
                    </div>
                  </div>
                </div>

                <div className="materiel-details">
                  <div className="detail-item">
                    <span className="detail-icon">📂</span>
                    <span className="detail-text">{item.category || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📦</span>
                    <span className="detail-text">{item.depotName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{item.depotLocation}</span>
                  </div>
                </div>

                <div className="materiel-info">
                  <div className="info-item">
                    <span className="info-label">Quantité</span>
                    <span className="info-value">{item.quantity}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Valeur</span>
                    <span className="info-value">{item.value} €</span>
                  </div>
                </div>

                {item.description && (
                  <div className="materiel-description">
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredMateriel.length === 0 && (
            <div className="empty-state">
              <p>Aucun matériel trouvé</p>
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

      {/* Material Details Modal */}
      {showModal && selectedMaterial && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMaterial.name}</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Code</h3>
                <p>{selectedMaterial.code}</p>
              </div>

              <div className="modal-section">
                <h3>Quantité</h3>
                <p className="modal-value">{selectedMaterial.quantity}</p>
                <span className="modal-unit">Min: 5</span>
              </div>

              <div className="modal-section">
                <h3>Valeur unitaire</h3>
                <p className="modal-value">{selectedMaterial.value} €</p>
                <span className="modal-total">Total: {(selectedMaterial.value * selectedMaterial.quantity).toLocaleString('fr-FR')} €</span>
              </div>

              <div className="modal-section">
                <h3>Catégorie</h3>
                <p>{selectedMaterial.category || 'N/A'}</p>
              </div>

              <div className="modal-section">
                <h3>Dépôt</h3>
                <p>{selectedMaterial.depotName}</p>
              </div>

              {selectedMaterial.description && (
                <div className="modal-section">
                  <h3>Description</h3>
                  <p>{selectedMaterial.description}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="modal-btn modal-btn-edit">Modifier</button>
              <button className="modal-btn modal-btn-delete">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materiel;
