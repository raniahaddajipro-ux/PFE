// src/app/admin/page.jsx
'use client';

import { AuthProvider, useAuthContext } from '../../context/AuthContext';

import AdminDashboard from '@/pages/admin/AdminDashboard';

export default function AdminPage() {
  const { currentUser, handleLogout, handleProfileUpdate } = useAuthContext();

  return (
    <AdminDashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}