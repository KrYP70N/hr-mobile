import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screen/login.screen'
import ProfileScreen from '../screen/profile.screen'
import MainScreen from '../screen/main.screen'
import AttendanceScreen from '../screen/attendance.screen'

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        MainScreen: {
            screen: MainScreen
        },
        ProfileScreen: {
            screen: ProfileScreen
        },
        AttendanceScreen: {
            screen: AttendanceScreen
        }
    }, 
    {
        initialRouteName: 'AttendanceScreen'
    }
)

export default createAppContainer(AppNavigator)