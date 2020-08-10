import color from './color'

let size = {
    s1: 14,
    s2: 16,
    s3: 20,
    s4: 30,
    s5: 40
}

export default {
    paragraph: {
        fontSize: size.s2,
        color: color.secondary,
        fontFamily: 'Nunito'
    },
    cardTitle: {
        fontSize: size.s2,
        fontFamily: 'Nunito-Bold',
        color: color.secondary
    },
    cardSTitle: {
        fontSize: size.s2,
        fontFamily: 'Nunito-Bold',
        color: color.secondary
    },
    cardRthLabel: {
        fontSize: size.s1,
        color: color.placeHolder,
        fontFamily: 'Nunito'
    },
    headline: {
        fontSize: size.s4,
        color: color.primary,
        fontFamily: 'Nunito-Bold'
    },
    subHeader: {
        fontSize: size.s3,
        fontFamily: 'Nunito',
    },
    textSmall: {
        fontSize: size.s1,
        fontFamily: 'Nunito'
    },
    placeholder: {
        fontSize: size.s2,
        color: color.placeHolder,
        fontFamily: 'Nunito'
    },
    dateValueText: {
        fontSize: size.s2,
        fontFamily: 'Nunito'
    },
    icnLight: {
        color: color.light,
        fontSize: size.s5,
        fontFamily: 'Nunito'
    }
}