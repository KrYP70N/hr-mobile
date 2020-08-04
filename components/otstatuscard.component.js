import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Text, } from 'native-base'
import colors from '../constant/color'
import color from '../constant/color'

// registered leave type color
// const leavesColor = {
//     "Casual Leave": '#47E9EE',
//     "Medical Leave": '#377375',
//     "Annual Leave": '#FFB300'
// }

// registered status type color
const statusColor = {
    "approved": colors.primary,
    "rejected": '#FF0000',
    "cancellation": color.placeHolder,
    "cancel": color.placeHolder,
    "pending": colors.warning,
    "draft": '#33dc99',
    "approved1": colors.indicator,
    "approved2": colors.secondary,
    "refused": colors.danger,
    "refuse": colors.danger,
}

export default function StatusCard({ hour, date_from, date_to, description, status }) {
    return (
        <View style={styles.container}>
            <View style={styles.mainRow}>
                <View style={styles.status}>
                    <Text style={{ ...styles.statusCircle, backgroundColor: statusColor[status.toLowerCase()] }}></Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.left}>
                        <Text style={styles.date}>From - {date_from}</Text>
                        <Text style={styles.date}>To      - {date_to}</Text>
                        <Text>{hour} hr</Text>
                        <Text style = {{marginTop: 10, color: '#656565'}}>Reason : {description}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.statusTxt, {
                            color: statusColor[status.toLowerCase()]
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
        width: '90%',
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