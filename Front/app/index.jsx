import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Login from '../components/Login';
import MainApp from './admin/home';
import MainAppO from './officier/home';
import storageService from '../Service/storageService';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await storageService.getUserData();
      console.log('User data loaded:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    await storageService.saveUserData(userData);
    setUser(userData);
  };

  const handleLogout = async () => {
    await storageService.clearUserData();
    setUser(null);
  };

  // Écran de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  // Si pas d'utilisateur connecté → Login
  if (!user) {
    return <Login onLogin={handleLogin} />;
    
  }

  // Si utilisateur admin → Dashboard Admin
  if (user.role === 'Admin') {
    return <MainApp onLogout={handleLogout} userData={user} />;
  }

  // Si utilisateur staff/officier → Dashboard Officier
  return <MainAppO onLogout={handleLogout} userData={user} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F7FC',
  },
});