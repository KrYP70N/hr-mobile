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
    "Approved": '#47E9EE',
    "Rejected": '#FF0000',
    "Cancellation": '#F5F5F5',
    "Pending": '#FFB300'
}

export default function StatusCard({leaveType, date, status}) {
    return (
        <View style={styles.container}>
            <View style={styles.mainRow}>
                <View style={styles.status}>
                    <Text style={{...styles.statusCircle, backgroundColor: leavesColor[leaveType]}}></Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.left}>
                        <Text style={styles.date}>{date}</Text>
                        <Text>{leaveType}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.statusTxt, {
                            color: statusColor[status]
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
        marginBottom: 10
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
        fontFamily: 'Nunito',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
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
    status: PropTypes.string.isRequired
}