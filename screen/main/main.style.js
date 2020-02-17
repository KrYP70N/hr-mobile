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
    }
})