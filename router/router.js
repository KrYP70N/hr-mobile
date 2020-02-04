import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'

import LoginScreen from '../screen/login.screen'
import ProfileScreen from '../screen/profile.screen'
import MainScreen from '../screen/main.screen'
import DashboardScreen from '../screen/dashboard.screen'
import AttendanceScreen from '../screen/attendance.screen'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    MainScreen: {
      screen: MainScreen
    },
    DashboardScreen: {
      screen: DashboardScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    AttendanceScreen: {
      screen: AttendanceScreen
    }
  },
  {
    initialRouteName: 'MainScreen'
  }
)

const MainDrawerNavigator = createDrawerNavigator(
  {
    MainTab: AppNavigator,
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
    // contentComponent: SideMenu,
  });

const FinalNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    // navigationOptions: {
    //   header: null,
    // }
  },
  MainDrawer: {
    screen: MainDrawerNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
});



export default createAppContainer(FinalNavigator)