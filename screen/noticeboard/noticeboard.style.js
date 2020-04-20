import { StyleSheet } from "react-native";
import color from "../../constant/color";
import offset from "../../constant/offset";
import typography from "../../constant/typography";

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighter,
        padding: offset.o1 + offset.oh
    },
    card: {
        padding: offset.o2,
        backgroundColor: color.light,
        marginBottom: offset.o2,
        borderRadius: offset.oh,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 120
    },
    imgBox: {
        flex: 0.8
    },
    notiImg: {
        width: 20,
        height: 29
    },
    txtBox: {
        flex: 6
    },
    notiTitle: {
        ...typography.textSmall,
        fontFamily: 'Nunito-Bold',
        marginBottom: offset.oh
    },
    notiBody: {
        ...typography.textSmall,
        color: color.placeHolder
    }, 
    notiBadge: {
        width: 70,
        borderRadius: offset.oh,
        backgroundColor: color.danger,
        color: color.light,
        padding: offset.oh,
        textAlign: 'center',
        position: 'absolute',
        right: 0,
        bottom: -offset.o1
    }
})