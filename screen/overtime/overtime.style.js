import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
import button from '../../constant/button'

export default {
    container: {
        padding: offset.o2,
        color: color.light
    },
    overlay: {
        color: color.lighter
    },
    left: {
        paddingRight: offset.o1
    },
    right: {
        paddingLeft: offset.o1
    },
    input: {
        marginBottom: offset.o1
    },
    textarea: {
        marginTop: offset.o5
    },
    picker: {
        marginBottom: offset.o4
    },
    button: {
        ...button.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    buttonPrimary: {
        ...button.primary
    },
    label: {
        ...typo.placeholder
    },
    icon: {
        ...typo.headline,
        color: color.placeHolder
    },
    tabs: {
        backgroundColor: color.primary
    },
    datepicker: {
        borderBottomWidth: 0.5,
        borderColor: color.placeHolder,
        position: 'relative'
    },
    pickerIcn: {
        position: 'absolute',
        right: offset.o1,
        bottom: 0,
        color: color.placeHolder
    },
    cardTitleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: offset.o1
    },
    cardTitle: {
        ...typo.cardTitle
    },
    cardRthLabel: {
        ...typo.cardRthLabel
    },
    cardXSText: {
        ...typo.textSmall,
        color: color.placeHolder
    },
    cardSText: {
        ...typo.parabraph,
        color: color.placeHolder,
        marginBottom: offset.o1
    },
    cardWarning: {
        ...typo.parabraph,
        color: color.warning,
        marginBottom: offset.o2
    },
    ButtonSecondary: {
        ...button.secondary,
        width: '100%'
    },
    resultBox: {
        padding: offset.o2,
        color: color.lighter
    },
    badgeSuccess: {
        backgroundColor: color.primary
    },
    badgeReject: {
        backgroundColor: color.danger
    },
    divideText: {
        ...typo.subHeader,
        textAlign: 'center',
        color: color.placeHolder,
        marginTop: offset.o2,
        marginBottom: offset.o2
    },
    leaveApproveContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    position:{fontSize: 14, marginTop: 3},
    leaveApproveCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity: 0.62,
        padding: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    leaveApproveBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    date:{
        fontSize: 16,
        marginTop: 15,
        color: '#000'
    },
    otHour: {
      fontSize: 16,
      marginTop: 5,
      //color: color.placeHolder,
    },
   
}