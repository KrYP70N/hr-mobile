import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
import button from '../../constant/button'

export default StyleSheet.create({
    kbView: {
        flex: 1
    },
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center'
    },
    logo: {
        marginBottom: offset.o3
    },
    title: {
        ...typo.headline
    },
    sub: {
        ...typo.parabraph,
        marginBottom: offset.o3,
        color: '#333'
    },
    item: {
        marginBottom: offset.o2
    },
    label: {
        ...typo.placeholder
    },
    button: {
        ...button.primary,
        width: '100%',
        marginBottom: offset.o2
    },
    buttonText: {
        marginBottom: 0
    },
    password: {
        marginBottom: offset.o3
    },
    resetPwd: {
        marginBottom: offset.o5
    },
    icn: {
        color: color.placeHolder
    },
    resetTxt: {
        color: color.placeHolder,
        textDecorationLine: "underline",
        textDecorationColor: color.placeHolder,
        textDecorationStyle: 'solid'
    },
    copyright: {
        textAlign: 'center',
        fontSize: typo.s1
    }
})