import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StudentsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const students = [
    { id: 1, name: 'John Doe', rollNo: '001', class: '10A', photo: '👦', attendance: 92 },
    { id: 2, name: 'Jane Smith', rollNo: '002', class: '10A', photo: '👧', attendance: 88 },
    { id: 3, name: 'Mike Johnson', rollNo: '003', class: '10B', photo: '👦', attendance: 76 },
    { id: 4, name: 'Sarah Wilson', rollNo: '004', class: '9A', photo: '👧', attendance: 94 },
    { id: 5, name: 'David Brown', rollNo: '005', class: '9B', photo: '👦', attendance: 68 },
    { id: 6, name: 'Emily Davis', rollNo: '006', class: '10A', photo: '👧', attendance: 85 },
  ];

  const classes = ['All', '10A', '10B', '9A', '9B', '8A', '8B'];

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return '#10b981'; // Green
    if (attendance >= 75) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getAttendanceStatus = (attendance) => {
    if (attendance >= 90) return 'Excellent';
    if (attendance >= 75) return 'Good';
    return 'Poor';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         student.rollNo.includes(searchText);
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const renderStudent = ({ item }) => (
    <TouchableOpacity style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <Text style={styles.studentPhoto}>{item.photo}</Text>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentDetails}>Roll: {item.rollNo} • Class: {item.class}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.attendanceSection}>
        <View style={styles.attendanceInfo}>
          <Text style={styles.attendancePercentage}>{item.attendance}%</Text>
          <Text style={[
            styles.attendanceStatus,
            { color: getAttendanceColor(item.attendance) }
          ]}>
            {getAttendanceStatus(item.attendance)}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${item.attendance}%`,
                backgroundColor: getAttendanceColor(item.attendance)
              }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Students Management</Text>
        <Text style={styles.headerSubtitle}>Manage student profiles and attendance</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>➕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.classFilters}
        >
          {classes.map(cls => (
            <TouchableOpacity
              key={cls}
              style={[
                styles.classFilter,
                selectedClass === cls && styles.activeClassFilter
              ]}
              onPress={() => setSelectedClass(cls)}
            >
              <Text style={[
                styles.classText,
                selectedClass === cls && styles.activeClassText
              ]}>{cls}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredStudents}
          renderItem={renderStudent}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={1}
        />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 15,
    marginLeft: 10,
  },
  addIcon: {
    fontSize: 16,
  },
  classFilters: {
    marginBottom: 20,
  },
  classFilter: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeClassFilter: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  classText: {
    color: '#374151',
    fontWeight: '500',
  },
  activeClassText: {
    color: 'white',
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  studentPhoto: {
    fontSize: 40,
    marginRight: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
    studentDetails: {
    fontSize: 14,
    }
})
export default StudentsScreen;