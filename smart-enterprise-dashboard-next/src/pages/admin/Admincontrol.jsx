// src/pages/admin/Admincontrol.jsx
'use client';
import { useState } from 'react';

/**
 * AdminControl Component
 * Page de contrôle IoT pour l'administrateur
 * Permet de gérer et contrôler tous les dispositifs IoT
 */
function AdminControl() {
  // State for device controls
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Lighting System',
      icon: '💡',
      isOn: true,
      hasSlider: true,
      sliderValue: 75,
    },
    {
      id: 2,
      name: 'HVAC System',
      icon: '❄️',
      isOn: true,
      hasSlider: true,
      sliderValue: 22,
      sliderLabel: 'Temperature',
      sliderUnit: '°C',
    },
    {
      id: 3,
      name: 'Security Cameras',
      icon: '📹',
      isOn: true,
      hasSlider: false,
    },
    {
      id: 4,
      name: 'Access Control',
      icon: '🔒',
      isOn: false,
      hasSlider: false,
    },
    {
      id: 5,
      name: 'Fire Detection',
      icon: '🔥',
      isOn: true,
      hasSlider: false,
    },
    {
      id: 6,
      name: 'Water Management',
      icon: '💧',
      isOn: true,
      hasSlider: false,
    },
  ]);

  const toggleDevice = (id) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, isOn: !device.isOn } : device
      )
    );
  };

  const handleSliderChange = (id, value) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, sliderValue: parseInt(value) } : device
      )
    );
  };

  return (
    <div className="page-content active">
      {/* Page Header */}
      <div className="page-header">
        <h1>IoT Control Panel</h1>
        <p>Manage and monitor all connected devices</p>
      </div>

      {/* Control Grid */}
      <div className="control-grid">
        {devices.map((device) => (
          <div key={device.id} className="control-card">
            {/* Control Header */}
            <div className="control-header">
              <div className="control-title">
                <div className="icon">{device.icon}</div>
                <h3>{device.name}</h3>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={device.isOn}
                  onChange={() => toggleDevice(device.id)}
                  id={`toggle-${device.id}`}
                />
                <span className="toggle-slider"></span>
              </div>
            </div>

            {/* Status LED */}
            <div className="status-led">
              <div className={`led ${device.isOn ? 'on' : 'off'}`}></div>
              <span style={{ color: device.isOn ? 'var(--success)' : 'var(--text-body)' }}>
                {device.isOn ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Slider Control (if applicable) */}
            {device.hasSlider && (
              <div className="slider-control">
                <div className="slider-label">
                  <span>{device.sliderLabel || 'Intensity'}</span>
                  <span className="slider-value">
                    {device.sliderValue}
                    {device.sliderUnit || '%'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={device.sliderUnit === '°C' ? '30' : '100'}
                  value={device.sliderValue}
                  onChange={(e) => handleSliderChange(device.id, e.target.value)}
                  disabled={!device.isOn}
                  style={{
                    background: device.isOn
                      ? `linear-gradient(to right, var(--primary) 0%, var(--primary) ${device.sliderValue}%, var(--border) ${device.sliderValue}%, var(--border) 100%)`
                      : 'var(--border)',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* System Stats */}
      <div className="chart-card" style={{ marginTop: '32px' }}>
        <div className="chart-header">
          <h3>Device Statistics</h3>
        </div>
        <div className="energy-stats">
          <div className="energy-stat">
            <div className="label">Total Devices</div>
            <div className="value">{devices.length}</div>
          </div>
          <div className="energy-stat">
            <div className="label">Active</div>
            <div className="value" style={{ color: 'var(--success)' }}>
              {devices.filter((d) => d.isOn).length}
            </div>
          </div>
          <div className="energy-stat">
            <div className="label">Inactive</div>
            <div className="value" style={{ color: 'var(--text-body)' }}>
              {devices.filter((d) => !d.isOn).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminControl;