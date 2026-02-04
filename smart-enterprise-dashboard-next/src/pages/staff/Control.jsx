//src/pages/staff/Control.jsx
'use client';
import { useState } from 'react';

const StaffControl = () => {
  // Mock data for IoT devices
  const [devices, setDevices] = useState([
    {
      id: 'light',
      name: 'lights',
      icon: '💡',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: 'var(--warning)',
      isOn: true,
      status: 'Activated',
      controlType: 'slider',
      controlLabel: 'light intensity',
      value: 75,
      unit: '%'
    },
    {
      id: 'blinds',
      name: 'Stores',
      icon: '🪟',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: 'var(--primary)',
      isOn: true,
      status: 'Activated',
      controlType: 'slider',
      controlLabel: 'openess',
      value: 60,
      unit: '%'
    },
    {
      id: 'ac',
      name: 'Climatisation',
      icon: '❄️',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: 'var(--success)',
      isOn: true,
      status: 'Activated',
      controlType: 'temperature',
      controlLabel: 'temperature',
      value: 22,
      unit: '°C',
      min: 16,
      max: 30
    },
    {
      id: 'workstation',
      name: 'Poste A-12',
      icon: '💼',
      iconBg: 'rgba(236, 72, 153, 0.1)',
      iconColor: 'var(--secondary)',
      isOn: true,
      status: 'Occupied',
      controlType: 'stats',
      stats: [
        { label: 'Energy', value: '145W' },
        { label: 'Duration', value: '4h 23m' },
        { label: 'Temp', value: '23°C' }
      ]
    }
  ]);

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return {
          ...device,
          isOn: !device.isOn,
          status: !device.isOn ? 'Activé' : 'Désactivé'
        };
      }
      return device;
    }));
  };

  const updateValue = (deviceId, newValue) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return { ...device, value: parseInt(newValue) };
      }
      return device;
    }));
  };

  return (
    <div className="page-content active">
      <div className="page-header">
        <h1>Contrôle IoT</h1>
        <p>Gérez vos modules intelligents</p>
      </div>
      
      <div className="control-grid">
        {devices.map((device) => (
          <div key={device.id} className="control-card">
            <div className="control-header">
              <div className="control-title">
                <div 
                  className="icon" 
                  style={{ background: device.iconBg, color: device.iconColor }}
                >
                  {device.icon}
                </div>
                <div>
                  <h3>{device.name}</h3>
                  <div className="status-led">
                    <div className={`led ${device.isOn ? 'on' : 'off'}`}></div>
                    <span 
                      style={{ 
                        fontSize: '13px', 
                        color: device.isOn ? 'var(--success)' : 'var(--text-body)' 
                      }}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={device.isOn}
                  onChange={() => toggleDevice(device.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {device.controlType === 'slider' && (
              <div className="slider-control">
                <div className="slider-label">
                  <span>{device.controlLabel}</span>
                  <span className="slider-value" id={`${device.id}Value`}>
                    {device.value}{device.unit}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={device.value}
                  onChange={(e) => updateValue(device.id, e.target.value)}
                />
              </div>
            )}

            {device.controlType === 'temperature' && (
              <>
                <div className="temp-display">
                  <span className="temp-value" id={`${device.id}Temp`}>
                    {device.value}
                  </span>
                  <span className="temp-unit">{device.unit}</span>
                </div>
                <div className="slider-control">
                  <div className="slider-label">
                    <span>{device.controlLabel}</span>
                  </div>
                  <input 
                    type="range" 
                    min={device.min} 
                    max={device.max} 
                    value={device.value}
                    onChange={(e) => updateValue(device.id, e.target.value)}
                  />
                </div>
              </>
            )}

            {device.controlType === 'stats' && (
              <div className="energy-stats">
                {device.stats.map((stat, index) => (
                  <div key={index} className="energy-stat">
                    <div className="label">{stat.label}</div>
                    <div className="value">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffControl;