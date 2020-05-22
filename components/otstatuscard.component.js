import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Text, Row, Col } from 'native-base'
import colors from '../constant/color'

// registered leave type color
const leavesColor = {
    "Casual Leave": '#47E9EE',
    "Medical Leave": '#377375',
    "Annual Leave": '#FFB300'
}

// registered status type color
const statusColor = {
    "Approved": colors.primary,
    "Rejected": '#FF0000',
    "Cancellation": '#656565',
    "Pending": colors.warning,
    "Draft": '#33ccaa',
    "Approved1": colors.indicator,
    "Approved2": colors.secondary,
    "Refused": colors.placeHolder,
    "refuse": colors.placeHolder,
}

export default function StatusCard({ hour, date_from, date_to, description, status }) {
    return (
        <View style={styles.container}>
            <View style={styles.mainRow}>
                {/* <View style={styles.status}>
                    <Text style={{ ...styles.statusCircle, backgroundColor: statusColor[status] }}></Text>
                </View> */}
                <View style={styles.content}>
                    <View style={styles.left}>
                        <Text style={styles.date}>From - {date_from}</Text>
                        <Text style={styles.date}>To      - {date_to}</Text>
                        <Text>{hour} hr</Text>
                        <Text style = {{marginTop: 10, color: '#656565'}}>Reason : {description}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.statusTxt, {
                            color: colors.primary
                           // color: statusColor[status]
                        }]}>{status}</Text>
                    </View>
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
        marginBottom: 10,
        borderWidth: 0.3,
        borderColor: colors.placeHolder
    },
    mainRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    status: {
        width: '10%'
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        width: '70%'
    },
    right: {
        width: '30%'
    },
    statusTxt: {
        textAlign: 'right',
        fontFamily: 'Nunito-Bold',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    date: {
        fontFamily: 'Nunito',
        fontSize: 16,
        color: '#656565',
        marginBottom: 10
    }
})

StatusCard.propTypes = {
    leaveType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}