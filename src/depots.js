import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './depots.css';

const Depots = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [depots, setDepots] = useState([]);
  const [notifications] = useState({
    count: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [editingDepotId, setEditingDepotId] = useState(null);
  const [highlightedDepotId, setHighlightedDepotId] = useState(null);
  const [showMaterielModal, setShowMaterielModal] = useState(false);
  const [selectedDepotForMaterial, setSelectedDepotForMaterial] = useState(null);
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
  const [materielFormData, setMaterielFormData] = useState({
    name: '',
    code: '',
    quantity: '',
    value: '',
    description: ''
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

    // Check if a specific depot should be highlighted
    const depotParam = searchParams.get('depot');
    if (depotParam) {
      setHighlightedDepotId(parseInt(depotParam));
      // Scroll to the highlighted depot after a brief delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(`depot-${depotParam}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleDeleteDepot = (id) => {
    const depotToDelete = depots.find(depot => depot.id === id);
    const updatedDepots = depots.filter(depot => depot.id !== id);
    setDepots(updatedDepots);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));
    
    // Create movement entries for each material in the deleted depot
    if (depotToDelete && depotToDelete.materials && depotToDelete.materials.length > 0) {
      const savedMovements = localStorage.getItem(`movements_${userId}`);
      const movements = savedMovements ? JSON.parse(savedMovements) : [];
      
      // Create a "Sortie" (Exit) movement for each material
      depotToDelete.materials.forEach(material => {
        const newMovement = {
          id: Date.now() + Math.random(),
          date: new Date().toISOString().split('T')[0],
          time: new Date().toTimeString().split(' ')[0],
          type: 'Sortie',
          material: material.name,
          code: material.code,
          quantity: material.quantity,
          source: depotToDelete.name,
          destination: 'Suppression',
          user: userName,
          reason: 'Suppression du dépôt'
        };
        movements.unshift(newMovement);
      });
      
      localStorage.setItem(`movements_${userId}`, JSON.stringify(movements));
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('materialAdded', { detail: { updatedDepots } }));
  };

  const handleAddDepot = () => {
    if (!formData.name || !formData.address || !formData.region || !formData.manager || !formData.capacityTotal || !formData.capacityUsed || !formData.stockType || !formData.expirationDate) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (editingDepotId) {
      // Update existing depot
      const existingDepot = depots.find(d => d.id === editingDepotId);
      const addressChanged = existingDepot && existingDepot.address !== formData.address;
      
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
      
      // If address changed and depot has materials, create transfer movements
      if (addressChanged && existingDepot.materials && existingDepot.materials.length > 0) {
        const savedMovements = localStorage.getItem(`movements_${userId}`);
        const movements = savedMovements ? JSON.parse(savedMovements) : [];
        
        // Create a "Transfert" (Transfer) movement for each material
        existingDepot.materials.forEach(material => {
          const newMovement = {
            id: Date.now() + Math.random(),
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0],
            type: 'Transfert',
            material: material.name,
            code: material.code,
            quantity: material.quantity,
            source: existingDepot.address,
            destination: formData.address,
            user: userName,
            reason: `Changement d'adresse du dépôt ${existingDepot.name}`
          };
          movements.unshift(newMovement);
        });
        
        localStorage.setItem(`movements_${userId}`, JSON.stringify(movements));
      }
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('materialAdded', { detail: { updatedDepots } }));
      
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
        capacity: { used: parseInt(formData.capacityUsed), total: parseInt(formData.capacityTotal) },
        materials: []
      };

      const updatedDepots = [...depots, newDepot];
      setDepots(updatedDepots);
      
      // Save to localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.username;
      localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('materialAdded', { detail: { updatedDepots } }));
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

  const handleMaterielInputChange = (e) => {
    const { name, value } = e.target;
    setMaterielFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMaterielToDepot = () => {
    if (!materielFormData.name || !materielFormData.code || !materielFormData.quantity || !materielFormData.value) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    const selectedDepot = depots.find(d => d.id === selectedDepotForMaterial);

    const updatedDepots = depots.map(depot =>
      depot.id === selectedDepotForMaterial
        ? {
            ...depot,
            materials: [
              ...(depot.materials || []),
              {
                id: Math.max(...(depot.materials?.map(m => m.id) || [0]), 0) + 1,
                name: materielFormData.name,
                code: materielFormData.code,
                quantity: parseInt(materielFormData.quantity),
                value: parseFloat(materielFormData.value),
                description: materielFormData.description
              }
            ]
          }
        : depot
    );
    setDepots(updatedDepots);

    // Save to localStorage
    localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));

    // Create a movement entry for this material addition
    const newMovement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      type: 'Entrée',
      material: materielFormData.name,
      code: materielFormData.code,
      quantity: parseInt(materielFormData.quantity),
      source: 'Nouveau Stock',
      destination: selectedDepot?.name,
      user: userName,
      reason: 'Ajout de matériel au dépôt'
    };

    // Save movement to localStorage
    const savedMovements = localStorage.getItem(`movements_${userId}`);
    const movements = savedMovements ? JSON.parse(savedMovements) : [];
    movements.unshift(newMovement); // Add to beginning for newest first
    localStorage.setItem(`movements_${userId}`, JSON.stringify(movements));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('materialAdded', { detail: { updatedDepots } }));

    setMaterielFormData({ name: '', code: '', quantity: '', value: '', description: '' });
    setShowMaterielModal(false);
  };

  const handleDeleteMaterial = (depotId, materialId) => {
    const updatedDepots = depots.map(depot =>
      depot.id === depotId
        ? {
            ...depot,
            materials: depot.materials.filter(m => m.id !== materialId)
          }
        : depot
    );
    setDepots(updatedDepots);

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`depots_${userId}`, JSON.stringify(updatedDepots));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('materialAdded', { detail: { updatedDepots } }));
  };

  const filteredDepots = depots.filter(depot =>
    depot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    depot.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCapacityPercent = (used, total) => Math.round((used / total) * 100);

  return (
    <div className="depots-container">
      {/* Sidebar */}
      <Sidebar activePage="depots" />

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
              <div
                key={depot.id}
                id={`depot-${depot.id}`}
                className={`depot-card ${highlightedDepotId === depot.id ? 'highlighted' : ''}`}
              >
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

                {/* Materials Section */}
                <div className="depot-materials">
                  <div className="materials-header">
                    <span className="materials-title">📦 Matériel ({(depot.materials || []).length})</span>
                    <button
                      className="btn-add-material"
                      onClick={() => {
                        setSelectedDepotForMaterial(depot.id);
                        setMaterielFormData({ name: '', code: '', quantity: '', value: '', description: '' });
                        setShowMaterielModal(true);
                      }}
                    >
                      +
                    </button>
                  </div>
                  {(depot.materials || []).length > 0 && (
                    <div className="materials-list">
                      {(depot.materials || []).map((material) => (
                        <div key={material.id} className="material-item">
                          <div className="material-info">
                            <p className="material-name">{material.name}</p>
                            <p className="material-code">{material.code}</p>
                            <p className="material-qty">Qty: {material.quantity} | {material.value}€</p>
                          </div>
                          <button
                            className="btn-remove-material"
                            onClick={() => handleDeleteMaterial(depot.id, material.id)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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

      {/* Material Modal */}
      {showMaterielModal && (
        <div className="modal-overlay" onClick={() => setShowMaterielModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajouter du matériel</h2>
              <p className="modal-subtitle">Ajouter un nouveau matériel au dépôt</p>
              <button className="modal-close" onClick={() => {
                setShowMaterielModal(false);
                setMaterielFormData({ name: '', code: '', quantity: '', value: '', description: '' });
              }}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nom du matériel *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="ex: Smart Cards"
                  value={materielFormData.name}
                  onChange={handleMaterielInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Code *</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="ex: SC-001"
                    value={materielFormData.code}
                    onChange={handleMaterielInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Quantité *</label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    value={materielFormData.quantity}
                    onChange={handleMaterielInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Valeur unitaire (€) *</label>
                <input
                  type="number"
                  name="value"
                  placeholder="0"
                  step="0.01"
                  value={materielFormData.value}
                  onChange={handleMaterielInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Ajouter une description..."
                  value={materielFormData.description}
                  onChange={handleMaterielInputChange}
                  className="form-input"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowMaterielModal(false);
                setMaterielFormData({ name: '', code: '', quantity: '', value: '', description: '' });
              }}>Annuler</button>
              <button className="btn-create" onClick={handleAddMaterielToDepot}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Depots;
