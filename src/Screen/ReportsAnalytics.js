import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import { Svg, Polyline, Circle, Text as SvgText, Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const ReportsAnalytics = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Sample data - replace with your actual data source
  const [attendanceData] = useState({
    classes: {
      'Class 10A': {
        students: [
          { id: 1, name: 'John Doe', attendance: 85, totalClasses: 100, presentClasses: 85 },
          { id: 2, name: 'Jane Smith', attendance: 92, totalClasses: 100, presentClasses: 92 },
          { id: 3, name: 'Mike Johnson', attendance: 68, totalClasses: 100, presentClasses: 68 },
          { id: 4, name: 'Sarah Wilson', attendance: 78, totalClasses: 100, presentClasses: 78 },
          { id: 5, name: 'David Brown', attendance: 95, totalClasses: 100, presentClasses: 95 },
        ],
        average: 83.6,
        subject: 'Mathematics'
      },
      'Class 10B': {
        students: [
          { id: 6, name: 'Emily Davis', attendance: 88, totalClasses: 95, presentClasses: 84 },
          { id: 7, name: 'Tom Wilson', attendance: 72, totalClasses: 95, presentClasses: 68 },
          { id: 8, name: 'Lisa Anderson', attendance: 91, totalClasses: 95, presentClasses: 86 },
          { id: 9, name: 'Chris Taylor', attendance: 65, totalClasses: 95, presentClasses: 62 },
          { id: 10, name: 'Anna Martinez', attendance: 89, totalClasses: 95, presentClasses: 85 },
        ],
        average: 81.0,
        subject: 'Science'
      },
      'Class 9A': {
        students: [
          { id: 11, name: 'Ryan Clark', attendance: 76, totalClasses: 90, presentClasses: 68 },
          { id: 12, name: 'Maya Patel', attendance: 94, totalClasses: 90, presentClasses: 85 },
          { id: 13, name: 'Alex Kim', attendance: 82, totalClasses: 90, presentClasses: 74 },
          { id: 14, name: 'Sophie Lee', attendance: 87, totalClasses: 90, presentClasses: 78 },
          { id: 15, name: 'Jake Miller', attendance: 69, totalClasses: 90, presentClasses: 62 },
        ],
        average: 81.6,
        subject: 'English'
      }
    }
  });

  useEffect(() => {
    generateReportData();
  }, [selectedClass]);

  const generateReportData = () => {
    const classes = attendanceData.classes;
    const classNames = Object.keys(classes);
    
    if (selectedClass === 'all') {
      const overallData = {
        classAverages: classNames.map(className => ({
          class: className,
          average: classes[className].average,
          studentCount: classes[className].students.length
        })),
        lowAttendanceStudents: [],
        monthlyTrend: generateMonthlyTrend(),
        attendanceDistribution: generateAttendanceDistribution()
      };

      // Collect all low attendance students
      classNames.forEach(className => {
        const lowAttendanceInClass = classes[className].students.filter(
          student => student.attendance < 75
        ).map(student => ({
          ...student,
          class: className,
          subject: classes[className].subject
        }));
        overallData.lowAttendanceStudents.push(...lowAttendanceInClass);
      });

      setReportData(overallData);
    } else {
      const classData = classes[selectedClass];
      setReportData({
        classData,
        lowAttendanceStudents: classData.students.filter(
          student => student.attendance < 75
        ),
        monthlyTrend: generateMonthlyTrend(selectedClass),
        attendanceDistribution: generateAttendanceDistribution(selectedClass)
      });
    }
  };

  const generateMonthlyTrend = (className = null) => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: className 
        ? [78, 82, 85, 83, 87, 85] 
        : [80, 83, 86, 84, 88, 86]
    };
  };

  const generateAttendanceDistribution = (className = null) => {
    const ranges = ['0-50%', '51-65%', '66-75%', '76-85%', '86-95%', '96-100%'];
    const colors = ['#FF6B6B', '#FF8E53', '#FF9F43', '#FEA47F', '#26DE81', '#4834D4'];
    
    const data = className 
      ? [2, 8, 15, 25, 35, 15]
      : [5, 12, 18, 30, 25, 10];

    return ranges.map((range, index) => ({
      name: range,
      count: data[index],
      color: colors[index]
    }));
  };

  const getLowAttendanceAlerts = () => {
    if (!reportData || !reportData.lowAttendanceStudents) return [];
    return reportData.lowAttendanceStudents;
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#26DE81';
    if (percentage >= 80) return '#FEA47F';
    if (percentage >= 75) return '#FF9F43';
    if (percentage >= 65) return '#FF8E53';
    return '#FF6B6B';
  };

  const getAttendanceIcon = (percentage) => {
    if (percentage >= 90) return '📈';
    if (percentage >= 80) return '📊';
    return '📉';
  };

  const exportData = async () => {
    try {
      setIsLoading(true);
      
      let csvContent = 'Student Name,Class,Subject,Attendance %,Present Classes,Total Classes,Status\n';
      
      if (selectedClass === 'all') {
        Object.keys(attendanceData.classes).forEach(className => {
          const classData = attendanceData.classes[className];
          classData.students.forEach(student => {
            const status = student.attendance >= 75 ? 'Good' : 'Low';
            csvContent += `${student.name},${className},${classData.subject},${student.attendance}%,${student.presentClasses},${student.totalClasses},${status}\n`;
          });
        });
      } else {
        const classData = attendanceData.classes[selectedClass];
        classData.students.forEach(student => {
          const status = student.attendance >= 75 ? 'Good' : 'Low';
          csvContent += `${student.name},${selectedClass},${classData.subject},${student.attendance}%,${student.presentClasses},${student.totalClasses},${status}\n`;
        });
      }

      await Share.share({
        message: csvContent,
        title: `Attendance Report - ${selectedClass} - ${new Date().toISOString().split('T')[0]}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export report');
      console.error('Export error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDetailedReport = () => {
    Alert.alert(
      'Generate Report',
      'Choose report type:',
      [
        { text: 'Monthly Report', onPress: () => Alert.alert('Success', 'Monthly attendance report has been generated.') },
        { text: 'Student Summary', onPress: () => Alert.alert('Success', 'Student summary report has been generated.') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const SimpleLineChart = ({ data }) => {
    const maxValue = Math.max(...data.data);
    const minValue = Math.min(...data.data);
    const range = maxValue - minValue || 1;
    const chartWidth = screenWidth - 60;
    const chartHeight = 150;
    
    return (
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          <Polyline
            fill="none"
            stroke="#4834D4"
            strokeWidth="2"
            points={data.data.map((value, index) => {
              const x = (index / (data.data.length - 1)) * (chartWidth - 40) + 20;
              const y = 130 - ((value - minValue) / range) * 100;
              return `${x},${y}`;
            }).join(' ')}
          />
          {data.data.map((value, index) => {
            const x = (index / (data.data.length - 1)) * (chartWidth - 40) + 20;
            const y = 130 - ((value - minValue) / range) * 100;
            return (
              <React.Fragment key={index}>
                <Circle cx={x} cy={y} r="4" fill="#4834D4" />
                <SvgText x={x} y={145} textAnchor="middle" fontSize="12" fill="#666">
                  {data.labels[index]}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    );
  };

  const SimplePieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    const radius = 60;
    const centerX = 80;
    const centerY = 80;
    
    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          <Svg width={160} height={160} viewBox="0 0 160 160">
            {data.map((item, index) => {
              const angle = (item.count / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle += angle;
              
              const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
              const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
              const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
              const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              return (
                <Path
                  key={index}
                  d={`M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={item.color}
                />
              );
            })}
          </Svg>
        </View>
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.name}: {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTabButton = (tabId, title, icon) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tabId ? styles.activeTab : styles.inactiveTab
      ]}
      onPress={() => setSelectedTab(tabId)}
    >
      <Text style={styles.tabIcon}>{icon}</Text>
      <Text style={[
        styles.tabTitle,
        selectedTab === tabId ? styles.activeTabText : styles.inactiveTabText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderClassSelector = () => (
    <View style={styles.classSelector}>
      <Text style={styles.classSelectorTitle}>Select Class:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classButtons}>
        <TouchableOpacity
          style={[
            styles.classButton,
            selectedClass === 'all' ? styles.activeClassButton : styles.inactiveClassButton
          ]}
          onPress={() => setSelectedClass('all')}
        >
          <Text style={[
            styles.classButtonText,
            selectedClass === 'all' ? styles.activeClassButtonText : styles.inactiveClassButtonText
          ]}>
            All Classes
          </Text>
        </TouchableOpacity>
        {Object.keys(attendanceData.classes).map(className => (
          <TouchableOpacity
            key={className}
            style={[
              styles.classButton,
              selectedClass === className ? styles.activeClassButton : styles.inactiveClassButton
            ]}
            onPress={() => setSelectedClass(className)}
          >
            <Text style={[
              styles.classButtonText,
              selectedClass === className ? styles.activeClassButtonText : styles.inactiveClassButtonText
            ]}>
              {className}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderOverview = () => (
    <ScrollView style={styles.content}>
      {selectedClass === 'all' ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class-wise Attendance Overview</Text>
          {reportData?.classAverages.map((classData, index) => (
            <View key={index} style={styles.classCard}>
              <View style={styles.classCardHeader}>
                <Text style={styles.classCardTitle}>{classData.class}</Text>
                <View style={styles.attendanceIndicator}>
                  <Text style={styles.attendanceIcon}>{getAttendanceIcon(classData.average)}</Text>
                  <Text style={[styles.attendancePercentage, { color: getAttendanceColor(classData.average) }]}>
                    {classData.average.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.studentCount}>{classData.studentCount} students</Text>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { 
                      width: `${classData.average}%`, 
                      backgroundColor: getAttendanceColor(classData.average) 
                    }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class: {selectedClass}</Text>
          <View style={styles.classCard}>
            <Text style={styles.classCardTitle}>
              Average Attendance: {reportData?.classData.average.toFixed(1)}%
            </Text>
            <Text style={styles.subjectText}>
              Subject: {reportData?.classData.subject}
            </Text>
          </View>
        </View>
      )}

      {reportData?.monthlyTrend && (
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Monthly Attendance Trend</Text>
          <SimpleLineChart data={reportData.monthlyTrend} />
        </View>
      )}

      {reportData?.attendanceDistribution && (
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Attendance Distribution</Text>
          <SimplePieChart data={reportData.attendanceDistribution} />
        </View>
      )}
    </ScrollView>
  );

  const renderAlerts = () => {
    const lowAttendanceStudents = getLowAttendanceAlerts();
    
    return (
      <ScrollView style={styles.content}>
        <View style={styles.alertsHeader}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertsTitle}>Low Attendance Alerts</Text>
          <Text style={styles.alertsCount}>({lowAttendanceStudents.length})</Text>
        </View>
        
        {lowAttendanceStudents.length === 0 ? (
          <View style={styles.noAlertsContainer}>
            <Text style={styles.noAlertsIcon}>✅</Text>
            <Text style={styles.noAlertsTitle}>No low attendance alerts!</Text>
            <Text style={styles.noAlertsText}>All students are maintaining good attendance.</Text>
          </View>
        ) : (
          <View style={styles.alertsList}>
            {lowAttendanceStudents.map((student, index) => (
              <View key={student.id || index} style={styles.alertCard}>
                <View style={styles.alertCardHeader}>
                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    {student.class && (
                      <Text style={styles.studentInfo}>
                        {student.class} - {student.subject}
                      </Text>
                    )}
                  </View>
                  <View style={styles.attendanceBadge}>
                    <Text style={styles.attendanceBadgeText}>{student.attendance}%</Text>
                  </View>
                </View>
                <View style={styles.studentStats}>
                  <Text style={styles.statText}>
                    Present: {student.presentClasses} / {student.totalClasses} classes
                  </Text>
                  <Text style={styles.statText}>
                    Needs {Math.ceil((student.totalClasses * 0.75) - student.presentClasses)} more classes for 75%
                  </Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>💬 Notify Parent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>👤 View Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderExports = () => (
    <ScrollView style={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Options</Text>
        
        <TouchableOpacity style={styles.exportOption} onPress={exportData}>
          <View style={styles.exportOptionContent}>
            <Text style={styles.exportIcon}>📥</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Export Data</Text>
              <Text style={styles.exportDescription}>Share attendance data</Text>
            </View>
          </View>
          <Text style={styles.exportArrow}>▶</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exportOption} onPress={generateDetailedReport}>
          <View style={styles.exportOptionContent}>
            <Text style={styles.exportIcon}>📊</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Generate Reports</Text>
              <Text style={styles.exportDescription}>Create detailed attendance reports</Text>
            </View>
          </View>
          <Text style={styles.exportArrow}>▶</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exportOption}>
          <View style={styles.exportOptionContent}>
            <Text style={styles.exportIcon}>📧</Text>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Email Reports</Text>
              <Text style={styles.exportDescription}>Send reports to stakeholders</Text>
            </View>
          </View>
          <Text style={styles.exportArrow}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📅</Text>
            <Text style={styles.quickActionText}>Daily Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionText}>Weekly Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📈</Text>
            <Text style={styles.quickActionText}>Monthly Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionIcon}>📋</Text>
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverview();
      case 'alerts':
        return renderAlerts();
      case 'exports':
        return renderExports();
      default:
        return renderOverview();
    }
  };

  if (!reportData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading reports...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
      </View>

      {renderClassSelector()}

      <View style={styles.tabContainer}>
        {renderTabButton('overview', 'Overview', '📊')}
        {renderTabButton('alerts', 'Alerts', '⚠️')}
        {renderTabButton('exports', 'Export', '📥')}
      </View>

      {renderContent()}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingModal}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingModalText}>Processing...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  classSelector: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  classSelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  classButtons: {
    flexDirection: 'row',
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeClassButton: {
    backgroundColor: '#4F46E5',
  },
  inactiveClassButton: {
    backgroundColor: '#F3F4F6',
  },
  classButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeClassButtonText: {
    color: 'white',
  },
  inactiveClassButtonText: {
    color: '#374151',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: '#4F46E5',
  },
  inactiveTab: {
    borderBottomColor: 'transparent',
  },
  tabIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4F46E5',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  classCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  attendanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  attendancePercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  subjectText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  chartSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChart: {
    marginRight: 20,
  },
  legendContainer: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  alertsCount: {
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  noAlertsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  noAlertsIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  noAlertsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  noAlertsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  alertsList: {
    padding: 20,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
})
export default ReportsAnalytics;