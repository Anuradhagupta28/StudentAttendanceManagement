import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DashboardScreen = ({ navigation }) => {
  const stats = [
    { title: 'Total Students', value: '240', color: '#4F46E5', icon: '👥' },
    { title: 'Present Today', value: '186', color: '#10B981', icon: '✅' },
    { title: 'Absent Today', value: '54', color: '#EF4444', icon: '❌' },
    { title: 'Total Classes', value: '12', color: '#8B5CF6', icon: '🏫' },
  ];

  const recentActivity = [
    { action: 'Marked attendance for Class 10A', time: '10:30 AM' },
    { action: 'Added new student - John Doe', time: '09:15 AM' },
    { action: 'Generated monthly report', time: '08:45 AM' },
    { action: 'Updated Class 9B attendance', time: '08:20 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Teacher!</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <LinearGradient
                  colors={[stat.color, `${stat.color}80`]}
                  style={styles.statGradient}
                >
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('MarkAttendanceScreen')}
              >
                <Text style={styles.actionIcon}>📝</Text>
                <Text style={styles.actionText}>Mark Attendance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('StudentsScreen')}
              >
                <Text style={styles.actionIcon}>👥</Text>
                <Text style={styles.actionText}>Manage Students</Text>
              </TouchableOpacity>
               <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('ReportsAnalytics')}
              >
                <Text style={styles.actionIcon}>✅</Text>
                <Text style={styles.actionText}>Reports & Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
  },
  activitySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  quickActions: {
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});

export default DashboardScreen;