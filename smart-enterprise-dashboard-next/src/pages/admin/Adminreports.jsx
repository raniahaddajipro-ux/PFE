// src/pages/admin/Adminreports.jsx
/**
 * AdminReports Component
 * Page de rapports et analyses
 * Affiche les statistiques détaillées et les rapports système
 */
'use client';
function AdminReports() {
  // Mock reports data
  const reports = [
    {
      title: 'Energy Consumption',
      value: '2.4 MWh',
      change: '+15.3%',
      changeType: 'positive',
      icon: '⚡',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: 'var(--success)',
    },
    {
      title: 'Cost Savings',
      value: '$12,450',
      change: '+22.1%',
      changeType: 'positive',
      icon: '💰',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: 'var(--warning)',
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: 'Uptime',
      changeType: 'positive',
      icon: '🔄',
      iconBg: 'rgba(37, 99, 235, 0.1)',
      iconColor: '#2563eb',
    },
    {
      title: 'Resolved Alerts',
      value: '142',
      change: 'this month',
      changeType: 'neutral',
      icon: '✓',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: 'var(--warning)',
    },
  ];

  const monthlyData = [
    { month: 'Jan', energy: 2.1, cost: 10500, alerts: 32 },
    { month: 'Feb', energy: 2.3, cost: 11200, alerts: 28 },
    { month: 'Mar', energy: 2.0, cost: 9800, alerts: 25 },
    { month: 'Apr', energy: 2.2, cost: 10900, alerts: 30 },
    { month: 'May', energy: 2.4, cost: 12450, alerts: 22 },
    { month: 'Jun', energy: 2.5, cost: 13100, alerts: 18 },
  ];

  return (
    <div className="page-content active">
      {/* Page Header */}
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Detailed insights and system performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        {reports.map((stat, index) => (
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
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Performance Chart */}
      <div className="chart-card" style={{ marginTop: '32px' }}>
        <div className="chart-header">
          <h3>Monthly Performance</h3>
          <div className="chart-filters">
            <button className="filter-btn active">6 Months</button>
            <button className="filter-btn">1 Year</button>
            <button className="filter-btn">All Time</button>
          </div>
        </div>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {monthlyData.map((data, index) => (
              <div
                key={index}
                className="chart-bar"
                style={{
                  height: `${(data.energy / 2.5) * 100}%`,
                  minHeight: '30px',
                }}
                title={`${data.month}: ${data.energy} MWh`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="chart-card" style={{ marginTop: '32px' }}>
        <div className="chart-header">
          <h3>Monthly Breakdown</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-title)' }}>
                  Month
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: 'var(--text-title)' }}>
                  Energy (MWh)
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: 'var(--text-title)' }}>
                  Cost ($)
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: 'var(--text-title)' }}>
                  Alerts
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < monthlyData.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                  className="table-hover-row"
                >
                  <td style={{ padding: '12px', fontWeight: '500', color: 'var(--text-title)' }}>
                    {data.month}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-body)' }}>
                    {data.energy.toFixed(1)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--success)' }}>
                    ${data.cost.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-body)' }}>
                    {data.alerts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '12px 24px' }}
          onClick={() => alert('Export to PDF')}
        >
          📄 Export PDF
        </button>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '12px 24px' }}
          onClick={() => alert('Export to Excel')}
        >
          📊 Export Excel
        </button>
      </div>
    </div>
  );
}

export default AdminReports;