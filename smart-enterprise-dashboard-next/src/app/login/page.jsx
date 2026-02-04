// src/app/login/page.jsx
'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';

export default function LoginPage() {
  const { handleLogin, isAuthenticated, currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'admin') {
        router.push('/admin');
      } else if (currentUser.role === 'staff') {
        router.push('/staff');
      }
    }
  }, [isAuthenticated, currentUser, router]);

  return <Login onLogin={handleLogin} />;
}