import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native'
import color from '../constant/color'

export class BottomTab extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.divider}></View>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Main') }}>
                        <View style={styles.eachContainer}>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'main' ? color.primary : color.placeHolder }} source={require('../assets/icon/home.png')} />
                            <Text style={{marginTop: 5, fontSize: 12, textAlign: 'center' }}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                        <View style={styles.eachContainer}>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'dashboard' ? color.primary : color.placeHolder }} source={require('../assets/icon/dashboard.png')} />
                            <Text style={{marginTop: 5, fontSize: 12, textAlign: 'center' }}>Dashboard</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Attendance') }}>
                        <View style={styles.eachContainer}>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'attendance' ? color.primary : color.placeHolder }} source={require('../assets/icon/attendance.png')} />
                            <Text style={{marginTop: 5, fontSize: 12, textAlign: 'center' }}>Attendance</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Leave') }}>
                        <View style={styles.eachContainer}>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'leave' ? color.primary : color.placeHolder }} source={require('../assets/icon/leave.png')} />
                            <Text style={{marginTop: 5, fontSize: 12, textAlign: 'center' }}>Leave</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.navigation.navigate('Overtime') }}>
                        <View style={styles.eachContainer}>
                            <Image style={{ width: 30, height: 30, tintColor: this.props.screen === 'ot' ? color.primary : color.placeHolder }} source={require('../assets/icon/ot.png')} />
                            <Text style={{marginTop: 5, fontSize: 12, textAlign: 'center' }}>Overtime</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: { width: '100%', height: 60, backgroundColor: color.light },
    divider: { width: '100%', height: 0.3, backgroundColor: color.placeHolder },
    innerContainer: { width: '100%', height: 60, flexDirection: 'row' },
    iconContainer: { width: '20%', justifyContent: 'center', alignItems: 'center' },
    eachContainer: {justifyContent: 'center', alignItems: 'center'},

})
export default BottomTab
