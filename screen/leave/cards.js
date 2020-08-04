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
        page: 'EmployeeLeaveHistory'
    },
    {
        title: 'Balance',
        noti: 4,
        icon: require('../../assets/icon/dashboard-pending.png'),
        page: 'EmployeeLeaveBalance'
    },
    {
        title: 'Approved',
        noti: 0,
        icon: require('../../assets/icon/leave_approve.png'),
        page: 'EmployeeLeaveApproved'
    },
    {
        title: 'Rejected',
        noti: 0,
        icon: require('../../assets/icon/leave_reject.png'),
        page: 'EmployeeLeaveRejected'
    },
    {
        title: 'Pending Approval',
        noti: 9,
        icon: require('../../assets/icon/leave_pending.png'),
        page: 'EmployeeLeavePending'
    },
]
export class cards extends Component {
      constructor(props){
          super(props)

      } 
  render(){
    return (
        <View style={{display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        flexWrap: 'wrap'}}>
            {
                cardList.map((card, key) => (
                   <TouchableOpacity 
                   

                   style={{
                    width: '48%',
                    padding: offset.o1 + offset.oh,
                    backgroundColor: color.light,
                    marginTop: offset.o2,
                    borderRadius: offset.oh,
                    borderColor: color.placeHolder,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    height: height / 6,
                }} key={key} 
                onPress = {() => {this.props.navigation.navigate(card.page)}}>
                    <View style={{
                        width: '100%',
                         paddingLeft: offset.o1,
                         justifyContent: 'center',
                        // height: height/6,
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
                        <Text style={{fontSize: 14, fontFamily: 'Nunito'}}>{card.title}</Text>
                    </View>
                    </TouchableOpacity>  
                ))
            }
        </View>
    )
}
}


export default cards