// src/components/admin/Adminsidebar.jsx - FIXED VERSION
import { useState } from 'react';

const AdminSidebar = ({ currentPage, onNavigate, userName, currentUser, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const fullName =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : "Admin";

  const userAvatar =
    currentUser?.firstName
      ? currentUser.firstName.charAt(0).toUpperCase()
      : "A";

  console.log("🔵 AdminSidebar currentUser:", currentUser);
  
  // ✅ Build avatar style based on currentUser data WITH cache-busting
  const getAvatarStyle = () => {
    if (currentUser?.avatarImage) {
      // If there's an uploaded image, use it
      let imageUrl = currentUser.avatarImage.startsWith('http') 
        ? currentUser.avatarImage 
        : `http://localhost:5000${currentUser.avatarImage}`;
      
      // ✅ Add cache-busting timestamp to force reload
      imageUrl = `${imageUrl.split('?')[0]}?t=${Date.now()}`;
      
      console.log("🔵 Using avatar image:", imageUrl);
      
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'transparent'
      };
    } else {
      // Use gradient with avatarColor
      const color = currentUser?.avatarColor || '#8B5CF6';
      console.log("🔵 Using avatar color:", color);
      
      return {
        background: `linear-gradient(135deg, ${color}, #4f46e5)`,
        color: '#fff'
      };
    }
  };

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'control', icon: '🎛️', label: 'IoT Control' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'reports', icon: '📈', label: 'Reports' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMobileOpen(false);
  };

  return (
    <>
      <div 
        className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        id="sidebar"
      >
        <div className="sidebar-header">
          <h2>SEMS</h2>
        </div>
        
        <div className="user-info">
          <div 
            className="user-avatar" 
            id="userAvatar" 
            style={getAvatarStyle()}
            key={currentUser?.avatarImage || currentUser?.avatarColor} // ✅ Force re-render on change
          >
            {!currentUser?.avatarImage && userAvatar}
          </div>
          <div className="user-details">
            <h4 id="userName">{fullName}</h4>
            <p id="userRole">{currentUser?.role || "admin"}</p>
          </div>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        
        <button className="logout-btn" onClick={onLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>
    </>
  );
};

export default AdminSidebar;