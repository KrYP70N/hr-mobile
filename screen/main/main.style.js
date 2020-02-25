import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    banner: {
        backgroundColor: color.primary,
        padding: offset.o2,
        paddingBottom: offset.o6
    },
    time: {
        ...typo.textSmall,
        width: '100%',
        textAlign: 'center',
        color: color.light,
        marginBottom: offset.o3
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: color.light,
        marginRight: offset.o1
    },
    name: {
        ...typo.subHeader,
        color: color.light
    },
    pos: {
        ...typo.textSmall,
        color: color.light
    },
    profileDetail: {
        ...typo.icnLight,
        width: '100%',
        textAlign: 'right'
    },
    checkinout: {
        marginTop: -offset.o4
    },
    checkCard: {
        height: 120
    },
    cardLft: {
        paddingRight: offset.o1,
        marginBottom: offset.o1
    },
    cardRight: {
        paddingLeft: offset.o1,
        marginBottom: offset.o1
    },
    checkBody: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: offset.o1
    },
    checkTitleTxt: {
        ...typo.subHeader,
        marginLeft: offset.o1
    },
    checkIcn: {
        color: color.primary
    },
    checkInfo: {
        ...typo.textSmall,
        color: color.placeHolder,
        textAlign: 'center'
    },
    disabled: {        
        backgroundColor: color.dark
    },
    disabledMenu: {
        opacity: 0.5
    },
    menuHolder: {
        paddingLeft: offset.o1,
        paddingRight: offset.o1
    },
    menuBody: {
        minHeight: 100,
        display: 'flex',
        alignItems: 'center',
        padding: offset.o1
    },
    icon: {
        ...typo.icnLight,
        marginBottom: offset.o2,
        color: color.primary
    },
    imgIcn: {
        width: 40,
        height: 38,
        marginBottom: offset.o1
    }
})