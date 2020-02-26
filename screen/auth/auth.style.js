import { StyleSheet } from 'react-native'

import offset from '../../constant/offset'
import typo from '../../constant/typography'
import button from '../../constant/button'
import color from '../../constant/color'

export default StyleSheet.create({
    container: {
        padding: offset.o2,
        flex: 1,
        display: 'flex',
        width: '100%'
    },
    content: {
        padding: offset.o2,
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 205
    },
    icon: {
        color: color.placeHolder
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        marginLeft: 0,
        marginBottom: offset.o3
    },
    title: {
        ...typo.headline
    },
    label: {
        marginBottom: offset.o2,
        marginLeft: -(offset.o1 + offset.oh)
    },
    input: {
        marginTop: offset.o1,
        fontSize: offset.o2
    },
    button: {
        ...button.primary,
        width: '100%'
    },
    textButton: {
        width: '100%',
        textAlign: 'center'
    }
})