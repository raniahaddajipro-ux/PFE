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
    <div className="login-container">
      <div className="login-circle-1"></div>
      <div className="login-circle-2"></div>

      <div className="login-box">
        <div className="text-center mb-8">
          <h1 className="logo-title" style={{ textAlign: "center" }}>SEMS</h1>
          <p className="text-sm text-gray-600" style={{ textAlign: "center" }}>Smart Enterprise Management System</p>
        </div>

        <div className="role-selector mb-10">
          <div
            onClick={() => handleRoleSelect('admin')}
            className={`role-card ${selectedRole === 'admin' ? 'role-card-active' : ''}`}
          >
            <div style={{ fontSize: '40px' }}>👨‍💼</div>
            <h3 className="font-semibold text-base">Admin</h3>
          </div>

          <div
            onClick={() => handleRoleSelect('staff')}
            className={`role-card ${selectedRole === 'staff' ? 'role-card-active' : ''}`}
          >
            <div style={{ fontSize: '40px' }}>👨‍💻</div>
            <h3 className="font-semibold text-base">staff</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
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

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ paddingRight: '40px' }}
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>

      {toast && (
        <div
          className={`toast flex items-center gap-3 ${
            toast.type === "error" ? "toast-error" :
            toast.type === "success" ? "toast-success" :
            "toast-warning"
          }`}
        >
          {toast.type === "error" && <span className="text-red-500 text-xl">❌</span>}
          {toast.type === "success" && <span className="text-green-500 text-xl">✅</span>}
          {toast.type === "warning" && <span className="text-yellow-500 text-xl">⚠️</span>}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Login;