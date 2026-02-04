// src/app/staff/layout.jsx
'use client';
import { AuthProvider, useAuthContext } from '../../context/AuthContext';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StaffLayout({ children }) {
  const { isAuthenticated, currentUser, isValidating } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isValidating) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (currentUser?.role !== 'staff') {
        router.push('/admin');
      }
    }
  }, [isAuthenticated, currentUser, isValidating, router]);

  if (isValidating) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#8B5CF6'
      }}>
        Validating session...
      </div>
    );
  }

  if (!isAuthenticated || currentUser?.role !== 'staff') {
    return null;
  }

  return <>{children}</>;
}