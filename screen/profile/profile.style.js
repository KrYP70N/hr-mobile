import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    content: {
        backgroundColor: color.lighter,
        padding: offset.o1,
        paddingTop: 100
    },
    personalInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: -offset.o6,
        borderWidth: 1.5,
        borderColor: color.primary
    }
})