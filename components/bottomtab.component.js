import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import color from '../constant/color'

export class BottomTab extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.divider}></View>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Main') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'main' ? color.primary : color.placeHolder }} source={require('../assets/icon/home.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'dashboard' ? color.primary : color.placeHolder }} source={require('../assets/icon/dashboard.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Attendance') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'attendance' ? color.primary : color.placeHolder }} source={require('../assets/icon/attendance.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Leave') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'leave' ? color.primary : color.placeHolder }} source={require('../assets/icon/leave.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Overtime') }}>
                        <View>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'ot' ? color.primary : color.placeHolder }} source={require('../assets/icon/ot.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: { width: '100%', height: 50, backgroundColor: color.light },
    divider: { width: '100%', height: 0.3, backgroundColor: color.placeHolder },
    innerContainer: { width: '100%', height: 50, flexDirection: 'row' },
    iconContainer: { width: '20%', justifyContent: 'center', alignItems: 'center' },

})
export default BottomTab
