// src/pages/staff/Notification.jsx
'use client';
const StaffNotifications = () => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'critical',
      icon: '🚨',
      title: 'Critical -Temperature - Salle B',
      message: 'La température a dépassé le seuil de 28°C. Intervention requise.',
      time: 'Il y a 5 minutes'
    },
    {
      id: 2,
      type: 'warning',
      icon: '⚠️',
      title: 'High Energy Consumption Detected',
      message: 'The workstation A-15 consumes 15% above the normal average.',
      time: '1 Hour ago'
    },
    {
      id: 3,
      type: 'info',
      icon: 'ℹ️',
      title: 'Scheduled Maintenance',
      message: 'Maintenance of the HVAC system scheduled for tomorrow at 14h00.',
      time: '3 hours ago'
    },
    {
      id: 4,
      type: 'info',
      icon: '✅',
      title: 'System Update Completed',
      message: 'All IoT modules have been successfully updated to version 2.4.1.',
      time: 'Yesterday at 22:30'
    },
    {
      id: 5,
      type: 'warning',
      icon: '🔋',
      title: 'Low Battery - Sensor #47',
      message: 'The temperature sensor in office C-08 requires a battery replacement.',
      time: 'Yesterday at 16:45'
    }
  ];

  return (
    <div className="page-content active">
      <div className="page-header">
        <h1>Notifications & Alertes</h1>
        <p>Restez informé en temps réel</p>
      </div>
      
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
    </div>
  );
};

export default StaffNotifications;