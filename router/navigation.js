import * as React from 'react'

import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'

// import {
//   createBottomTabNavigator
// } from '@react-navigation/bottom-tabs'

import { Image, TouchableOpacity } from 'react-native'
import { View, Text, Button, Icon, Form } from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';

import Login from '../screen/login/login.screen'
import Dashboard from '../screen/dashboard/dashboard.screen'
import EmployeeList from '../screen/dashboard/employeelist.screen'
import Department from '../screen/dashboard/department.screen'
import UpcomingBirthday from '../screen/dashboard/upcomingbirthday.screen'
import TodayLeave from '../screen/dashboard/todayleaves.screens'
import ContractProfile from '../screen/dashboard/contracrprofile.screen'
import ExitEmployeeList from '../screen/dashboard/exitemployee.screen'
import JoinEmployeeList from '../screen/dashboard/joinemployeelist.screen'
import AbsentEmployeeList from '../screen/dashboard/todayabsentlist.screen'
import DashboardLeaveRequestList from '../screen/dashboard/dashboardleaverequestlist.screen'
import DashboardAttendance from '../screen/dashboard/todayattendence.screen'
import Main from '../screen/main/main.screen'
import ProfileScreen from '../screen/profile/profile.screen'
import Attendance from '../screen/attendance/attendance.screen'
import Overtime from '../screen/overtime/overtimedashboard.screen'
import Payroll from '../screen/payroll/payroll.screen'
import PayrollDetail from '../screen/payroll/pryroll.detail.screen'
import Leave from '../screen/leave/leavedashboard.screen'
import LeaveRequest from '../screen/leave/leaverequest.screen'
import AdminLeaveApprove from '../screen/leave/_approve.screen';
import EmpLeaveApproved from '../screen/leave/leaveapproved.screen';
import EmployeeLeaveRejected from '../screen/leave/leaverejected.screen'
import EmployeeLeaveHistory from '../screen/leave/leavehistory.screen'
import EmployeeLeaveBalance from '../screen/leave/leavebalance.screen'
import EmployeeLeavePending from '../screen/leave/leavepending.screen'
import AdminOvertimeApprove from '../screen/overtime/_approve.screen'
import OvertimeRequest from '../screen/overtime/overtimerequest.screen'
import OvertimePending from '../screen/overtime/overtimepending.screen'
import OvertimeHistory  from '../screen/overtime/overtimehistory.screen'
import OvertimeApprove from '../screen/overtime/overtimeapprove'
import OvertimeRejected from '../screen/overtime/overtimerejected'
import NoticeBoard from '../screen/noticeboard/noticeboard.screen';
import NotiboardDetail from '../screen/noticeboard/detail.screen';
import SideMenu from '../router/SideMenu';
import CheckIn from '../screen/checkinout/checkin';
import CheckOut from  '../screen/checkinout/chectout';

import styNav from './navigation.style'

function CustomdrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SideMenu navigation={props.navigation} />
    </DrawerContentScrollView>
  )
}


const Drawer = createDrawerNavigator()
function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => CustomdrawerContent(props)} edgeWidth={0}>
        <Drawer.Screen name='Login' component={Login}
          options={{
            headerShown: false,
            edgeWidth: 0
          }}
        />
      
        <Drawer.Screen name='Dashboard' component={Dashboard} />
        <Drawer.Screen name='EmployeeList' component={EmployeeList} />
        <Drawer.Screen name='Department' component={Department} />
        <Drawer.Screen name='UpcomingBirthday' component={UpcomingBirthday} />
        <Drawer.Screen name='TodayLeave' component={TodayLeave} />
        <Drawer.Screen name="ContractProfile" component={ContractProfile} />
        <Drawer.Screen name="ExitEmployeeList" component={ExitEmployeeList} />
        <Drawer.Screen name="JoinEmployeeList" component={JoinEmployeeList} />
        <Drawer.Screen name="AbsentEmployeeList" component={AbsentEmployeeList} />
        <Drawer.Screen name="DashboardLeaveRequestList" component={DashboardLeaveRequestList} />
        <Drawer.Screen name="DashboardAttendance" component={DashboardAttendance} />
        <Drawer.Screen name='Main' component={Main} />
        <Drawer.Screen name='Profile' component={ProfileScreen} />
        <Drawer.Screen name='Attendance' component={Attendance} />
        <Drawer.Screen name='Overtime' component={Overtime} />
        <Drawer.Screen name='AdminOvertimeApprove' component={AdminOvertimeApprove} />
        <Drawer.Screen name='OvertimePending' component={OvertimePending} />
        <Drawer.Screen name='OvertimeRequest' component={OvertimeRequest} />
        <Drawer.Screen name='OvertimeHistory' component={OvertimeHistory} />
        <Drawer.Screen name='OvertimeApprove' component={OvertimeApprove} />
        <Drawer.Screen name='OvertimeRejected' component={OvertimeRejected} />
        <Drawer.Screen name='Payroll' component={Payroll} />
        <Drawer.Screen name='PayrollDetail' component={PayrollDetail} />
        <Drawer.Screen name='Leave' component={Leave} />
        <Drawer.Screen name='LeaveRequest' component={LeaveRequest} />
        <Drawer.Screen name='AdminLeaveApprove' component={AdminLeaveApprove}/>
        <Drawer.Screen name='EmployeeLeaveApproved' component={EmpLeaveApproved}/>
        <Drawer.Screen name='EmployeeLeaveRejected' component={EmployeeLeaveRejected}/>
        <Drawer.Screen name='EmployeeLeaveHistory' component={EmployeeLeaveHistory}/>
        <Drawer.Screen name='EmployeeLeaveBalance' component={EmployeeLeaveBalance}/>
        <Drawer.Screen name='EmployeeLeavePending' component={EmployeeLeavePending}/>
        <Drawer.Screen name='NoticeBoard' component={NoticeBoard}/>
        <Drawer.Screen name='NotiboardDetail' component={NotiboardDetail}/>
        <Drawer.Screen name='CheckIn' component={CheckIn}/>
        <Drawer.Screen name='CheckOut' component={CheckOut}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

