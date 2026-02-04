import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const UsersPage = () => {
  const users = [
    {
      name: 'Ahmed Mansouri',
      email: 'ahmed.m@sems.tn',
      role: 'admin',
      status: 'active',
      lastLogin: "Today, 09:23",
      avatar: 'AM',
    },
    {
      name: 'Sara Karoui',
      email: 'sara.k@sems.tn',
      role: 'staff',
      status: 'active',
      lastLogin: "Today, 08:45",
      avatar: 'SK',
    },
    {
      name: 'Mohamed Ben Ali',
      email: 'mohamed.b@sems.tn',
      role: 'staff',
      status: 'active',
      lastLogin: 'Yesterday, 5:30 PM',
      avatar: 'MB',
    },
    {
      name: 'Leila Trabelsi',
      email: 'leila.t@sems.tn',
      role: 'staff',
      status: 'offline',
      lastLogin: '2 days ago',
      avatar: 'LT',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>Manage system access</Text>
      </View>

      {/* Users Table */}
      <View style={styles.usersTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>List of Users</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnAdd}
            >
              <Text style={styles.btnAddIcon}>+</Text>
              <Text style={styles.btnAddText}>New User</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Table Content */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 250 }]}>
                <Text style={styles.tableCellHeaderText}>User</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 200 }]}>
                <Text style={styles.tableCellHeaderText}>Email</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 150 }]}>
                <Text style={styles.tableCellHeaderText}>Role</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 120 }]}>
                <Text style={styles.tableCellHeaderText}>Status</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 180 }]}>
                <Text style={styles.tableCellHeaderText}>Last Login</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader, { width: 200 }]}>
                <Text style={styles.tableCellHeaderText}>Actions</Text>
              </View>
            </View>

            {/* Table Body */}
            {users.map((user, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, { width: 250 }]}>
                  <View style={styles.userCell}>
                    <LinearGradient
                      colors={['#8B5CF6', '#EC4899']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.userAvatarSmall}
                    >
                      <Text style={styles.avatarSmallText}>{user.avatar}</Text>
                    </LinearGradient>
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, { width: 200 }]}>
                  <Text style={styles.tableCellText}>{user.email}</Text>
                </View>
                <View style={[styles.tableCell, { width: 150 }]}>
                  <View
                    style={[
                      styles.badge,
                      user.role === 'admin' ? styles.badgeAdmin : styles.badgeOfficer,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        user.role === 'admin'
                          ? styles.badgeTextAdmin
                          : styles.badgeTextOfficer,
                      ]}
                    >
                      {user.role === 'admin' ? 'Administrateur' : 'Officier'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.tableCell, { width: 120 }]}>
                  <View style={styles.statusCell}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            user.status === 'active' ? '#10B981' : '#6B7280',
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: user.status === 'active' ? '#10B981' : '#6B7280',
                        },
                      ]}
                    >
                      {user.status === 'active' ? 'Actif' : 'Hors ligne'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.tableCell, { width: 180 }]}>
                  <Text style={styles.tableCellText}>{user.lastLogin}</Text>
                </View>
                <View style={[styles.tableCell, { width: 200 }]}>
                  <View style={styles.actionsCell}>
                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                      <Text style={styles.actionBtnText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.actionBtnDelete]}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.actionBtnDeleteText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  usersTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnAddIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  btnAddText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  table: {
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    padding: 16,
    justifyContent: 'center',
  },
  tableCellHeader: {
    backgroundColor: '#F8F7FC',
  },
  tableCellHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  tableCellText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeAdmin: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  badgeOfficer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeTextAdmin: {
    color: '#8B5CF6',
  },
  badgeTextOfficer: {
    color: '#10B981',
  },
  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
  },
  actionsCell: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  actionBtnText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionBtnDelete: {
    borderColor: '#EF4444',
  },
  actionBtnDeleteText: {
    fontSize: 12,
    color: '#EF4444',
  },
});

export default UsersPage;