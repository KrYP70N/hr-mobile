import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import color from '../constant/color'

export class BottomTab extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: 50, backgroundColor: color.light }}>
                <View style={{ width: '100%', height: 0.3, backgroundColor: color.placeHolder }}></View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                {this.props.screen === 'main' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Main') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: color.primary }} source={require('../assets/icon/home.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Main') }}>
                            <View>
                                <Image style={{ width: 30, height: 30, tintColor: color.placeHolder }} source={require('../assets/icon/home.png')} />
                            </View>
                        </TouchableOpacity>
                    }
                    {this.props.screen === 'dashboard' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: color.primary }} source={require('../assets/icon/dashboard.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                            <View>
                                <Image style={{ width: 30, height: 30, tintColor: color.placeHolder }} source={require('../assets/icon/dashboard.png')} />
                            </View>
                        </TouchableOpacity>
                    }

                    {this.props.screen === 'attendance' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Attendance') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: color.primary }} source={require('../assets/icon/attendance.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Attendance') }}>
                            <View>
                                <Image style={{ width: 30, height: 30, tintColor: color.placeHolder }} source={require('../assets/icon/attendance.png')} />
                            </View>
                        </TouchableOpacity>
                    }

                    {this.props.screen === 'leave' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Leave') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: color.primary }} source={require('../assets/icon/leave.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Leave') }}>
                            <View>
                                <Image style={{ width: 30, height: 30, tintColor: color.placeHolder }} source={require('../assets/icon/leave.png')} />
                            </View>
                        </TouchableOpacity>
                    }

                    {this.props.screen === 'ot' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Overtime') }}>
                        <View>
                            <Image style={{ width: 27, height: 29, tintColor: color.primary }} source={require('../assets/icon/ot.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Overtime') }}>
                            <View>
                                <Image style={{ width: 27, height: 29, tintColor: color.placeHolder }} source={require('../assets/icon/ot.png')} />
                            </View>
                        </TouchableOpacity>
                    }

                    {/* {this.props.screen === 'profile' ? <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Profile') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: color.primary }} source={require('../assets/icon/user-icn.png')} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Profile') }}>
                            <View>
                                <Image style={{ width: 30, height: 30, tintColor: color.placeHolder }} source={require('../assets/icon/user-icn.png')} />
                            </View>
                        </TouchableOpacity>
                    } */}
                </View>
            </View>
        )
    }
}

export default BottomTab
