// src/staff/StaffDashboard.jsxµ
'use client';
import { useState } from 'react';
import Staffsidebar from '@/components/staff/StaffSidebar';
import StaffControl from './Control';
import StaffNotifications from './Notification';
import SettingsPage from './Settings';

const StaffDashboard = ({ currentUser, onLogout, onProfileUpdate }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeFilter, setActiveFilter] = useState('week');

  // Mock data
  const stats = [
    {
      title: 'Energy Consumption',
      icon: '⚡',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: 'var(--primary)',
      value: '2,847 kWh',
      change: '↓ 12%',
      changeLabel: 'vs mois dernier',
      changeType: 'positive'
    },
    {
      title: 'Average Temperature',
      icon: '🌡️',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      iconColor: 'var(--danger)',
      value: '22.5°C',
      change: 'Optimal',
      changeLabel: '',
      changeType: ''
    },
    {
      title: 'Active Workstations',
      icon: '💼',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: 'var(--success)',
      value: '24/32',
      change: '75% d\'occupation',
      changeLabel: '',
      changeType: ''
    },
    {
      title: 'Active Alerts',
      icon: '⚠️',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: 'var(--warning)',
      value: '3',
      change: '+2',
      changeLabel: 'today',
      changeType: 'negative'
    }
  ];

  const chartBars = [60, 75, 55, 85, 70, 45, 30];

  const iotStats = [
    { label: 'Lumières', value: '50%', color: 'var(--primary)' },
    { label: 'Climatisation', value: '37%', color: 'var(--success)' },
    { label: 'Autres', value: '13%', color: 'var(--warning)' }
  ];

  const renderDashboardContent = () => (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today</p>
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
              {stat.changeLabel && <span>{stat.changeLabel}</span>}
            </div>
          </div>
        ))}
      </div>
      
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Energy Consumption</h3>
            <div className="chart-filters">
              <button 
                className={`filter-btn ${activeFilter === 'day' ? 'active' : ''}`}
                onClick={() => setActiveFilter('day')}
              >
                Day
              </button>
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
            </div>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {chartBars.map((height, index) => (
                <div 
                  key={index} 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                />
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
        return <StaffControl />;

      case 'notifications':
        return <StaffNotifications />;

      case 'settings':
        return (
          <SettingsPage
            currentUser={currentUser}
            onLogout={onLogout}
            onProfileUpdate={onProfileUpdate}
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
      <Staffsidebar 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={
          currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : 'Staff'
        }
        currentUser={currentUser} // ✅ Pass entire user object
        onLogout={onLogout}
      />

      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default StaffDashboard;