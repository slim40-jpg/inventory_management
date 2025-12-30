import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './reservations.css';

const Reservations = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [reservations, setReservations] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notifications, setNotifications] = useState({ count: 0 });
  const [showModal, setShowModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    clientName: '',
    eventDate: '',
    depotLocation: '',
    materialType: '',
    articleCount: '',
    status: 'en attente'
  });
  const [requestFormData, setRequestFormData] = useState({
    eventName: '',
    clientName: '',
    eventDate: '',
    depotLocation: '',
    materialType: '',
    articleCount: ''
  });

  const materialTypes = [
    'Éclairage',
    'Son',
    'Projecteurs',
    'Mobilier',
    'Décoration',
    'Équipement Scénique',
    'Caméras',
    'Câbles & Connectiques',
    'Structures',
    'Autre'
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Load reservations from localStorage
    const userId = user?.username;
    const savedReservations = localStorage.getItem(`reservations_${userId}`);
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }

    // Load pending requests from localStorage
    const savedPendingRequests = localStorage.getItem(`pending_requests_${userId}`);
    if (savedPendingRequests) {
      const requests = JSON.parse(savedPendingRequests);
      setPendingRequests(requests);
      setNotifications({ count: requests.length });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleAddReservation = () => {
    if (!formData.eventName || !formData.clientName || !formData.eventDate || !formData.depotLocation || !formData.materialType || !formData.articleCount) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const newReservation = {
      id: Date.now(),
      eventName: formData.eventName,
      clientName: formData.clientName,
      eventDate: formData.eventDate,
      depotLocation: formData.depotLocation,
      materialType: formData.materialType,
      articleCount: parseInt(formData.articleCount),
      status: 'en attente',
      createdDate: new Date().toISOString().split('T')[0],
      confirmDate: null
    };

    const updatedReservations = [newReservation, ...reservations];
    setReservations(updatedReservations);

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`reservations_${userId}`, JSON.stringify(updatedReservations));

    // Reset form
    setFormData({
      eventName: '',
      clientName: '',
      eventDate: '',
      depotLocation: '',
      materialType: '',
      articleCount: '',
      status: 'en attente'
    });
    setShowModal(false);
  };

  const handleApproveRequest = (requestId) => {
    // Move from pending requests to reservations with "en cours" status
    const requestToApprove = pendingRequests.find(r => r.id === requestId);
    
    const newReservation = {
      ...requestToApprove,
      status: 'en cours',
      createdDate: new Date().toISOString().split('T')[0],
      confirmDate: null
    };

    const updatedReservations = [newReservation, ...reservations];
    setReservations(updatedReservations);

    // Remove from pending requests
    const updatedPendingRequests = pendingRequests.filter(r => r.id !== requestId);
    setPendingRequests(updatedPendingRequests);

    // Update notifications
    setNotifications({ count: updatedPendingRequests.length });

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`reservations_${userId}`, JSON.stringify(updatedReservations));
    localStorage.setItem(`pending_requests_${userId}`, JSON.stringify(updatedPendingRequests));
  };

  const handleRejectRequest = (requestId) => {
    // Move from pending requests to reservations with "refusé" status
    const requestToReject = pendingRequests.find(r => r.id === requestId);
    
    const newReservation = {
      ...requestToReject,
      status: 'refusé',
      createdDate: new Date().toISOString().split('T')[0],
      confirmDate: new Date().toISOString().split('T')[0]
    };

    const updatedReservations = [newReservation, ...reservations];
    setReservations(updatedReservations);

    // Remove from pending requests
    const updatedPendingRequests = pendingRequests.filter(r => r.id !== requestId);
    setPendingRequests(updatedPendingRequests);

    // Update notifications
    setNotifications({ count: updatedPendingRequests.length });

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`reservations_${userId}`, JSON.stringify(updatedReservations));
    localStorage.setItem(`pending_requests_${userId}`, JSON.stringify(updatedPendingRequests));
  };

  const handleConfirmReservation = (reservationId) => {
    // Change from "en cours" to "confirmé"
    const updatedReservations = reservations.map(res =>
      res.id === reservationId
        ? { ...res, status: 'confirmé', confirmDate: new Date().toISOString().split('T')[0] }
        : res
    );
    setReservations(updatedReservations);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`reservations_${userId}`, JSON.stringify(updatedReservations));
  };

  const handleDeleteReservation = (reservationId) => {
    const updatedReservations = reservations.filter(r => r.id !== reservationId);
    setReservations(updatedReservations);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`reservations_${userId}`, JSON.stringify(updatedReservations));
  };

  const handleAddPendingRequest = () => {
    if (!requestFormData.eventName || !requestFormData.clientName || !requestFormData.eventDate || !requestFormData.depotLocation || !requestFormData.materialType || !requestFormData.articleCount) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const newRequest = {
      id: Date.now(),
      eventName: requestFormData.eventName,
      clientName: requestFormData.clientName,
      eventDate: requestFormData.eventDate,
      depotLocation: requestFormData.depotLocation,
      materialType: requestFormData.materialType,
      articleCount: parseInt(requestFormData.articleCount)
    };

    const updatedPendingRequests = [newRequest, ...pendingRequests];
    setPendingRequests(updatedPendingRequests);
    setNotifications({ count: updatedPendingRequests.length });

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`pending_requests_${userId}`, JSON.stringify(updatedPendingRequests));

    setRequestFormData({
      eventName: '',
      clientName: '',
      eventDate: '',
      depotLocation: '',
      materialType: '',
      articleCount: ''
    });
    setShowRequestModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmé':
        return 'status-confirmed';
      case 'en cours':
        return 'status-inprogress';
      case 'en attente':
        return 'status-pending';
      case 'refusé':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmé':
        return '✓';
      case 'en cours':
        return '⏳';
      case 'en attente':
        return '⏱️';
      case 'refusé':
        return '✕';
      default:
        return '⏱️';
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === 'Tous' || reservation.status === filterStatus;
    const matchesSearch = 
      reservation.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.depotLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmé').length,
    inProgress: reservations.filter(r => r.status === 'en cours').length,
    pending: reservations.filter(r => r.status === 'en attente').length,
    rejected: reservations.filter(r => r.status === 'refusé').length
  };

  return (
    <div className="reservations-container">
      {/* Sidebar */}
      <Sidebar activePage="reservations" />

      {/* Main Content */}
      <main className="reservations-main">
        {/* Header */}
        <header className="reservations-header">
          <h1>Réservations</h1>
          <div className="header-actions">
            <button 
              className="notification-btn" 
              title="Nouvelles demandes"
              onClick={() => setShowRequestModal(true)}
            >
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
        <div className="reservations-content">
          {/* Subtitle */}
          <p className="content-subtitle">Gérez les réservations de matériel pour vos événements</p>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Réservations</h3>
              <p className="stat-number">{stats.total}</p>
              <span className="stat-period">Ce mois</span>
            </div>
            <div className="stat-card">
              <h3>Confirmées</h3>
              <p className="stat-number confirmed-color">{stats.confirmed}</p>
              <span className="stat-period">Validées</span>
            </div>
            <div className="stat-card">
              <h3>En Cours</h3>
              <p className="stat-number inprogress-color">{stats.inProgress}</p>
              <span className="stat-period">À traiter</span>
            </div>
            <div className="stat-card">
              <h3>En Attente</h3>
              <p className="stat-number pending-color">{stats.pending}</p>
              <span className="stat-period">À valider</span>
            </div>
          </div>

          {/* Pending Requests Alert */}
          {pendingRequests.length > 0 && (
            <div className="pending-requests-alert">
              <div className="alert-icon">📬</div>
              <div className="alert-content">
                <h4>Nouvelles demandes de réservation</h4>
                <p>Vous avez {pendingRequests.length} demande(s) en attente d'approbation</p>
              </div>
              <button 
                className="alert-action-btn"
                onClick={() => document.getElementById('pending-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Voir les demandes
              </button>
            </div>
          )}

          {/* Pending Requests Section */}
          {pendingRequests.length > 0 && (
            <div id="pending-section" className="pending-requests-section">
              <h2>Demandes en attente</h2>
              <div className="pending-requests-grid">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="pending-request-card">
                    <div className="request-header">
                      <h3>{request.eventName}</h3>
                      <p className="request-id">ID: {request.id}</p>
                    </div>
                    <div className="request-details">
                      <div className="detail-item">
                        <span className="detail-label">Client:</span>
                        <span className="detail-value">{request.clientName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{request.eventDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Dépôt:</span>
                        <span className="detail-value">{request.depotLocation}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Matériel:</span>
                        <span className="detail-value">{request.materialType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Articles:</span>
                        <span className="detail-value">{request.articleCount}</span>
                      </div>
                    </div>
                    <div className="request-actions">
                      <button 
                        className="btn-approve"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        ✓ Accepter
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        ✕ Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="reservations-toolbar">
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
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option>Tous</option>
                  <option>confirmé</option>
                  <option>en cours</option>
                  <option>en attente</option>
                  <option>refusé</option>
                </select>
              </div>
            </div>

            <button className="btn-add-reservation" onClick={() => setShowModal(true)}>
              + Nouvelle réservation
            </button>
          </div>

          {/* Reservations Table */}
          <div className="reservations-table-wrapper">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Événement</th>
                  <th>Client</th>
                  <th>Dates</th>
                  <th>Dépôt</th>
                  <th>Type Matériel</th>
                  <th>Articles</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="event-cell">
                        <div className="event-info">
                          <span className="event-name">{reservation.eventName}</span>
                          <span className="event-date-range">15/06/2025 au 20/06/2025</span>
                        </div>
                      </td>
                      <td className="client-cell">{reservation.clientName}</td>
                      <td className="dates-cell">
                        <div className="date-range">
                          <span>📅 {reservation.eventDate}</span>
                        </div>
                      </td>
                      <td className="depot-cell">{reservation.depotLocation}</td>
                      <td className="material-type-cell">{reservation.materialType}</td>
                      <td className="articles-cell">
                        <strong>{reservation.articleCount} articles</strong>
                      </td>
                      <td className="status-cell">
                        <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                          <span className="status-icon">{getStatusIcon(reservation.status)}</span>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {reservation.status === 'en cours' && (
                          <button 
                            className="btn-action btn-confirm"
                            onClick={() => handleConfirmReservation(reservation.id)}
                            title="Confirmer la réservation"
                          >
                            ✓
                          </button>
                        )}
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteReservation(reservation.id)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-message">
                      Aucune réservation trouvée
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

      {/* Add Reservation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouvelle Réservation</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nom de l'événement *</label>
                <input
                  type="text"
                  placeholder="ex: Festival Rock en Seine"
                  value={formData.eventName}
                  onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Nom du client *</label>
                <input
                  type="text"
                  placeholder="ex: Rock en Seine Productions"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Date de l'événement *</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Lieu de dépôt *</label>
                <input
                  type="text"
                  placeholder="ex: Paris Nord"
                  value={formData.depotLocation}
                  onChange={(e) => setFormData({...formData, depotLocation: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Type de matériel *</label>
                <select
                  value={formData.materialType}
                  onChange={(e) => setFormData({...formData, materialType: e.target.value})}
                >
                  <option value="">-- Sélectionner un type --</option>
                  {materialTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nombre d'articles *</label>
                <input
                  type="number"
                  placeholder="ex: 45"
                  value={formData.articleCount}
                  onChange={(e) => setFormData({...formData, articleCount: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button className="btn-submit" onClick={handleAddReservation}>
                Créer Réservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Pending Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouvelle Demande de Réservation</h2>
              <button className="modal-close" onClick={() => setShowRequestModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nom de l'événement *</label>
                <input
                  type="text"
                  placeholder="ex: Festival Rock en Seine"
                  value={requestFormData.eventName}
                  onChange={(e) => setRequestFormData({...requestFormData, eventName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Nom du client *</label>
                <input
                  type="text"
                  placeholder="ex: Rock en Seine Productions"
                  value={requestFormData.clientName}
                  onChange={(e) => setRequestFormData({...requestFormData, clientName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Date de l'événement *</label>
                <input
                  type="date"
                  value={requestFormData.eventDate}
                  onChange={(e) => setRequestFormData({...requestFormData, eventDate: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Lieu de dépôt *</label>
                <input
                  type="text"
                  placeholder="ex: Paris Nord"
                  value={requestFormData.depotLocation}
                  onChange={(e) => setRequestFormData({...requestFormData, depotLocation: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Type de matériel *</label>
                <select
                  value={requestFormData.materialType}
                  onChange={(e) => setRequestFormData({...requestFormData, materialType: e.target.value})}
                >
                  <option value="">-- Sélectionner un type --</option>
                  {materialTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nombre d'articles *</label>
                <input
                  type="number"
                  placeholder="ex: 45"
                  value={requestFormData.articleCount}
                  onChange={(e) => setRequestFormData({...requestFormData, articleCount: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowRequestModal(false)}>
                Annuler
              </button>
              <button className="btn-submit" onClick={handleAddPendingRequest}>
                Envoyer Demande
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
