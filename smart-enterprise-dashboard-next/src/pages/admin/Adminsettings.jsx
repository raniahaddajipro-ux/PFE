// src/pages/admin/AdminSettings.jsx
'use client';

import { useState, useEffect } from "react";
import { FiEdit2, FiX, FiLock } from "react-icons/fi";
import { updateProfile, updatePassword } from "../../services/api/userService";
import { useAuthContext } from "../../context/AuthContext";

const AdminSettings = () => {
  const { currentUser, handleProfileUpdate } = useAuthContext();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Toast notification state (replacing error/success states)
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Edit modal states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarColor, setAvatarColor] = useState("#8B5CF6");
  const [avatarImage, setAvatarImage] = useState(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // ✅ Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fullName =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : "Admin";
  
  const [userAvatar] = useState(
    currentUser?.firstName ? currentUser.firstName.charAt(0).toUpperCase() : "A"
  );
  
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    console.log("🔵 AdminSettings: currentUser changed, syncing local state");
    if (currentUser) {
      setEmail(currentUser.mail || "");
      setPhone(currentUser.phone || "");
      setAvatarColor(currentUser.avatarColor || "#8B5CF6");
      
      const imageUrl = currentUser.avatarImage 
        ? `${currentUser.avatarImage}?t=${Date.now()}` 
        : null;
      setAvatarImage(imageUrl);
      
      console.log("🔵 Synced avatar image:", imageUrl);
    }
  }, [currentUser]);

  // ✅ Toast notification handler
  const showToast = (type, message) => {
    console.log("🟢 SHOWING TOAST:", type, message);
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{8}$/; 
    return phoneRegex.test(phone.trim());
  };

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "weak";
    if (pwd.length < 8) return "medium";
    
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strength >= 3 && pwd.length >= 10) return "strong";
    if (strength >= 2 && pwd.length >= 8) return "medium";
    return "weak";
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (file.size > maxSize) {
      showToast("error", "Image size must be less than 2MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      showToast("error", "Only JPEG, PNG, JPG and WebP images are allowed");
      return;
    }

    setAvatarFile(file);
    setAvatarImage(URL.createObjectURL(file));
  };

  const handleSaveChanges = async () => {
    console.log("🟢 handleSaveChanges called");
    
    if (!validateEmail(email)) {
      showToast("error", "Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      showToast("error", "Please enter a valid phone number (8 digits)");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatarColor", avatarColor);

      if (avatarFile) {
        console.log("🟢 Adding file:", avatarFile.name);
        formData.append("avatar", avatarFile);
      } else if (!avatarImage || !currentUser?.avatarImage) {
        console.log("🟢 No image - removing avatar, using color only");
        formData.append("removeAvatar", "true");
      }

      console.log("🟢 Calling updateProfile API...");
      const response = await updateProfile(formData);
      
      console.log("✅ API Response:", response);

      const updatedUserData = {
        ...response.user,
        token: currentUser.token
      };

      console.log("🟢 Updated user data with token:", updatedUserData);

      handleProfileUpdate(updatedUserData);
      setAvatarFile(null);

      console.log("✅ Profile saved successfully");
      showToast("success", response.message || "Profile updated successfully");
      setShowEditModal(false);
      
    } catch (err) {
      console.error("❌ Save error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update profile. Please try again.";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    console.log("🟢 handleResetPassword called");
    
    if (!currentPassword) {
      showToast("error", "Please enter your current password");
      return;
    }

    if (password.length < 8) {
      showToast("error", "New password must be at least 8 characters");
      return;
    }

    if (passwordStrength === "weak") {
      showToast("error", "Please choose a stronger password");
      return;
    }

    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("🟢 Calling updatePassword API...");
      const response = await updatePassword(currentPassword, password);
      
      console.log("✅ Password update response:", response);

      showToast("success", response.message || "Password updated successfully");
      
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setPasswordStrength("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setShowResetPassword(false);
      
    } catch (err) {
      console.error("❌ Password update error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update password. Please try again.";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarDisplayUrl = () => {
    if (!avatarImage) return null;
    
    if (avatarImage.startsWith('blob:')) {
      return avatarImage;
    }
    
    const baseUrl = avatarImage.startsWith('http') 
      ? avatarImage 
      : `http://localhost:5000${avatarImage}`;
    
    return `${baseUrl.split('?')[0]}?t=${Date.now()}`;
  };

  return (
    <div className="page-content active">
      {/* ✅ Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            minWidth: '300px',
            backgroundColor: toast.type === "error" ? '#FEF2F2' : 
                           toast.type === "success" ? '#F0FDF4' : '#FEFCE8',
            borderLeft: `4px solid ${toast.type === "error" ? '#EF4444' : 
                                     toast.type === "success" ? '#10B981' : '#F59E0B'}`
          }}>
            <span style={{ fontSize: '1.25rem' }}>
              {toast.type === "error" && "❌"}
              {toast.type === "success" && "✅"}
              {toast.type === "warning" && "⚠️"}
            </span>
            <span style={{
              fontWeight: '600',
              color: toast.type === "error" ? '#991B1B' :
                     toast.type === "success" ? '#065F46' : '#92400E',
              flex: 1
            }}>
              {toast.message}
            </span>
            <button 
              onClick={() => setToast({ show: false, type: "", message: "" })}
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="settings-page-header-custom">
        <h1 className="settings-page-title">Settings</h1>
        <p className="settings-page-subtitle">Manage your profile and preferences</p>
      </div>

      <div className="page-header">
        <div className="settings-page-header">
          <div className="avatar-container">
            <div 
              className="user-avatar-large" 
              style={{ 
                background: avatarImage 
                  ? `url(${getAvatarDisplayUrl()}) center/cover` 
                  : `linear-gradient(135deg, ${avatarColor}, #4f46e5)` 
              }}
            >
              {!avatarImage && userAvatar}
            </div>
            <div 
              className="avatar-edit-icon"
              onClick={() => setShowEditModal(true)}
              title="Edit Profile"
            >
              <FiEdit2 />
            </div>
          </div>
          <div>
            <h1>{fullName}</h1>
            <span className="badge badge-admin">
              {currentUser?.role || "ADMIN"}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="settings-card-custom">
        <div className="card-border-gradient"></div>
        <div className="card-header-custom">
          <h3 className="card-title-custom">Personal Information</h3>
          <div className="icon-container-custom icon-primary-custom">
            <span>👤</span>
          </div>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <label className="settings-label">Full Name</label>
            <input
              type="text"
              value={fullName}
              disabled
              className="settings-input"
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="settings-input"
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">Phone Number</label>
            <input
              type="tel"
              value={phone}
              disabled
              className="settings-input"
            />
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="settings-card-custom">
        <div className="card-border-gradient"></div>
        <div className="card-header-custom">
          <h3 className="card-title-custom">Security</h3>
          <div className="icon-container-custom icon-warning-custom">
            <span>🔒</span>
          </div>
        </div>

        {!showResetPassword ? (
          <button 
            className="btn-primary btn-with-icon"
            onClick={() => setShowResetPassword(true)}
          >
            <FiLock size={18} />
            Reset Password
          </button>
        ) : (
          <div className="settings-form-grid-custom">
            {/* ✅ Current Password with Inline SVG Toggle */}
            <div className="settings-field">
              <label className="settings-label">Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="settings-input"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6B7280',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B5CF6'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  {showCurrentPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ✅ New Password with Inline SVG Toggle */}
            <div className="settings-field">
              <label className="settings-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="settings-input"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6B7280',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B5CF6'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  {showNewPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
              {password && (
                <div className={`password-strength-indicator ${passwordStrength} mt-2`}>
                  Strength: <strong className="capitalize">{passwordStrength}</strong>
                </div>
              )}
            </div>

            {/* ✅ Confirm Password with Inline SVG Toggle */}
            <div className="settings-field">
              <label className="settings-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="settings-input"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6B7280',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B5CF6'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="button-group-custom">
              <button 
                className="btn-secondary-custom"
                onClick={() => {
                  setShowResetPassword(false);
                  setCurrentPassword("");
                  setPassword("");
                  setConfirmPassword("");
                  setPasswordStrength("");
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary-custom"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => !loading && setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button 
                className="modal-close" 
                onClick={() => !loading && setShowEditModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Avatar</h3>
                
                <div className="avatar-preview-container">
                  <div 
                    className="avatar-preview-large"
                    style={{ 
                      background: avatarImage 
                        ? `url(${getAvatarDisplayUrl()}) center/cover` 
                        : `linear-gradient(135deg, ${avatarColor}, #4f46e5)` 
                    }}
                  >
                    {!avatarImage && userAvatar}
                  </div>
                </div>

                <div className="settings-field">
                  <label className="settings-label">Avatar Color</label>
                  <div className="color-picker-group">
                    <input
                      type="color"
                      value={avatarColor}
                      onChange={(e) => {
                        setAvatarColor(e.target.value);
                        setAvatarImage(null);
                        setAvatarFile(null);
                      }}
                      disabled={loading}
                      className="color-picker-input"
                    />
                    <span className="color-value-display">{avatarColor}</span>
                  </div>
                </div>

                <div className="settings-field">
                  <label className="settings-label">
                    Or Upload Image (Max 2MB, JPEG/PNG/WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="file-upload-input"
                  />
                  {avatarImage && (
                    <button 
                      className="btn-remove-avatar"
                      onClick={() => {
                        setAvatarImage(null);
                        setAvatarFile(null);
                      }}
                      disabled={loading}
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>

              <div className="modal-section">
                <h3>Contact Information</h3>
                
                <div className="settings-field">
                  <label className="settings-label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    disabled={loading}
                    className="settings-input"
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-label">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+216 XX XXX XXX"
                    disabled={loading}
                    className="settings-input"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;
