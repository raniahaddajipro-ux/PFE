// src/admin/AdminDashboard.jsx
'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/admin/Adminsidebar';
import AdminControl from './Admincontrol';
import AdminNotifications from './Adminnotifications';
import AdminReports from './Adminreports';
import AdminUsers from './Adminusers';
import AdminSettings from './Adminsettings';
/**
 * AdminDashboard Component
 * Page principale pour l'administrateur avec sidebar et navigation
 * Structure identique à StaffDashboard
 */
const AdminDashboard = ({ currentUser, onLogout, onProfileUpdate }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState('week');

  // Mock data for stats
  const stats = [
    {
      title: 'Total Users',
      value: '847',
      change: '+12.5%',
      changeType: 'positive',
      icon: '👥',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: 'var(--primary)',
    },
    {
      title: 'Active Devices',
      value: '152',
      change: '+8.2%',
      changeType: 'positive',
      icon: '🎛️',
      iconBg: 'rgba(37, 99, 235, 0.1)',
      iconColor: '#2563eb',
    },
    {
      title: 'Energy Saved',
      value: '2.4 MWh',
      change: '+15.3%',
      changeType: 'positive',
      icon: '⚡',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: 'var(--success)',
    },
    {
      title: 'Total Alerts',
      value: '23',
      change: '-5.1%',
      changeType: 'negative',
      icon: '🔔',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      iconColor: 'var(--danger)',
    },
  ];

  // Mock data for chart bars
  const chartData = [
    { label: 'Mon', height: '60%' },
    { label: 'Tue', height: '80%' },
    { label: 'Wed', height: '50%' },
    { label: 'Thu', height: '70%' },
    { label: 'Fri', height: '90%' },
    { label: 'Sat', height: '65%' },
    { label: 'Sun', height: '45%' },
  ];
  const iotStats = [
    { label: 'Lumières', value: '50%', color: 'var(--primary)' },
    { label: 'Climatisation', value: '37%', color: 'var(--success)' },
    { label: 'Autres', value: '13%', color: 'var(--warning)' }
  ];

  const renderDashboardContent = () => (
  <>
    <div className="page-header">
      <h1>Dashboard</h1>
      <p>Welcome back! Here's what's happening today.</p>
    </div>

    <div className="dashboard-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <h3>{stat.title}</h3>
            <div
              className="stat-icon"
              style={{ background: stat.iconBg, color: stat.iconColor }}
            >
              {stat.icon}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.changeType}`}>
            <span>{stat.change}</span>
            <span> from last month</span>
          </div>
        </div>
      ))}
    </div>

    <div className="charts-section">
      {/* Existing Energy Consumption chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Energy Consumption</h3>
          <div className="chart-filters">
            <button
              className={`filter-btn ${activeFilter === 'week' ? 'active' : ''}`}
              onClick={() => setActiveFilter('week')}
            >
              Week
            </button>
            <button
              className={`filter-btn ${activeFilter === 'month' ? 'active' : ''}`}
              onClick={() => setActiveFilter('month')}
            >
              Month
            </button>
            <button
              className={`filter-btn ${activeFilter === 'year' ? 'active' : ''}`}
              onClick={() => setActiveFilter('year')}
            >
              Year
            </button>
          </div>
        </div>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {chartData.map((bar, index) => (
              <div
                key={index}
                className="chart-bar"
                style={{ height: bar.height }}
                title={bar.label}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-header">
          <h3>IoT Distribution</h3>
        </div>
        <div className="chart-placeholder">
          <svg viewBox="0 0 200 200" style={{ width: '200px', height: '200px' }}>
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="var(--primary)" 
              strokeWidth="40" 
              strokeDasharray="251 502" 
              transform="rotate(-90 100 100)"
            />
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="var(--success)" 
              strokeWidth="40" 
              strokeDasharray="188 502" 
              strokeDashoffset="-251" 
              transform="rotate(-90 100 100)"
            />
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="var(--warning)" 
              strokeWidth="40" 
              strokeDasharray="63 502" 
              strokeDashoffset="-439" 
              transform="rotate(-90 100 100)"
            />
            <text 
              x="100" 
              y="95" 
              textAnchor="middle" 
              fontSize="28" 
              fontWeight="bold" 
              fill="var(--text-title)"
            >
              32
            </text>
            <text 
              x="100" 
              y="115" 
              textAnchor="middle" 
              fontSize="12" 
              fill="var(--text-body)"
            >
              Modules
            </text>
          </svg>
        </div>
        <div className="energy-stats">
          {iotStats.map((stat, index) => (
            <div key={index} className="energy-stat">
              <div className="label">{stat.label}</div>
              <div className="value" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="page-content active">
            {renderDashboardContent()}
          </div>
        );

      case 'control':
        return <AdminControl />;

      case 'notifications':
        return <AdminNotifications />;

      case 'reports':
        return <AdminReports />;

      case 'users':
        return <AdminUsers />;

      case 'settings':
        return (
          <AdminSettings
            currentUser={currentUser}
            onLogout={onLogout}
            onProfileUpdate={onProfileUpdate}  // ✅ Passes the update handler
          />
        );

      default:
        return (
          <div className="page-content active">
            {renderDashboardContent()}
          </div>
        );
    }
  };

  return (
    <div className="app-container active">
      <AdminSidebar
        currentUser={currentUser} // ✅ Pass entire user object
        userName={`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={onLogout}
      />

      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;