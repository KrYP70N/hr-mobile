import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    header: {
        backgroundColor: color.light
    },
    headerMenu: {
        color: color.primary
    },
    headerLogo: {
        width: 112,
        height: 26
    },
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
        marginBottom: offset.o2
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
        //marginRight: offset.o1,
        backgroundColor: color.light
    },
    name: {
        ...typo.subHeader,
        color: color.light,   
    },
    pos: {
        ...typo.textSmall,
        color: color.light,
    },
    pos1: {
        ...typo.textSmall,
        color: color.light,
        marginLeft: 10
    },
    profileDetail: {
        ...typo.icnLight,
        width: '100%',
        textAlign: 'right'
    },
    checkinout: {
        flex: 1,
        marginTop: -offset.o4,
        marginLeft: 15,
        marginRight: 15,
    },
    checkCard: {
        height: 120
    },
    cardLft: {
        paddingRight: offset.oh,
        marginBottom: offset.oh
    },
    cardRight: {
        paddingLeft: offset.oh,
        marginBottom: offset.oh
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
        paddingLeft: 15,
        paddingRight: 15
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
        width: 35,
        height: 35,
        marginBottom: offset.o2
    },
    menuTxt: {
        ...typo.textSmall,
    },
    card: {
        minHeight: 150,
        padding: offset.o3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      icon: {
        width: 35,
        height: 35,
        marginBottom: offset.o1
      },
      cardHolder: {
        borderRadius: 5,
        overflow: 'hidden'
      },
})