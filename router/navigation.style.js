import {StyleSheet} from 'react-native'
import offset from '../constant/offset'

export default StyleSheet.create({
    item: {
        padding: offset.o2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 25,
        height: 25,
        marginRight: offset.o2
    },
    image2: {
        width: 25,
        height: 28,
        marginRight: offset.o2
    },
    image3: {
        width: 28,
        height: 28,
        marginRight: offset.o2
    }
})