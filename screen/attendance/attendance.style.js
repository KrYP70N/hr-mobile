import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    container: {
        paddingLeft: offset.o1,
        paddingRight: offset.o1
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
        padding: offset.o2
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
    }
})