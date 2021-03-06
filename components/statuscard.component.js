import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, } from 'react-native'
import { View, Text, Row, Col } from 'native-base'
import colors from '../constant/color'
import APIs from '../controllers/api.controller'

// registered leave type color
// const leavesColor = {
//     "Casual Leave": '#47E9EE',
//     "Medical Leave": '#377375',
//     "Annual Leave": '#FFB300'
// }

// registered status type color
// const statusColor = {
//     "approved": colors.primary,
//     "rejected": '#FF0000',
//     "cancellation": '#656565',
//     "cancel": '#656565',
//     "pending": colors.warning,
//     "draft": '#33ccaa',
//     "approved1": colors.indicator,
//     "approved2": colors.secondary,
//     "refused": colors.placeHolder,
//     "refuse": colors.placeHolder,
// }

export default function StatusCard({ key, leaveType, date, status, auth, url }) {
    const [leaveTypes, setLeaveTypes] = useState([])
    APIs.getLeaveType(auth, url)
        .then((res) => {
            setLeaveTypes(res.data)
        })


    return (
        <View key={key} style={styles.container}>
            <View style={styles.mainRow}>
                <View style={styles.statusColor}>

                    {
                        leaveTypes.map((leave, index) => {
                            if (leave.name === leaveType) {
                                return (
                                    <Text key={key} style={{ ...styles.statusCircle, backgroundColor: leave["color_code"] }}></Text>
                                )
                            }
                        })

                    }

                </View>
                <View style={styles.content}>
                    <View style={styles.left}>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={{ fontFamily: 'Nunito' }}>{leaveType}</Text>
                    </View>
                    <Text style={styles.status}>{status}</Text>
                    {/* <View style={styles.right}>
                    {
                         leaveTypes.map((leave) =>{
                            if(leave.name === leaveType){
                                return(
                                    <Text style={ {
                                        fontFamily: 'Nunito',
                                        color: colors.tertiary
                                        //color: leave['color_code']
                                    }}>{status}</Text>
                                    // <Text style={{ ...styles.statusCircle, backgroundColor: leave["color_code"] }}></Text>
                                )
                            }
                        })                      
                    }
                    </View> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: colors.semiLigher,
        marginBottom: 10
    },
    mainRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusColor: {
        width: '5%'
    },
    status: {
        fontFamily: 'Nunito',
        color: colors.tertiary
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    content: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    left: {
       marginLeft: 10
    },
    right: {
        //width: '30%'
    },
    statusTxt: {
        textAlign: 'right',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontWeight: 'bold',
        //color: colors.primary
    },
    date: {
        fontFamily: 'Nunito',
        fontSize: 13,
        color: colors.placeHolder,
        marginBottom: 10
    }
})

StatusCard.propTypes = {
    leaveType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    auth: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}