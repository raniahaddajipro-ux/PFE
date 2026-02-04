// src/app/staff/page.jsx
'use client';

// layout.jsx or page.jsx
import { AuthProvider, useAuthContext } from '../../context/AuthContext';
import StaffDashboard from '@/pages/staff/StaffDashboard';

export default function StaffPage() {
  const { currentUser, handleLogout, handleProfileUpdate } = useAuthContext();

  return (
    <StaffDashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}