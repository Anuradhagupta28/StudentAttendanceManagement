import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Alert,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Mock Data
const mockStudents = [
  { id: 1, name: 'John Doe', rollNo: '001', class: 'Class A', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', attendance: 92 },
  { id: 2, name: 'Jane Smith', rollNo: '002', class: 'Class A', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bb?w=150&h=150&fit=crop&crop=face', attendance: 78 },
  { id: 3, name: 'Mike Johnson', rollNo: '003', class: 'Class B', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', attendance: 65 },
  { id: 4, name: 'Sarah Wilson', rollNo: '004', class: 'Class A', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', attendance: 95 },
  { id: 5, name: 'Tom Brown', rollNo: '005', class: 'Class B', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', attendance: 82 },
];

const mockClasses = ['Class A', 'Class B', 'Class C'];

// Splash Screen Component
const SplashScreen = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.splashContainer}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>AE</Text>
        </View>
        <Text style={styles.appName}>AttendEase</Text>
        <Text style={styles.tagline}>Smart Attendance Management</Text>
      </Animated.View>
    </LinearGradient>
  );
};

// Login Screen Component
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin();
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loginContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>AE</Text>
          </View>
          <Text style={styles.appName}>AttendEase</Text>
        </View>

        <View style={styles.loginForm}>
          <Text style={styles.loginTitle}>Welcome Back</Text>
          <Text style={styles.loginSubtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loginButtonGradient}>
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

// Dashboard Component
const Dashboard = () => {
  const totalStudents = mockStudents.length;
  const presentToday = Math.floor(Math.random() * totalStudents);
  const absentToday = totalStudents - presentToday;
  const totalClasses = mockClasses.length;

  const recentActivities = [
    { id: 1, action: 'Marked attendance for Class A', time: '2 hours ago' },
    { id: 2, action: 'Added new student Sarah Wilson', time: '5 hours ago' },
    { id: 3, action: 'Generated monthly report', time: '1 day ago' },
  ];

  const StatCard = ({ title, value, color, icon }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Text style={[styles.statIconText, { color }]}>{icon}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.dashboardContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <Text style={styles.dashboardSubtitle}>Today's Overview</Text>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <StatCard title="Total Students" value={totalStudents} color="#4CAF50" icon="👥" />
        <StatCard title="Present Today" value={presentToday} color="#2196F3" icon="✅" />
        <StatCard title="Absent Today" value={absentToday} color="#F44336" icon="❌" />
        <StatCard title="Total Classes" value={totalClasses} color="#FF9800" icon="🏫" />
      </View>

      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Mark Attendance Component
const MarkAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [students, setStudents] = useState(
    mockStudents.map(student => ({ ...student, status: 'unmarked' }))
  );

  const filteredStudents = selectedClass === 'All Classes' 
    ? students 
    : students.filter(student => student.class === selectedClass);

  const markAttendance = (studentId, status) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents(prev => 
      prev.map(student => ({ ...student, status: 'present' }))
    );
  };

  const markAllAbsent = () => {
    setStudents(prev => 
      prev.map(student => ({ ...student, status: 'absent' }))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#4CAF50';
      case 'absent': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const StudentRow = ({ student }) => (
    <View style={styles.studentRow}>
      <Image source={{ uri: student.photo }} style={styles.studentPhoto} />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentDetails}>Roll: {student.rollNo} | {student.class}</Text>
      </View>
      <View style={styles.attendanceButtons}>
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            { backgroundColor: student.status === 'present' ? '#4CAF50' : '#E0E0E0' }
          ]}
          onPress={() => markAttendance(student.id, 'present')}
        >
          <Text style={[
            styles.attendanceButtonText,
            { color: student.status === 'present' ? 'white' : '#666' }
          ]}>P</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            { backgroundColor: student.status === 'absent' ? '#F44336' : '#E0E0E0' }
          ]}
          onPress={() => markAttendance(student.id, 'absent')}
        >
          <Text style={[
            styles.attendanceButtonText,
            { color: student.status === 'absent' ? 'white' : '#666' }
          ]}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Mark Attendance</Text>
      </LinearGradient>

      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Date:</Text>
          <TextInput
            style={styles.dateInput}
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Class:</Text>
          <TouchableOpacity style={styles.classSelector}>
            <Text style={styles.classSelectorText}>{selectedClass}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bulkActions}>
          <TouchableOpacity style={styles.bulkButton} onPress={markAllPresent}>
            <Text style={styles.bulkButtonText}>Mark All Present</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bulkButton, styles.bulkButtonAbsent]} onPress={markAllAbsent}>
            <Text style={styles.bulkButtonText}>Mark All Absent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <StudentRow student={item} />}
        style={styles.studentsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Students Management Component
const StudentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.includes(searchQuery);
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 75) return '#FF9800';
    return '#F44336';
  };

  const StudentCard = ({ student }) => (
    <View style={styles.studentCard}>
      <Image source={{ uri: student.photo }} style={styles.studentCardPhoto} />
      <View style={styles.studentCardInfo}>
        <Text style={styles.studentCardName}>{student.name}</Text>
        <Text style={styles.studentCardDetails}>Roll: {student.rollNo}</Text>
        <Text style={styles.studentCardDetails}>{student.class}</Text>
        <View style={styles.attendanceBar}>
          <View style={[
            styles.attendanceProgress,
            {
              width: `${student.attendance}%`,
              backgroundColor: getAttendanceColor(student.attendance)
            }
          ]} />
        </View>
        <Text style={[
          styles.attendancePercentage,
          { color: getAttendanceColor(student.attendance) }
        ]}>
          {student.attendance}% Attendance
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Students Management</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Student</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.classFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All Classes', ...mockClasses].map((className) => (
            <TouchableOpacity
              key={className}
              style={[
                styles.classChip,
                selectedClass === className && styles.classChipSelected
              ]}
              onPress={() => setSelectedClass(className)}
            >
              <Text style={[
                styles.classChipText,
                selectedClass === className && styles.classChipTextSelected
              ]}>
                {className}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <StudentCard student={item} />}
        numColumns={2}
        columnWrapperStyle={styles.studentRow}
        style={styles.studentsGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Reports & Analytics Component
const ReportsAnalytics = () => {
  const classAttendance = mockClasses.map(className => {
    const classStudents = mockStudents.filter(s => s.class === className);
    const avgAttendance = classStudents.reduce((sum, s) => sum + s.attendance, 0) / classStudents.length;
    return { class: className, attendance: Math.round(avgAttendance) };
  });

  const lowAttendanceStudents = mockStudents.filter(s => s.attendance < 75);

  const ClassAttendanceCard = ({ classData }) => (
    <View style={styles.classCard}>
      <Text style={styles.className}>{classData.class}</Text>
      <Text style={styles.classAttendance}>{classData.attendance}%</Text>
      <View style={styles.attendanceBar}>
        <View style={[
          styles.attendanceProgress,
          {
            width: `${classData.attendance}%`,
            backgroundColor: classData.attendance >= 75 ? '#4CAF50' : '#F44336'
          }
        ]} />
      </View>
    </View>
  );

  const LowAttendanceAlert = ({ student }) => (
    <View style={styles.alertCard}>
      <Image source={{ uri: student.photo }} style={styles.alertPhoto} />
      <View style={styles.alertInfo}>
        <Text style={styles.alertName}>{student.name}</Text>
        <Text style={styles.alertDetails}>{student.class} | {student.attendance}%</Text>
      </View>
      <View style={styles.alertBadge}>
        <Text style={styles.alertBadgeText}>!</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
      </LinearGradient>

      <ScrollView style={styles.reportsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class-wise Attendance</Text>
          {classAttendance.map((classData, index) => (
            <ClassAttendanceCard key={index} classData={classData} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Low Attendance Alerts</Text>
          {lowAttendanceStudents.length > 0 ? (
            lowAttendanceStudents.map((student) => (
              <LowAttendanceAlert key={student.id} student={student} />
            ))
          ) : (
            <Text style={styles.noAlertsText}>No low attendance alerts</Text>
          )}
        </View>

        <View style={styles.exportSection}>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>📊 Export CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>📋 Generate Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Main Navigation Component
const Navigation = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '✅' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <View style={styles.navigation}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.navItem,
            currentScreen === item.id && styles.navItemActive
          ]}
          onPress={() => onScreenChange(item.id)}
        >
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={[
            styles.navLabel,
            currentScreen === item.id && styles.navLabelActive
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main App Component
const AttendEaseApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <MarkAttendance />;
      case 'students':
        return <StudentsManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Login Screen Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContent: {
    width: '100%',
    maxWidth: 400,
  },
  loginForm: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  forgotPassword: {
    color: '#667eea',
    textAlign: 'right',
    marginBottom: 30,
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Dashboard Styles
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dashboardHeader: {
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  dashboardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    marginTop: -20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 5,
    flex: 1,
    minWidth: width / 2 - 30,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconText: {
    fontSize: 20,
  },
  recentActivityContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 16,
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  // Common Styles
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  // Mark Attendance Styles
  filtersContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 60,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  classSelector: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  classSelectorText: {
    fontSize: 16,
    color: '#333',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bulkButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  bulkButtonAbsent: {
    backgroundColor: '#F44336',
  },
  bulkButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  studentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studentRow: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
})