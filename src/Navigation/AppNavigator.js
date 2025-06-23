import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import DashboardScreen from '../Screen/DashboardScreen';
import LoginScreen from '../Screen/LoginScreen';
import StudentsScreen from '../Screen/StudentsScreen';
import ReportsAnalytics from '../Screen/ReportsAnalytics';
import MarkAttendanceScreen from '../Screen/MarkAttendanceScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
<Stack.Screen name="SplashScreen" component={SplashScreen}/>
<Stack.Screen name="DashboardScreen" component={DashboardScreen}/>
<Stack.Screen name="LoginScreen" component={LoginScreen}/>

<Stack.Screen name="MarkAttendanceScreen" component={MarkAttendanceScreen}/>

<Stack.Screen name="StudentsScreen" component={StudentsScreen}/>
<Stack.Screen name="ReportsAnalytics" component={ReportsAnalytics}/>

                        


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;