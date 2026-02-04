//src/context/AuthContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 1️⃣ Create context
const AuthContext = createContext(null);

// 2️⃣ Combined hook & provider
export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setIsValidating(false);
        if (pathname !== '/login') router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(storedUser);

        if (!user.token) {
          handleLogout();
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/${user.id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        if (res.ok) {
          setIsAuthenticated(true);
          setCurrentUser(user);
        } else {
          handleLogout();
        }
      } catch {
        handleLogout();
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, []);

  // 3️⃣ Actions
  const handleLogin = (userData) => {
    const user = { ...userData, role: userData.role.toLowerCase() };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));

    router.push(user.role === 'admin' ? '/admin' : '/staff');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("user");
    router.push('/login');
  };

  const handleProfileUpdate = (updatedUser) => {
    const merged = {
      ...currentUser,
      ...updatedUser,
      token: updatedUser.token || currentUser.token,
      role: (updatedUser.role || currentUser.role).toLowerCase()
    };

    setCurrentUser(merged);
    localStorage.setItem("user", JSON.stringify(merged));
  };

  // 4️⃣ Return context provider
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        isValidating,
        handleLogin,
        handleLogout,
        handleProfileUpdate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 5️⃣ Custom hook to consume the context
export function useAuthContext() {
  return useContext(AuthContext);
}
