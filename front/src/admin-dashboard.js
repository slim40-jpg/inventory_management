import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import './dashboard.css'; // Reuse same styles
import './admin.css'; // We'll create specific admin styles

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDepots: 0,
    totalCompanies: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Set up authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // Check if user is admin
      if (storedUser.role !== 'admin') {
        navigate('/dashboard'); // Redirect non-admins to regular dashboard
      }
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch admin data
  useEffect(() => {
    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch users and stats in parallel
      const [usersResponse, statsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/users/all`),
        axios.get(`${API_URL}/api/admin/stats`)
      ]);

      setUsers(usersResponse.data.data || usersResponse.data);
      
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

    } catch (err) {
      console.error('Error fetching admin data:', err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else if (err.response?.status === 403) {
        setError('Admin privileges required');
        navigate('/dashboard');
      } else {
        setError('Error loading admin dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.entreprise.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/users/${editingUser.id}`,
        editingUser
      );
      
      if (response.data.success) {
        // Update local users list
        setUsers(users.map(u => 
          u.id === editingUser.id ? response.data.data : u
        ));
        setEditingUser(null);
        alert('User updated successfully');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Error updating user');
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/users/${userToDelete.id}`
      );
      
      if (response.data.success) {
        // Remove user from local list
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
        alert('User deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user');
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCreateUser = () => {
    navigate('/register?admin=true'); // You can create a special admin registration form
  };

  const quickCards = [
    { 
      icon: '👥', 
      title: 'Total Users', 
      id: 'users',
      count: stats.totalUsers || 0,
      subtitle: 'Registered',
      color: 'blue'
    },
    { 
      icon: '🏢', 
      title: 'Companies', 
      id: 'companies',
      count: stats.totalCompanies || 0,
      subtitle: 'Active',
      color: 'green'
    },
    { 
      icon: '📦', 
      title: 'Depots', 
      id: 'depots',
      count: stats.totalDepots || 0,
      subtitle: 'Managed',
      color: 'purple'
    },
    { 
      icon: '✅', 
      title: 'Active Users', 
      id: 'active',
      count: stats.activeUsers || 0,
      subtitle: 'Last 30 days',
      color: 'orange'
    }
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar activePage="admin" />
        <main className="dashboard-main">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Admin Dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar activePage="admin" />
      
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <div className="user-profile">
              <span className="user-name">{user?.username || 'Admin'}</span>
              <div className="user-avatar admin">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="user-dropdown">
                <button onClick={() => navigate('/dashboard')}>👤 Switch to User View</button>
                <button onClick={() => navigate('/profile')}>⚙️ Profile Settings</button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-avatar admin">
              👑
            </div>
            <div className="welcome-text">
              <h2>Welcome, Admin {user?.username}!</h2>
              <p className="user-role">Administrator Dashboard</p>
              <p className="user-company">
                Managing {stats.totalCompanies || 0} companies
              </p>
            </div>
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              {quickCards.map((card) => (
                <div
                  key={card.id}
                  className={`stat-card ${card.color}`}
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

          {/* User Management Section */}
          <section className="admin-section">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="section-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="role-filter"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
                <button 
                  className="btn-primary"
                  onClick={handleCreateUser}
                >
                  + Add New User
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userItem) => (
                    <tr key={userItem.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar small">
                            {userItem.username.charAt(0).toUpperCase()}
                          </div>
                          {userItem.username}
                        </div>
                      </td>
                      <td>{userItem.email}</td>
                      <td>{userItem.entreprise}</td>
                      <td>
                        <span className={`role-badge ${userItem.role}`}>
                          {userItem.role}
                        </span>
                      </td>
                      <td>{userItem.phone_number || 'N/A'}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditUser(userItem)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteClick(userItem)}
                            disabled={userItem.id === user.id} // Can't delete yourself
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="empty-state">
                  <p>No users found</p>
                </div>
              )}
            </div>
          </section>

          {/* System Management Section */}
          <section className="admin-section">
            <h2>System Management</h2>
            <div className="system-cards">
              <div className="system-card">
                <div className="system-icon">🔄</div>
                <h3>Backup Database</h3>
                <p>Create a backup of all system data</p>
                <button className="btn-secondary">Backup Now</button>
              </div>
              <div className="system-card">
                <div className="system-icon">📊</div>
                <h3>System Reports</h3>
                <p>Generate system activity reports</p>
                <button className="btn-secondary">Generate Report</button>
              </div>
              <div className="system-card">
                <div className="system-icon">⚙️</div>
                <h3>System Settings</h3>
                <p>Configure system preferences</p>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate('/admin/settings')}
                >
                  Configure
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <div className="modal-content">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    username: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    email: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    role: e.target.value
                  })}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={editingUser.entreprise}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    entreprise: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSaveUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <div className="modal-content">
              <p>
                Are you sure you want to delete user <strong>{userToDelete.username}</strong>?
              </p>
              <p className="warning-text">
                This action cannot be undone. All user data will be permanently deleted.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={confirmDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;