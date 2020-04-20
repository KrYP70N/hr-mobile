import { StyleSheet } from "react-native";
import color from "../../constant/color";
import offset from "../../constant/offset";
import typography from "../../constant/typography";

export default StyleSheet.create({
    container: {
        backgroundColor: color.lighter,
        padding: offset.o1 + offset.oh
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    card: {
        width: '48%',
        padding: offset.o1 + offset.oh,
        backgroundColor: color.light,
        marginBottom: offset.o2,
        borderRadius: offset.oh
    },
    noti: {
        fontFamily: 'Nunito-Bold',
        fontSize: 24,
        color: color.primary,
        marginBottom: offset.oh
    },
    notinfo: {
        ...typography.textSmall,
        color: color.primary
    },
    pieRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: offset.o2,
        backgroundColor: color.light,
        marginBottom: offset.o2,
        borderRadius: offset.o1
    },
    pieBox: {
        width: '50%',
        height: 160
    },
    pieInfo: {
        paddingLeft: offset.o2
    },
    pieTxtContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: offset.o1
    },
    pietxt: {
        ...typography.textSmall
    },
    pieicn: {
        fontSize: 14,
        paddingRight: offset.o1
    }
})