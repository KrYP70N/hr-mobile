import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
import button from '../../constant/button'

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighter
    },
    form: {
        padding: offset.o1,
        backgroundColor: color.light
    },
    fieldSet: {
        marginBottom: offset.o2
    },
    left: {
        paddingRight: offset.oh
    },
    right: {
        paddingLeft: offset.oh
    },
    buttonLg: {
        ...button.primary,
        marginBottom: offset.o2
    },
    list: {
        padding: offset.o1
    },
    titleHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    cardTitle: {
        ...typo.cardSTitle,
        fontSize: 20,
        marginBottom: offset.o1
    },
    cardRthLabel: {
        ...typo.cardRthLabel,
        fontSize: 30
    },
    month: {
        ...typo.textSmall,
        color: color.tertiary
    },
    salary: {
        ...typo.parabraph,
        color: color.placeHolder,
        marginBottom: offset.o2
    },
    cardButton: {
        ...button.secondary,
        alignSelf: 'flex-end'
    }
})