import {Text, View , Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Card} from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'

import styles from '../dashboard/dashboard.style'
const height = Dimensions.get('screen').height;
import React, { Component } from 'react'
const cardList = [
    {
        title: 'Apply',
        noti: 2,
        icon: require('../../assets/icon/leave_apply.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'History',
        noti: 3,
        icon: require('../../assets/icon/leave_history.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'Balance',
        noti: 4,
        icon: require('../../assets/icon/dashboard-pending.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'Approved',
        noti: 0,
        icon: require('../../assets/icon/leave_approve.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'Rejected',
        noti: 0,
        icon: require('../../assets/icon/leave_reject.png'),
        page: 'LeaveRequest'
    },
    {
        title: 'Pending Approval',
        noti: 9,
        icon: require('../../assets/icon/leave_pending.png'),
        page: 'LeaveRequest'
    },
]
export class cards extends Component {
      constructor(props){
          super(props)

      } 
  render(){
    return (
        <View style={styles.row}>
            {
                cardList.map((card, key) => (
                   <TouchableOpacity style={{
                    width: '48%',
                    backgroundColor: color.light,
                    marginBottom: offset.o1,
                    borderRadius: offset.o1,
                    borderColor: color.placeHolder,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    //paddingLeft: offset.o1 + offset.oh,
                    height: height / 6,
                }} key={key} onPress = {() => {this.props.navigation.navigate(card.page)}}>
                    <View style={{
                        width: '100%',
                        backgroundColor: color.light,
                        borderRadius: offset.o1,
                        paddingLeft: offset.o1 + offset.oh,
                        justifyContent: 'center',
                        height: '100%',
                    }} key={key}>
                        {card.title === 'Balance' ?  <Image source={card.icon} style={{
                            width: 40,
                            height: 40,
                            marginBottom: offset.oh
                        }} /> :  <Image source={card.icon} style={{
                            width: 35,
                            height: 40,
                            marginBottom: offset.oh
                        }} />}
                       
                        
                        <Text style={{fontSize: 15, fontFamily: 'Nunito-Bold'}}>{card.title}</Text>
                    </View>
                    </TouchableOpacity>
                    
                ))
            }
        </View>
    )
}
}


export default cards