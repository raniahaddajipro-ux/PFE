// MainApp.jsx - Version avec Bottom Navigation Bar
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AdminDashboard from './dashboard';
import ControlPage from './Tcontrol';
import NotificationsPage from './Notif';
import ReportsPage from './Historique';
import UsersPage from './Users';
import AdminSettings from './settingsA'

const MainApp = ({ userData, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard userData={userData} />;
      case 'control':
        return <ControlPage userData={userData} />;
      case 'notifications':
        return <NotificationsPage userData={userData} />;
      case 'reports':
        return <ReportsPage userData={userData} />;
      case 'users':
        return <UsersPage userData={userData} />;
      case 'settings':
        return <AdminSettings userData={userData} />;
      default:
        return <AdminDashboard userData={userData} />;
    }
  };
    console.log('Fichier ouvert : MainApp.jsx');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec info utilisateur */}
      <View style={styles.appHeader}>
        <View style={styles.userInfoHeader}>
          <View style={styles.userAvatarHeader}>
            <Text style={styles.userAvatarText}>
              {userData?.name ? userData.name.charAt(0).toUpperCase() : 'A'}
            </Text>
          </View>
          <View>
            <Text style={styles.userNameHeader}>
              {userData?.firstName && userData?.lastName ? `${userData.firstName} ${userData.lastName}`: 'Admin'}
            </Text>
            <Text style={styles.userRoleHeader}>
              {userData?.role?.toLowerCase() === 'admin' ? 'Admin' : 'Staff'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutBtnText}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu de la page active */}
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1}} // <-- espace pour la bottom nav
          showsVerticalScrollIndicator={false}
        >
          {renderPage()}
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bottomNav}
        >
          {/* Dashboard */}
          <TouchableOpacity
            style={[
              styles.navItem,
              activePage === 'dashboard' && styles.navItemActive,
            ]}
            onPress={() => setActivePage('dashboard')}
          >
            <Text
              style={[
                styles.navIcon,
                activePage === 'dashboard' && styles.navIconActive,
              ]}
            >
              📊
            </Text>
            <Text
              style={[
                styles.navLabel,
                activePage === 'dashboard' && styles.navLabelActive,
              ]}
            >
              Dashboard
            </Text>
          </TouchableOpacity>

          {/* Contrôle IoT */}
          <TouchableOpacity
            style={[
              styles.navItem,
              activePage === 'control' && styles.navItemActive,
            ]}
            onPress={() => setActivePage('control')}
          >
            <Text
              style={[
                styles.navIcon,
                activePage === 'control' && styles.navIconActive,
              ]}
            >
              🎛️
            </Text>
            <Text
              style={[
                styles.navLabel,
                activePage === 'control' && styles.navLabelActive,
              ]}
            >
              IoT Control
            </Text>
          </TouchableOpacity>
   <TouchableOpacity
            style={[
              styles.navItem,
              activePage === 'settings' && styles.navItemActive,
            ]}
            onPress={() => setActivePage('settings')}
          >
            <Text
              style={[
                styles.navIcon,
                activePage === 'settings' && styles.navIconActive,
              ]}
            >
              ⚙️
            </Text>
            <Text
              style={[
                styles.navLabel,
                activePage === 'settings' && styles.navLabelActive,
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
          {/* Notifications */}
          <TouchableOpacity
            style={[
              styles.navItem,
              activePage === 'notifications' && styles.navItemActive,
            ]}
            onPress={() => setActivePage('notifications')}
          >
            <Text
              style={[
                styles.navIcon,
                activePage === 'notifications' && styles.navIconActive,
              ]}
            >
              🔔
            </Text>
            <Text
              style={[
                styles.navLabel,
                activePage === 'notifications' && styles.navLabelActive,
              ]}
            >
              Notifications
            </Text>
          </TouchableOpacity>

          {/* Historique - Admin only */}
           <TouchableOpacity
    style={[
      styles.navItem,
      activePage === 'reports' && styles.navItemActive,
    ]}
    onPress={() => setActivePage('reports')}
  >
    <Text
      style={[
        styles.navIcon,
        activePage === 'reports' && styles.navIconActive,
      ]}
    >
      📈
    </Text>
    <Text
      style={[
        styles.navLabel,
        activePage === 'reports' && styles.navLabelActive,
      ]}
    >
      History
    </Text>
  </TouchableOpacity>

          {/* Utilisateurs - Admin only */}
          <TouchableOpacity
    style={[
      styles.navItem,
      activePage === 'users' && styles.navItemActive,
    ]}
    onPress={() => setActivePage('users')}
  >
    <Text
      style={[
        styles.navIcon,
        activePage === 'users' && styles.navIconActive,
      ]}
    >
      👥
    </Text>
    <Text
      style={[
        styles.navLabel,
        activePage === 'users' && styles.navLabelActive,
      ]}
    >
      Users
    </Text>
  </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    paddingVertical: 18
  },

  // === APP HEADER ===
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatarHeader: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userNameHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  userRoleHeader: {
    fontSize: 13,
    color: '#6B7280',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    fontSize: 20,
  },

  // === CONTENT ===
  content: {
    flex: 1,
  },

  // === BOTTOM NAVIGATION ===
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    padding: undefined,
  },
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 90,
    marginHorizontal: 4,
  },
  navItemActive: {
    backgroundColor: '#DDD6FE',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    transform: [{ scale: 1.1 }],
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  navLabelActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});

export default MainApp;
