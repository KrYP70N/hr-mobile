import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
import button from '../../constant/button'

export default {
    requestBox: {
        padding: offset.o2
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
        marginTop: offset.o3
    },
    button: {
        ...button.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    label: {
        ...typo.placeholder
    },
    icon: {
        ...typo.headline,
        color: color.placeHolder
    }
}