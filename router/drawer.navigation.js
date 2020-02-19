import * as React from 'react'
import {
    View,
    Text
} from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screen/login/login.screen'
import Main from '../screen/main/main.screen'
import Profile from '../screen/profile/profile.screen'
import Attendance from '../screen/attendance/attendance.screen'
import Overtime from '../screen/overtime/overtime.screen'
import Payroll from '../screen/payroll/payroll.screen'

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Overtime" component={Overtime} />
        <Stack.Screen name="Payroll" component={Payroll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;