import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'

export default StyleSheet.create({
    content: {
        backgroundColor: color.lighter,
        padding: offset.o1
    },
    personalInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        marginTop: offset.o3,
        zIndex: 2
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1.5,
        borderColor: color.primary,
        marginBottom: offset.o1,
        backgroundColor: color.primary
    },
    id: {
        ...typo.textSmall,
        color: color.placeHolder,
        marginBottom: offset.o1
    },
    name: {
        ...typo.cardTitle,
        color: color.primary,
        marginBottom: offset.o1
    },
    sectionTitle: {
        ...typo.cardTitle,
        marginTop: offset.o2
    },
    jobTitle: {
        ...typo.textSmall,
        color: color.secondary
    },
    workInfos: {
        marginTop: offset.o2
    },
    infoItem: {
        borderBottomWidth: 1,
        borderBottomColor: color.lighter
    },
    workLabel: {
        ...typo.textSmall,
        color: color.placeHolder
    },
    workInfo: {
        ...typo.parabraph,
        color: color.secondary
    }
})