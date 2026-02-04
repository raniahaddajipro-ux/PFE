// NotificationsPage.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationsPage = ({ userData }) => {
 const notifications = [
    {
      type: 'critical',
      icon: '🚨',
      title: 'Critical Temperature - Room B',
      message: 'The temperature has exceeded the threshold of 28°C. Intervention required.',
      time: '5 minutes ago',
    },
    {
      type: 'warning',
      icon: '⚠️',
      title: 'High Fuel Consumption Detected',
      message: 'Station A-15 consumes 15% above the normal average.',
      time: '1 hour ago',
    },
    {
      type: 'info',
      icon: 'ℹ️',
      title: 'Scheduled Maintenance',
      message: 'HVAC system maintenance scheduled for tomorrow at 2:00 PM.',
      time: '3 hours ago',
    },
    {
      type: 'info',
      icon: '✅',
      title: 'System Update Completed',
      message: 'All IoT modules have been successfully updated to version 2.4.1.',
      time: 'Yesterday at 10:30 PM',
    },
    {
      type: 'warning',
      icon: '🔋',
      title: 'Low Battery - Sensor #47',
      message: 'The C-08 office temperature sensor requires a battery replacement.',
      time: 'Yesterday at 4:45 PM',
    },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'critical':
        return {
          borderColor: '#EF4444',
          iconBg: 'rgba(239, 68, 68, 0.1)',
          iconColor: '#EF4444',
        };
      case 'warning':
        return {
          borderColor: '#F59E0B',
          iconBg: 'rgba(245, 158, 11, 0.1)',
          iconColor: '#F59E0B',
        };
      case 'info':
        return {
          borderColor: '#8B5CF6',
          iconBg: 'rgba(139, 92, 246, 0.1)',
          iconColor: '#8B5CF6',
        };
      default:
        return {
          borderColor: '#E5E7EB',
          iconBg: '#F8F7FC',
          iconColor: '#6B7280',
        };
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Notifications & Alerts</Text>
        <Text style={styles.pageSubtitle}>Stay informed in real time</Text>
      </View>

      <View style={styles.notificationsList}>
        {notifications.map((notification) => {
          const notifStyle = getNotificationStyle(notification.type);
          return (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                { borderLeftColor: notifStyle.borderColor },
              ]}
            >
              <View
                style={[
                  styles.notificationIcon,
                  { backgroundColor: notifStyle.iconBg },
                ]}
              >
                <Text style={styles.iconText}>{notification.icon}</Text>
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  pageHeader: {
    marginBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  notificationsList: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default NotificationsPage;