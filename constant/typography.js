import color from './color'

let size = {
    s1: 14,
    s2: 16,
    s3: 20,
    s4: 30,
    s5: 40
}

export default {
    parabraph: {
        fontSize: size.s2,
        color: color.secondary
    },
    cardTitle: {
        fontSize: size.s3,
        fontWeight: 'bold',
        color: color.secondary
    },
    cardSTitle: {
        fontSize: size.s2,
        fontWeight: 'bold',
        color: color.secondary
    },
    cardRthLabel: {
        fontSize: size.s1,
        color: color.placeHolder
    },
    headline: {
        fontSize: size.s4,
        color: color.primary
    },
    subHeader: {
        fontSize: size.s3
    },
    textSmall: {
        fontSize: size.s1
    },
    placeholder: {
        fontSize: size.s2,
        color: color.placeHolder
    },
    icnLight: {
        color: color.light,
        fontSize: size.s5
    }
}