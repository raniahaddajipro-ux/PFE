import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ReportsPage = () => {
  const stats = [
    {
      title: 'Économies Réalisées',
      value: '€1,247',
      change: '↑ 18%',
      changeText: 'ce trimestre',
      icon: '💰',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10B981',
    },
    {
      title: 'Temps de Fonctionnement',
      value: '99.8%',
      change: 'Uptime',
      changeText: '',
      icon: '⏱️',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8B5CF6',
    },
    {
      title: 'Alertes Résolues',
      value: '142',
      change: 'ce mois',
      changeText: '',
      icon: '✓',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#F59E0B',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Historique & Rapports</Text>
        <Text style={styles.subtitle}>Analysez les données de votre système</Text>
      </View>

      {/* Chart Card */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Consommation Énergétique Mensuelle</Text>
          <View style={styles.chartFilters}>
            <Text style={styles.filterBtn}>3 Mois</Text>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.filterBtnActive}
            >
              <Text style={styles.filterBtnActiveText}>6 Mois</Text>
            </LinearGradient>
            <Text style={styles.filterBtn}>1 An</Text>
          </View>
        </View>
        <View style={styles.chartPlaceholder}>
          <View style={styles.chartBars}>
            {[70, 65, 80, 75, 60, 55].map((height, index) => (
              <LinearGradient
                key={index}
                colors={['#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.chartBar, { height: `${height}%` }]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: stat.iconBg },
                ]}
              >
                <Text style={[styles.iconText, { color: stat.iconColor }]}>
                  {stat.icon}
                </Text>
              </View>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <View style={styles.statChange}>
              <Text style={styles.changeText}>{stat.change}</Text>
              {stat.changeText && (
                <Text style={styles.changeSubtext}> {stat.changeText}</Text>
              )}
            </View>
          </View>
        ))}
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
  chartCard: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderRadius: 16,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  chartFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 13,
    color: '#6B7280',
  },
  filterBtnActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterBtnActiveText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  chartPlaceholder: {
    height: 280,
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: 12,
    padding: 20,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    gap: 16,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 13,
    color: '#6B7280',
  },
  changeSubtext: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default ReportsPage;