// src/components/Login.jsx
'use client';
import { useState } from 'react';
import { login } from "@/services/api/auth";

const Login = ({ onLogin }) => {
  const [Mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role) => {
    console.log("🔄 Role selected:", role);
    setSelectedRole(role);
  };

  const showToast = (type, message) => {
    console.log(`📢 Toast: [${type}] ${message}`);
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("\n" + "=".repeat(60));
    console.log("🔵 LOGIN FORM SUBMITTED");
    console.log("=".repeat(60));
    console.log("📧 Email:", Mail);
    console.log("🔑 Password:", password ? "***" : "EMPTY");
    console.log("👤 Selected Role:", selectedRole);

    if (!Mail || !password) {
      showToast("warning", "Please fill in all fields");
      return;
    }

    try {
      console.log("📤 Sending login request to backend...");
      console.log("   - mail:", Mail);
      console.log("   - password:", "***");
      console.log("   - selectedRole:", selectedRole);
      
      const data = await login(Mail, password, selectedRole);
      
      console.log("✅ Login response received from backend:");
      console.log(JSON.stringify(data, null, 2));
      
      const userData = {
        id: data.id || data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        mail: data.mail,
        phone: data.phone,
        role: data.role.toLowerCase(),
        avatarColor: data.avatarColor || "#8B5CF6",
        avatarImage: data.avatarImage || null,
        token: data.token
      };
      
      console.log("💾 Storing user data in localStorage:");
      console.log(JSON.stringify(userData, null, 2));
      
      localStorage.setItem("user", JSON.stringify(userData));
      
      console.log("✅ Calling onLogin with userData");
      onLogin(userData);
      console.log("=" .repeat(60) + "\n");
      
    } catch (err) {
      console.error("\n❌ LOGIN ERROR:");
      console.error("Error object:", err);
      console.error("Response:", err.response);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "Unknown error";
        
        console.log(`📍 Status: ${status}`);
        console.log(`📍 Message: ${message}`);
        
        if (status === 404) {
          showToast("error", "Email incorrect");
        } else if (status === 400) {
          showToast("error", "Password incorrect");
        } else if (status === 403) {
          showToast("error", message || "Invalid role selected for this account");
        } else {
          showToast("error", "Server error, please try again");
        }
      } else {
        console.error("❌ No response from server");
        showToast("error", "Cannot connect to server");
      }
      console.log("=" .repeat(60) + "\n");
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Floating Circle 1 */}
        <div className="login-circle-1" />

        {/* Floating Circle 2 */}
        <div className="login-circle-2" />

        {/* Login Box */}
        <div className="login-box">
          {/* Logo & Title */}
          <div className="logo">
            <h1>SEMS</h1>
            <p>Smart Enterprise Management System</p>
          </div>

          {/* Role Selector */}
          <div className="role-selector">
            {/* Admin Role Card */}
            <div
              onClick={() => handleRoleSelect('admin')}
              className={`role-card ${selectedRole === 'admin' ? 'active' : ''}`}
            >
              <div className="icon">👨‍💼</div>
              <h3>Admin</h3>
            </div>

            {/* Staff Role Card */}
            <div
              onClick={() => handleRoleSelect('staff')}
              className={`role-card ${selectedRole === 'staff' ? 'active' : ''}`}
            >
              <div className="icon">👨‍💻</div>
              <h3>Staff</h3>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Mail Input */}
            <div className="input-group">
              <label htmlFor="Mail">Mail</label>
              <input
                type="text"
                id="Mail"
                value={Mail}
                onChange={(e) => setMail(e.target.value)}
                required
                placeholder="Enter your Mail"
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
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

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            {toast.type === "error" && <span className="toast-icon error">❌</span>}
            {toast.type === "success" && <span className="toast-icon success">✅</span>}
            {toast.type === "warning" && <span className="toast-icon warning">⚠️</span>}
            <span className="toast-message">{toast.message}</span>
          </div>
        )}
      </div>

      {/* All Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Login Container */
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          position: relative;
          overflow: hidden;
        }

        /* Floating Circle 1 */
        .login-circle-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: -200px;
          right: -200px;
          animation: float 6s ease-in-out infinite;
        }

        /* Floating Circle 2 */
        .login-circle-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          bottom: -150px;
          left: -150px;
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(20px); 
          }
        }

        /* Login Box */
        .login-box {
          background: #FFFFFF;
          padding: 48px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          max-width: 440px;
          width: 100%;
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Logo */
        .logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .logo p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: #6B7280;
        }

        /* Role Selector */
        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        .role-card {
          background: #F8F7FC;
          padding: 24px;
          border-radius: 16px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .role-card:hover {
          border-color: #8B5CF6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
        }

        .role-card.active {
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
        }

        .role-card .icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .role-card h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .role-card.active h3 {
          color: white;
        }

        /* Input Group */
        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #F8F7FC;
        }

        .input-group input::placeholder {
          color: #9ca3af;
        }

        .input-group input:focus {
          outline: none;
          border-color: #8B5CF6;
          background: white;
        }

        /* Password Wrapper */
        .password-wrapper {
          position: relative;
        }

        .password-wrapper input {
          padding-right: 48px;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6B7280;
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: #8B5CF6;
        }

        /* Primary Button */
        .btn-primary {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
        }

        .btn-primary:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
        }

        /* Toast Notification */
        .toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          padding: 16px 24px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1000;
          animation: slideUp 0.3s ease-out;
        }

        .toast-error {
          border-left: 4px solid #EF4444;
        }

        .toast-success {
          border-left: 4px solid #10B981;
        }

        .toast-warning {
          border-left: 4px solid #F59E0B;
        }

        .toast-icon {
          font-size: 20px;
        }

        .toast-icon.error {
          color: #EF4444;
        }

        .toast-icon.success {
          color: #10B981;
        }

        .toast-icon.warning {
          color: #F59E0B;
        }

        .toast-message {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          color: #111827;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .login-box {
            padding: 32px 24px;
          }

          .login-circle-1,
          .login-circle-2 {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
