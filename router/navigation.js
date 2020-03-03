import * as React from 'react'

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'

import {Image} from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';

import styNav from './navigation.style'

function CustomdrawerContent(props) {
    // console.log(props)
    return (
        <DrawerContentScrollView {...props}>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/user-icn.png')} style={styNav.image}/>
                <Text>Profile</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/attendance.png')} style={styNav.image}/>
                <Text>Attendance</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/leave.png')} style={styNav.image}/>
                <Text>Leave</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/ot.png')} style={styNav.image2}/>
                <Text>Overtime</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/payroll.png')} style={styNav.image3}/>
                <Text>Payroll</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback style={styNav.item}>
                <Image source={require('../assets/icon/lgoout.png')} style={styNav.image2}/>
                <Text>Logout</Text>
            </TouchableNativeFeedback>
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator()

function Navigation () {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => CustomdrawerContent(props)}>
                <Drawer.Screen name='Auth' component={Auth}
                options={{
                    headerShown: false
                }}
                />
                <Drawer.Screen  name='Login' component={Login} 
                options={{
                    headerShown: false
                }}
                />
                <Drawer.Screen name='Main' component={Main}/>
                <Drawer.Screen name='Profile' component={Profile} />
                <Drawer.Screen name='Attendance' component={Attendance} />
                <Drawer.Screen name='Overtime' component={Overtime} />
                <Drawer.Screen name='Payroll' component={Payroll} />
                <Drawer.Screen name='PayrollDetail' component={PayrollDetail} />
                <Drawer.Screen name='Leave' component={Leave} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

