// src/pages/staff/Settings.jsx
'use client';

import { useState, useEffect } from "react";
import { FiEdit2, FiX, FiAlertCircle, FiLock, FiUpload, FiCheckCircle } from "react-icons/fi";
import { updateProfile, updatePassword } from "../../services/api/userService";
import { useAuthContext } from "../../context/AuthContext";

const SettingsPage = () => {
  // ✅ GET AUTH FROM CONTEXT (not props)
  const { currentUser, handleProfileUpdate } = useAuthContext();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const fullName =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : "Staff";
  
  const [userAvatar] = useState(
    currentUser?.firstName ? currentUser.firstName.charAt(0).toUpperCase() : "S"
  );
  
  // Avatar storage
  const [avatarFile, setAvatarFile] = useState(null);

  // ✅ Sync local state when currentUser changes
  useEffect(() => {
    console.log("🔵 Settings: currentUser changed, syncing local state");
    if (currentUser) {
      setEmail(currentUser.mail || "");
      setPhone(currentUser.phone || "");
      setAvatarColor(currentUser.avatarColor || "#8B5CF6");
      
      // ✅ Add cache-busting timestamp to force image reload
      const imageUrl = currentUser.avatarImage 
        ? `${currentUser.avatarImage}?t=${Date.now()}` 
        : null;
      setAvatarImage(imageUrl);
      
      console.log("🔵 Synced avatar image:", imageUrl);
    }
  }, [currentUser]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (Tunisia format)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{8}$/; 
    return phoneRegex.test(phone.trim());
  };

  // Password strength checker
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

  // Handle password input
  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  // Show success message
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 5000);
  };

  // Sanitize file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (file.size > maxSize) {
      setError("Image size must be less than 2MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG, JPG and WebP images are allowed");
      return;
    }

    // ✅ Store FILE (for backend upload)
    setAvatarFile(file);

    // ✅ Preview image
    setAvatarImage(URL.createObjectURL(file));

    setError("");
  };

  // Save profile changes with API call
  const handleSaveChanges = async () => {
    console.log("🟢 handleSaveChanges called");
    
    setError("");
    setSuccess("");
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number (8 digits)");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatarColor", avatarColor);

      // ✅ If there's a file, upload it
      if (avatarFile) {
        console.log("🟢 Adding file:", avatarFile.name);
        formData.append("avatar", avatarFile);
      } 
      // ✅ If there's no file AND no current image, we're removing the avatar
      else if (!avatarImage || !currentUser?.avatarImage) {
        console.log("🟢 No image - removing avatar, using color only");
        formData.append("removeAvatar", "true");
      }

      console.log("🟢 Calling updateProfile API...");
      const response = await updateProfile(formData);
      
      console.log("✅ API Response:", response);

      // ✅ CRITICAL: Preserve the current token when updating
      const updatedUserData = {
        ...response.user,
        token: currentUser.token
      };

      console.log("🟢 Updated user data with token:", updatedUserData);

      // ✅ Update via AuthContext (not prop)
      handleProfileUpdate(updatedUserData);

      // ✅ Clear the file input after successful upload
      setAvatarFile(null);

      console.log("✅ Profile saved successfully");
      showSuccess(response.message || "Profile updated successfully");
      setShowEditModal(false);
      
    } catch (err) {
      console.error("❌ Save error:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to update profile");
      } else {
        setError(err.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset password with API call
  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password");
      return;
    }

    if (password.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (passwordStrength === "weak") {
      setError("Please choose a stronger password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await updatePassword(currentPassword, password);

      showSuccess(response.message || "Password updated successfully");
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setPasswordStrength("");
      setShowResetPassword(false);
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to update password");
      } else {
        setError(err.message || "Failed to update password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper function to get avatar display URL with cache-busting
  const getAvatarDisplayUrl = () => {
    if (!avatarImage) return null;
    
    // If it's a blob URL (from file upload preview), return as-is
    if (avatarImage.startsWith('blob:')) {
      return avatarImage;
    }
    
    // Otherwise, ensure proper URL format with cache-busting
    const baseUrl = avatarImage.startsWith('http') 
      ? avatarImage 
      : `http://localhost:5000${avatarImage}`;
    
    return `${baseUrl.split('?')[0]}?t=${Date.now()}`;
  };

  return (
    <div className="page-content active">
      <div className="settings-page-header-custom">
        <h1 className="settings-page-title">Settings</h1>
        <p className="settings-page-subtitle">Manage your profile and preferences</p>
      </div>
      {/* Header */}
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
            <span className="badge badge-staff">
              {currentUser?.role || "STAFF"}
            </span>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="alert-message alert-error">
          <FiAlertCircle className="icon-md" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert-message alert-success">
          <span className="icon-md">✅</span>
          <span>{success}</span>
        </div>
      )}

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
          {/* Full Name */}
          <div className="settings-field">
            <label className="settings-label">Full Name</label>
            <input
              type="text"
              value={fullName}
              disabled
              className="settings-input"
            />
          </div>

          {/* Email */}
          <div className="settings-field">
            <label className="settings-label">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="settings-input"
            />
          </div>

          {/* Phone */}
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

      {/* Password Reset Section */}
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
            <div className="settings-field">
              <label className="settings-label">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="settings-input"
              />
            </div>

            <div className="settings-field">
              <label className="settings-label">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Min. 8 characters"
                className="settings-input"
              />
              {password && (
                <div className={`password-strength-indicator ${passwordStrength}`}>
                  Strength: <strong>{passwordStrength}</strong>
                </div>
              )}
            </div>

            <div className="settings-field">
              <label className="settings-label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="settings-input"
              />
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
                  setError("");
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
              {/* Avatar Section */}
              <div className="modal-section">
                <h3>Avatar</h3>
                
                {/* Avatar Preview */}
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

                {/* Color Picker */}
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

                {/* Image Upload */}
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

              {/* Contact Information */}
              <div className="modal-section">
                <h3>Contact Information</h3>
                
                {/* Email */}
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

                {/* Phone */}
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
    </div>
  );
};

export default SettingsPage;