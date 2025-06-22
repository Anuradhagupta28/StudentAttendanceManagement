import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MarkAttendanceScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedClass, setSelectedClass] = useState('10A');
  
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNo: '001', class: '10A', photo: '👦', status: null },
    { id: 2, name: 'Jane Smith', rollNo: '002', class: '10A', photo: '👧', status: null },
    { id: 3, name: 'Mike Johnson', rollNo: '003', class: '10A', photo: '👦', status: null },
    { id: 4, name: 'Sarah Wilson', rollNo: '004', class: '10A', photo: '👧', status: null },
    { id: 5, name: 'David Brown', rollNo: '005', class: '10A', photo: '👦', status: null },
  ]);

  const classes = ['10A', '10B', '9A', '9B', '8A', '8B'];

  const markAttendance = (studentId, status) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'present' })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'absent' })));
  };

  const renderStudent = ({ item }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentPhoto}>{item.photo}</Text>
        <View style={styles.studentDetails}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentRoll}>Roll No: {item.rollNo}</Text>
        </View>
      </View>
      <View style={styles.attendanceButtons}>
        <TouchableOpacity
          style={[
            styles.attendanceBtn,
            styles.presentBtn,
            item.status === 'present' && styles.activePresentBtn
          ]}
          onPress={() => markAttendance(item.id, 'present')}
        >
          <Text style={[
            styles.btnText,
            item.status === 'present' && styles.activeBtnText
          ]}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.attendanceBtn,
            styles.absentBtn,
            item.status === 'absent' && styles.activeAbsentBtn
          ]}
          onPress={() => markAttendance(item.id, 'absent')}
        >
          <Text style={[
            styles.btnText,
            item.status === 'absent' && styles.activeBtnText
          ]}>Absent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Mark Attendance</Text>
        <Text style={styles.headerDate}>{selectedDate}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.controls}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                ]}>Class {cls}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bulkActions}>
          <TouchableOpacity style={styles.bulkBtn} onPress={markAllPresent}>
            <Text style={styles.bulkBtnText}>Mark All Present</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkBtn} onPress={markAllAbsent}>
            <Text style={styles.bulkBtnText}>Mark All Absent</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
  headerDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  controls: {
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
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bulkBtn: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  bulkBtnText: {
    textAlign: 'center',
    color: '#374151',
    fontWeight: '500',
  },
  studentCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentPhoto: {
    fontSize: 32,
    marginRight: 15,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  studentRoll: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 2,
  },
  attendanceButtons: {
    flexDirection: 'row',
  },
  attendanceBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 1,
  },
  presentBtn: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  absentBtn: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  activePresentBtn: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  activeAbsentBtn: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  activeBtnText: {
    color: 'white',
  },
});

export default MarkAttendanceScreen;