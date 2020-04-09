import * as React from 'react'

import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'

import { Image, TouchableOpacity } from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';

import Auth from '../screen/auth/auth.screen'
import Login from '../screen/login/login.screen'
import Main from '../screen/main/main.screen'
import ProfileScreen from '../screen/profile/profile.screen'
import Attendance from '../screen/attendance/attendance.screen'
import Overtime from '../screen/overtime/overtime.screen'
import Payroll from '../screen/payroll/payroll.screen'
import PayrollDetail from '../screen/payroll/pryroll.detail.screen'
import Leave from '../screen/leave/leave.screen'
import LeaveApprove from '../screen/leave/_approve.screen';
import OvertimeApprove from '../screen/overtime/_approve.screen';
import SideMenu from '../router/SideMenu';

import styNav from './navigation.style'

function CustomdrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SideMenu navigation={props.navigation} />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()


// function Profile(props) {
//   // useFocusEffect(
//   //   React.useCallback(() => {
//   //     // Do something when the screen is focuse
//   //     return () => {
//   //     };
//   //   }, [])
//   // );

//   return <ProfileScreen navigation={props.navigation}/>
// }

function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => CustomdrawerContent(props)} edgeWidth={0}>
        {/* <Drawer.Screen name='Auth' component={Auth}
                options={{
                    headerShown: false
                }}
                /> */}
        <Drawer.Screen name='Login' component={Login}
          options={{
            headerShown: false,
            edgeWidth: 0
          }}
        />
        <Drawer.Screen name='Main' component={Main} />
        <Drawer.Screen name='Profile' component={ProfileScreen} />
        <Drawer.Screen name='Attendance' component={Attendance} />
        <Drawer.Screen name='Overtime' component={Overtime} />
        <Drawer.Screen name='Payroll' component={Payroll} />
        <Drawer.Screen name='PayrollDetail' component={PayrollDetail} />
        <Drawer.Screen name='Leave' component={Leave} />
        <Drawer.Screen name='LeaveApprove' component={LeaveApprove}/>
        <Drawer.Screen name='OvertimeApprove' component={OvertimeApprove}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

