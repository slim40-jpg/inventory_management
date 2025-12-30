import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './user_management.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [notifications, setNotifications] = useState({ count: 0 });
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedUserActivity, setSelectedUserActivity] = useState(null);
  const [inviteFormData, setInviteFormData] = useState({
    fullName: '',
    email: '',
    role: 'Staff',
    phone: ''
  });

  const roles = ['Administrateur', 'Staff', 'Manager'];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username || '');
      setUserInitial(user.username ? user.username.charAt(0).toUpperCase() : '');
    }

    // Load users from localStorage
    const userId = user?.username;
    const savedUsers = localStorage.getItem(`users_${userId}`);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with some default users
      const defaultUsers = [
        {
          id: 1,
          fullName: 'Marie Dubois',
          email: 'marie@eventpro.com',
          role: 'Administrateur',
          phone: '+33 6 12 34 56 78',
          status: 'Actif',
          lastLogin: '08/11/2025 10:30',
          actions: 245,
          joinDate: '01/01/2023'
        },
        {
          id: 2,
          fullName: 'Jean Martin',
          email: 'jean.martin@eventpro.com',
          role: 'Staff',
          phone: '+33 6 23 45 67 89',
          status: 'Actif',
          lastLogin: '08/11/2025 09:15',
          actions: 128,
          joinDate: '15/03/2023'
        },
        {
          id: 3,
          fullName: 'Sophie Bernard',
          email: 'sophie.bernard@eventpro.com',
          role: 'Staff',
          phone: '+33 6 34 56 78 90',
          status: 'Actif',
          lastLogin: '07/11/2025 16:45',
          actions: 94,
          joinDate: '20/05/2023'
        },
        {
          id: 4,
          fullName: 'Pierre Leroy',
          email: 'pierre.leroy@eventpro.com',
          role: 'Staff',
          phone: '+33 6 45 67 89 01',
          status: 'Actif',
          lastLogin: '07/11/2025 14:20',
          actions: 156,
          joinDate: '10/07/2023'
        },
        {
          id: 5,
          fullName: 'Claire Moreau',
          email: 'claire.moreau@eventpro.com',
          role: 'Staff',
          phone: '+33 6 56 78 90 12',
          status: 'Inactif',
          lastLogin: '25/10/2025 11:30',
          actions: 67,
          joinDate: '05/09/2023'
        }
      ];
      setUsers(defaultUsers);
      localStorage.setItem(`users_${userId}`, JSON.stringify(defaultUsers));
    }

    // Load invitations
    const savedInvitations = localStorage.getItem(`invitations_${userId}`);
    if (savedInvitations) {
      const invits = JSON.parse(savedInvitations);
      setInvitations(invits);
      setNotifications({ count: invits.length });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleInviteUser = () => {
    if (!inviteFormData.fullName || !inviteFormData.email || !inviteFormData.role || !inviteFormData.phone) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteFormData.email)) {
      alert('Veuillez entrer une adresse email valide');
      return;
    }

    const newInvitation = {
      id: Date.now(),
      fullName: inviteFormData.fullName,
      email: inviteFormData.email,
      role: inviteFormData.role,
      phone: inviteFormData.phone,
      status: 'En attente',
      sentDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    const updatedInvitations = [newInvitation, ...invitations];
    setInvitations(updatedInvitations);
    setNotifications({ count: updatedInvitations.length });

    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`invitations_${userId}`, JSON.stringify(updatedInvitations));

    // Reset form
    setInviteFormData({
      fullName: '',
      email: '',
      role: 'Staff',
      phone: ''
    });
    setShowInviteModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);

      const user = JSON.parse(localStorage.getItem('user'));
      const currentUserId = user?.username;
      localStorage.setItem(`users_${currentUserId}`, JSON.stringify(updatedUsers));
    }
  };

  const handleViewActivity = (user) => {
    setSelectedUserActivity(user);
    setShowActivityModal(true);
  };

  const handleCancelInvitation = (invitationId) => {
    const updatedInvitations = invitations.filter(inv => inv.id !== invitationId);
    setInvitations(updatedInvitations);
    setNotifications({ count: updatedInvitations.length });

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`invitations_${userId}`, JSON.stringify(updatedInvitations));
  };

  const handleAcceptInvitation = (invitationId) => {
    const invitation = invitations.find(inv => inv.id === invitationId);
    if (!invitation) return;

    // Create new user from invitation
    const newUser = {
      id: Date.now(),
      fullName: invitation.fullName,
      email: invitation.email,
      role: invitation.role,
      phone: invitation.phone,
      status: 'Actif',
      lastLogin: new Date().toISOString().split('T')[0],
      actions: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);

    const updatedInvitations = invitations.filter(inv => inv.id !== invitationId);
    setInvitations(updatedInvitations);
    setNotifications({ count: updatedInvitations.length });

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.username;
    localStorage.setItem(`users_${userId}`, JSON.stringify(updatedUsers));
    localStorage.setItem(`invitations_${userId}`, JSON.stringify(updatedInvitations));
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalMembers: users.length,
    staff: users.filter(u => u.role === 'Staff').length,
    administrators: users.filter(u => u.role === 'Administrateur').length,
    invitations: invitations.length
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getStatusBadgeColor = (status) => {
    return status === 'Actif' ? 'status-active' : 'status-inactive';
  };

  return (
    <div className="user-management-container">
      {/* Sidebar */}
      <Sidebar activePage="users" />

      {/* Main Content */}
      <main className="user-management-main">
        {/* Header */}
        <header className="user-management-header">
          <h1>Gestion des utilisateurs</h1>
          <div className="header-actions">
            <button className="notification-btn" title="Invitations">
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
        <div className="user-management-content">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Rechercher un membre de l'équipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-invite" onClick={() => setShowInviteModal(true)}>
              ✉️ Inviter un staff
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total membres</h3>
                <p className="stat-number">{stats.totalMembers}</p>
                <span className="stat-detail">{stats.totalMembers} actifs</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👔</div>
              <div className="stat-content">
                <h3>Staff</h3>
                <p className="stat-number">{stats.staff}</p>
                <span className="stat-detail">Membres de l'équipe</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍💼</div>
              <div className="stat-content">
                <h3>Administrateur</h3>
                <p className="stat-number">{stats.administrators}</p>
                <span className="stat-detail">Un par entreprise</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📬</div>
              <div className="stat-content">
                <h3>Invitations</h3>
                <p className="stat-number">{stats.invitations}</p>
                <span className="stat-detail">En attente</span>
              </div>
            </div>
          </div>

          {/* Pending Invitations */}
          {invitations.length > 0 && (
            <div className="pending-invitations-section">
              <h2>Invitations en attente</h2>
              <div className="invitations-grid">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="invitation-card">
                    <div className="invitation-avatar">
                      {getInitials(invitation.fullName)}
                    </div>
                    <div className="invitation-info">
                      <h3>{invitation.fullName}</h3>
                      <p className="invitation-email">{invitation.email}</p>
                      <p className="invitation-role">{invitation.role}</p>
                      <p className="invitation-meta">Envoyée le: {invitation.sentDate}</p>
                      <p className="invitation-expiry">Expire le: {invitation.expiryDate}</p>
                    </div>
                    <div className="invitation-actions">
                      <button 
                        className="btn-accept"
                        onClick={() => handleAcceptInvitation(invitation.id)}
                      >
                        ✓ Accepter
                      </button>
                      <button 
                        className="btn-cancel"
                        onClick={() => handleCancelInvitation(invitation.id)}
                      >
                        ✕ Annuler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Grid */}
          <div className="users-section">
            <h2>Membres de l'équipe</h2>
            <div className="users-grid">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-card-header">
                      <div className="user-avatar-large">{getInitials(user.fullName)}</div>
                      <div className="user-title">
                        <h3>{user.fullName}</h3>
                        <p className="user-email">{user.email}</p>
                      </div>
                      <span className={`role-badge ${user.role.toLowerCase().replace(' ', '-')}`}>
                        {user.role}
                      </span>
                    </div>

                    <div className="user-card-body">
                      <div className="user-info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{user.phone}</span>
                      </div>
                      <div className="user-info-item">
                        <span className="info-label">Dernière connexion</span>
                        <span className="info-value">{user.lastLogin}</span>
                      </div>
                      <div className="user-info-item">
                        <span className="info-label">Actions</span>
                        <span className="info-value">{user.actions}</span>
                      </div>
                      <div className="user-status">
                        <span className={`status-badge ${getStatusBadgeColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>

                    <div className="user-card-footer">
                      <button 
                        className="btn-view-activity"
                        onClick={() => handleViewActivity(user)}
                      >
                        👁️ Activité
                      </button>
                      <button 
                        className="btn-delete-user"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Supprimer cet utilisateur"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>Aucun utilisateur trouvé</p>
                </div>
              )}
            </div>
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

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Inviter un staff</h2>
              <button className="modal-close" onClick={() => setShowInviteModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  type="text"
                  placeholder="ex: Jean Dupont"
                  value={inviteFormData.fullName}
                  onChange={(e) => setInviteFormData({...inviteFormData, fullName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="ex: jean@example.com"
                  value={inviteFormData.email}
                  onChange={(e) => setInviteFormData({...inviteFormData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Rôle *</label>
                <select
                  value={inviteFormData.role}
                  onChange={(e) => setInviteFormData({...inviteFormData, role: e.target.value})}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Téléphone *</label>
                <input
                  type="tel"
                  placeholder="ex: +33 6 12 34 56 78"
                  value={inviteFormData.phone}
                  onChange={(e) => setInviteFormData({...inviteFormData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowInviteModal(false)}>
                Annuler
              </button>
              <button className="btn-submit" onClick={handleInviteUser}>
                Envoyer Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && selectedUserActivity && (
        <div className="modal-overlay" onClick={() => setShowActivityModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="activity-header-content">
                <h2>Activité de {selectedUserActivity.fullName}</h2>
                <p className="activity-email">{selectedUserActivity.email}</p>
              </div>
              <button className="modal-close" onClick={() => setShowActivityModal(false)}>✕</button>
            </div>

            <div className="modal-body activity-body">
              <div className="activity-stats">
                <div className="activity-stat">
                  <span className="activity-stat-label">Nombre d'actions</span>
                  <span className="activity-stat-value">{selectedUserActivity.actions}</span>
                </div>
                <div className="activity-stat">
                  <span className="activity-stat-label">Dernière connexion</span>
                  <span className="activity-stat-value">{selectedUserActivity.lastLogin}</span>
                </div>
                <div className="activity-stat">
                  <span className="activity-stat-label">Date d'adhésion</span>
                  <span className="activity-stat-value">{selectedUserActivity.joinDate}</span>
                </div>
                <div className="activity-stat">
                  <span className="activity-stat-label">Statut</span>
                  <span className={`activity-stat-value status-badge ${getStatusBadgeColor(selectedUserActivity.status)}`}>
                    {selectedUserActivity.status}
                  </span>
                </div>
              </div>

              <div className="activity-timeline">
                <h3>Historique des actions</h3>
                <div className="timeline-content">
                  <div className="timeline-item">
                    <div className="timeline-date">08/11/2025</div>
                    <div className="timeline-event">
                      <p className="timeline-title">Création de réservation</p>
                      <p className="timeline-description">Réservation créée pour "Festival Rock en Seine"</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">07/11/2025</div>
                    <div className="timeline-event">
                      <p className="timeline-title">Modification de dépôt</p>
                      <p className="timeline-description">Adresse du dépôt "Paris Nord" modifiée</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-date">06/11/2025</div>
                    <div className="timeline-event">
                      <p className="timeline-title">Ajout de matériel</p>
                      <p className="timeline-description">2 nouveaux articles ajoutés aux stocks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowActivityModal(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
