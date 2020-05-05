import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15
    },
    timeBanner: {
        backgroundColor: color.primary,
        padding: offset.o4,
        marginBottom: offset.o2
    },
    timeCard: {
        marginBottom: offset.o1
    },
    clock: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120
    },
    date: {
        ...typo.parabraph,
        color: color.light,
        marginBottom: offset.o1
    },
    time: {
        ...typo.headline,
        color: color.light
    },
    checkinTime: {
        paddingRight: offset.o1,
        borderRightWidth: 1,
        borderRightColor: color.placeHolder,
        display: 'flex',
        alignItems: 'flex-end'
    },
    checkoutTime: {
        paddingLeft: offset.o1
    },
    timeLabel: {
        ...typo.textSmall,
        color: color.placeHolder
    },
    timeValue: {
        ...typo.textSmall,
        color: color.primary
    },
    checkCard: {
        height: 100,
        padding: offset.o1
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: offset.o1
    },
    cardLTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardIcon: {
        color: color.primary,
        marginRight: offset.o1
    },
    cardSTitle: {
        ...typo.cardSTitle
    },
    cardinfo: {
        ...typo.textSmall,
        color: color.placeHolder,
        textAlign: 'center'
    },
    left: {
        paddingRight: offset.oh
    },
    right: {
        paddingLeft: offset.oh
    },
    infoCard: {
        padding: offset.o2,
        borderRadius: 5
    },
    infoCardTitle: {
        ...typo.parabraph
    },
    infoCardLabelSuccess: {
        ...typo.textSmall,
        color: color.primary
    },
    infoCardLabelDanger: {
        ...typo.textSmall,
        color: color.danger
    },
    infoCardLabel: {
        ...typo.textSmall,
        color: color.placeHolder
    },
    contentContainer: {
        flex: 1
    },
    cardCalendar: { 
        borderRadius: 5, 
        backgroundColor: color.light, 
        padding: 10 
    },
    dividerContainer: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15 },
    divider: { width: '95%', height: 1, backgroundColor: color.placeHolder },
    calendarLabelContainer: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    labelCirclePrimary: { width: 10, height: 10, backgroundColor: color.attendance, borderRadius: 10 / 2 },
    labelCircleRed: { width: 10, height: 10, backgroundColor: color.danger, borderRadius: 10 / 2, marginLeft: 15 },
    labelCircleGray: { width: 10, height: 10, backgroundColor: color.placeHolder, borderRadius: 10 / 2, marginLeft: 15 },
    labelText: { marginLeft: 5 },
     submitButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    buttonText: {
        color: '#fff',
    }
})