'use client';
import { useState } from 'react';

/**
 * AdminUsers Component
 * Page de gestion des utilisateurs (Admin uniquement)
 * Permet d'ajouter, modifier et supprimer des utilisateurs
 */
function AdminUsers() {
  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Mansouri',
      initials: 'AM',
      email: 'ahmed.m@sems.tn',
      role: 'admin',
      status: 'active',
      lastLogin: "Today, 09:23",
    },
    {
      id: 2,
      name: 'Sara Karoui',
      initials: 'SK',
      email: 'sara.k@sems.tn',
      role: 'staff',
      status: 'active',
      lastLogin: "Today, 08:45",
    },
    {
      id: 3,
      name: 'Mohamed Ben Ali',
      initials: 'MB',
      email: 'mohamed.b@sems.tn',
      role: 'staff',
      status: 'active',
      lastLogin: "Yesterday, 17:30",
    },
    {
      id: 4,
      name: 'Leila Trabelsi',
      initials: 'LT',
      email: 'leila.t@sems.tn',
      role: 'staff',
      status: 'offline',
      lastLogin: "2 days ago",
    },
  ]);

  const handleAddUser = () => {
    alert('Add user functionality - Modal would appear here');
  };

  const handleEditUser = (userId) => {
    alert(`Edit user ${userId} - Modal would appear here`);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="page-content active">
      {/* Page Header */}
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage system access and user permissions</p>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <div className="table-header">
          <h3>User List</h3>
          <button className="btn-add" onClick={handleAddUser}>
            <span>+</span>
            <span>New User</span>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-small">{user.initials}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'admin' : 'officer'}`}>
                    {user.role === 'admin' ? 'Administrator' : 'Officer'}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      color: user.status === 'active' ? 'var(--success)' : 'var(--text-body)',
                    }}
                  >
                    ● {user.status === 'active' ? 'Active' : 'Offline'}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEditUser(user.id)}>
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Stats */}
      <div className="dashboard-grid" style={{ marginTop: '32px' }}>
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Users</h3>
            <div
              className="stat-icon"
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)' }}
            >
              👥
            </div>
          </div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-change positive">
            <span>System registered users</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Administrators</h3>
            <div
              className="stat-icon"
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)' }}
            >
              👑
            </div>
          </div>
          <div className="stat-value">{users.filter((u) => u.role === 'admin').length}</div>
          <div className="stat-change">
            <span>Admin accounts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Staff Members</h3>
            <div
              className="stat-icon"
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}
            >
              👨‍💼
            </div>
          </div>
          <div className="stat-value">{users.filter((u) => u.role === 'staff').length}</div>
          <div className="stat-change">
            <span>Officer accounts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Now</h3>
            <div
              className="stat-icon"
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}
            >
              ✓
            </div>
          </div>
          <div className="stat-value">{users.filter((u) => u.status === 'active').length}</div>
          <div className="stat-change positive">
            <span>Currently online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;