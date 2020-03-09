import StyleSheet from 'react-native'
import offset from './offset.constant'

export default StyleSheet.create({
    headline: {
        fontFamily: 'Nunito_bold',
        fontSize: offset.o3h
    },
    title: {
        fontFamily: 'Nunito',
        fontSize: offset.o3
    },
    subHeader: {
        fontFamily: 'Nunito_bold',
        fontSize: offset.o2
    },
    pXl: {
        fontFamily: 'Nunito_bold',
        fontSize: offset.o1h + 1
    },
    p: {
        fontFamily: 'Nunito',
        fontSize: offset.o1h - 1
    }
})