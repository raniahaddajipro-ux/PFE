// src/pages/admin/Adminnotifications.jsx
/**
 * AdminNotifications Component
 * Page de gestion des notifications système
 * Affiche toutes les alertes et notifications importantes
 */
'use client';
function AdminNotifications() {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'critical',
      icon: '🚨',
      title: 'Critical Temperature Alert',
      message: 'Server room temperature exceeds safe limits (32°C)',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'warning',
      icon: '⚠️',
      title: 'High Energy Consumption',
      message: 'Building A consuming 15% more energy than usual',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'info',
      icon: 'ℹ️',
      title: 'System Update Available',
      message: 'A new firmware update is available for HVAC controllers',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'warning',
      icon: '⚠️',
      title: 'Device Offline',
      message: 'Camera #7 has been offline for 30 minutes',
      time: '1 hour ago',
    },
    {
      id: 5,
      type: 'info',
      icon: 'ℹ️',
      title: 'Scheduled Maintenance',
      message: 'Lighting system maintenance scheduled for tomorrow at 3 AM',
      time: '3 hours ago',
    },
    {
      id: 6,
      type: 'critical',
      icon: '🚨',
      title: 'Security Alert',
      message: 'Unauthorized access attempt detected on Floor 3',
      time: '5 hours ago',
    },
    {
      id: 7,
      type: 'info',
      icon: 'ℹ️',
      title: 'Backup Completed',
      message: 'System backup completed successfully',
      time: 'Yesterday',
    },
    {
      id: 8,
      type: 'warning',
      icon: '⚠️',
      title: 'Low Battery Warning',
      message: 'Emergency lighting system battery at 20%',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="page-content active">
      {/* Page Header */}
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Stay updated with system alerts and events</p>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${notification.type}`}
          >
            <div className={`notification-icon ${notification.type}`}>
              {notification.icon}
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Stats */}
      <div className="chart-card" style={{ marginTop: '32px' }}>
        <div className="chart-header">
          <h3>Notification Summary</h3>
        </div>
        <div className="energy-stats">
          <div className="energy-stat">
            <div className="label">Total</div>
            <div className="value">{notifications.length}</div>
          </div>
          <div className="energy-stat">
            <div className="label">Critical</div>
            <div className="value" style={{ color: 'var(--danger)' }}>
              {notifications.filter((n) => n.type === 'critical').length}
            </div>
          </div>
          <div className="energy-stat">
            <div className="label">Warnings</div>
            <div className="value" style={{ color: 'var(--warning)' }}>
              {notifications.filter((n) => n.type === 'warning').length}
            </div>
          </div>
          <div className="energy-stat">
            <div className="label">Info</div>
            <div className="value" style={{ color: 'var(--primary)' }}>
              {notifications.filter((n) => n.type === 'info').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;