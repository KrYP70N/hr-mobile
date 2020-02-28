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
        marginBottom: offset.o5,
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
        ...typo.paragraph,
        color: color.placeHolder,
        marginBottom: offset.o2
    },
    cardButton: {
        ...button.secondary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: offset.o1
    },
    detailBanner: {
        padding: offset.o3,
        backgroundColor: color.primary,
        display: 'flex',
        alignItems: 'center'
    },
    detailSalary: {
        ...typo.headline,
        color: color.light
    },
    bannerTxt: {
        ...typo.paragraph,
        color: color.light,
        marginBottom: offset.o2
    },
    bannerTxtS: {
        ...typo.textSmall,
        color: color.light
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between'
    }, 
    listLft: {
        ...typo.paragraph,
        color: color.placeHolder
    },
    listRht: {
        ...typo.paragraph,
        color: color.tertiary
    },
    divText: {
        ...typo.subHeader,
        fontWeight: 'bold',
        marginTop: offset.o2,
        marginBottom: offset.o2,
        color: color.secondary
    },
    stickyButton: {
        ...button.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    noData: {
        padding: offset.o3,
        display: 'flex',
        alignItems: 'center'
    },
    nodataIcon: {
        fontSize: offset.o4,
        color: color.placeHolder,
        marginBottom: offset.o2
    },
    nodataText: {
        color: color.placeHolder
    }
})