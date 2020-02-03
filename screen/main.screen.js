import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native'

// icon set
import Icon from 'react-native-vector-icons/Feather';

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import main from '../constant/main.constant'

// import component
import Card from '../components/card.component'

export default class MainScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state
        
        return {
          headerShown: false 
        };
    }
    render () {
        return (
            <ScrollView>
                {/* banner section */}
                <View style={main.banner}>
                    <Text style={[main.bannerText, style.textLight, style.mb30, style.mt30]}>10:11 AM friday, 01 Nov 2019</Text>
                    <View style={[main.bannerProfile, style.mb50]}>
                        <View style={[main.info]}>
                            <View style={main.profile}>
                                <Image source={require('../assets/icon/user.png')}/>
                            </View>
                            <View>
                                <Text style={[style.textLight, style.h2]}>John Doe</Text>
                                <Text style={[style.textLight]}>Web Developer</Text>
                            </View>
                        </View>
                        <View style={[main.bannerLink]}>
                            <Icon active name='arrow-right' style={[style.h2, style.textLight, style.textRight]}></Icon>
                        </View>
                    </View>
                </View>
                {/* banner section */}
                <View style={main.panel}>
                    <View style={main.listContainer}>
                        {/* check in/out */}
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'clock',
                                label: 'Check In',
                                layout: 'row'
                            },
                            placeholder: "You haven't check in yet."
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'clock',
                                label: 'Check Out',
                                layout: 'row'
                            },
                            placeholder: "Don't forget to check out."
                        }}/>
                        
                        {/* navigation list */}
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'layout',
                                label: 'Dashboard',
                                layout: 'column'
                            }
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'calendar',
                                label: 'Attandance',
                                layout: 'column'
                            }
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'user-minus',
                                label: 'Leave',
                                layout: 'column'
                            }
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'watch',
                                label: 'Overtime',
                                layout: 'column'
                            }
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'file-text',
                                label: 'Payroll',
                                layout: 'column'
                            }
                        }}/>
                        <Card data={{
                            cardStyle: main.card,
                            title: {
                                icon: 'percent',
                                label: 'Loan',
                                layout: 'column'
                            }
                        }}/>

                    </View>
                </View>
            </ScrollView>
        )
    }
}
