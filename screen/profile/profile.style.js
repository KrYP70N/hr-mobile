import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
export default StyleSheet.create({
    topContainer: {
        backgroundColor: color.lighter
    },
    header: {
        backgroundColor: color.primary
    },
    personalInfo: {
        marginTop: offset.o5,
        padding: offset.o1
    },
    personalContainer: {
        backgroundColor: color.light,
        display: 'flex',
        alignItems: 'center',
        padding: offset.o2
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: color.primary,
        borderWidth: 2,
        marginTop: - (offset.o5 + offset.o1),
        backgroundColor: color.light
    }
})