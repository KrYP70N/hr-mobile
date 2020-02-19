import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EmployeeLeavePagerScreen from '../screens/leave/EmployeeLeavePagerScreen';
import EmployeeLeaveRequestScreen from '../screens/leave/EmployeeLeaveRequestScreen';
import EmployeeLeaveApproveScreen from '../screens/leave/EmployeeLeaveApproveScreen';
import EmployeeLeaveHistoryScreen from '../screens/leave/EmployeeLeaveHistoryScreen';
import PayrollScreen from '../screens/payroll/PayrollScreen';
import PayrollDetailScreen from '../screens/payroll/PayrollDetailScreen';
import OvertimePagerScreen from '../screens/overtime/OvertimePagerScreen';
import Colors from '../constants/Colors';
import SideMenu from '../components/SideMenu';
import Testing from '../../Testing';

const MainScreenNavigator = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        title: 'Main'
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      }
    },
    Attendance: {
      screen: AttendanceScreen,
      navigationOptions: {
        title: 'Attendance',
      }
    },
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: 'Dashboard',
      }
    },
    Leave: {
      screen: EmployeeLeavePagerScreen,
      navigationOptions: {
        title: 'Leave',
      }
    },
    LeaveRequest: {
      screen: EmployeeLeaveRequestScreen,
      navigationOptions: {
        header: null,
      }
    },
    LeaveApprove: {
      screen: EmployeeLeaveApproveScreen,
      navigationOptions: {
        header: null,
      }
    },
    LeaveHistory: {
      screen: EmployeeLeaveHistoryScreen,
      navigationOptions: {
        header: null,
      }
    },
    Payroll: {
      screen: PayrollScreen,
      navigationOptions: {
        title: 'Payroll',
      }
    },
    PayrollDetail: {
      screen: PayrollDetailScreen,
      navigationOptions: {
        title: 'PayrollDetail',
      }
    },
    Overtime: {
      screen: OvertimePagerScreen,
      navigationOptions: {
        title: 'Overtime',
      }
    },
    Testing: {
      screen: Testing,
      navigationOptions: {
        title: 'Testing',
      }
    }
    // navigationBarStyle : {navBarHidden: true },
  },
  {
    defaultNavigationOptions: {
      initialRouteName: 'Main',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.white : ''
      },
      headerTintColor: Platform.OS === 'android' ? Colors.primary : '#679c32'
    }
  });



const MainDrawerNavigator = createDrawerNavigator(
  {
    MainTab: MainScreenNavigator,
  }
  , {
    drawerPosition: 'left',
    drawerType: 'back',
    navigationOptions: {
      drawerToggleRoute: DrawerActions.toggleDrawer(),
      drawerCloseRoute: DrawerActions.closeDrawer(),
    },
    //drawerToggleRoute: DrawerActions.TOGGLE_DRAWER,
    //unmountInactiveRoutes: true,
    initialRouteName: 'MainTab',
    drawerPosition: 'left',
    contentComponent: SideMenu,

  });

const FinalNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  MainDrawer: {
    screen: MainDrawerNavigator,
    navigationOptions: {
      header: null
    }
  },
});

export default createAppContainer(FinalNavigator);