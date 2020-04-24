import { StyleSheet, Dimensions } from "react-native";
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
        color: color.placeHolder,
        marginBottom: offset.o1
    },
    notiFoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notiBadge: {
        minWidth: 70,
        borderRadius: offset.oh,
        backgroundColor: color.danger,
        color: color.light,
        padding: offset.oh,
        textAlign: 'center',
        marginLeft: offset.o1,
        textTransform: 'capitalize'
    },
    attachBadge: {
        backgroundColor: color.primary
    },
    banner: {
        backgroundColor: color.primary,
        padding: offset.o1 + offset.oh,
        minHeight: 150,
        justifyContent: 'center'
    },
    bannerTitle: {
        ...typography.headline,
        fontFamily: 'Nunito',
        color: color.light,
        paddingTop: offset.o2,
        paddingBottom: offset.o2,
    },
    detailDate: {
        ...typography.paragraph,
        color: color.placeHolder,
        marginBottom: offset.o2
    },
    detailTitle: {
        ...typography.cardTitle,
        color: color.primary,
        marginBottom: offset.o2
    },
    detailBody: {
        ...typography.paragraph,
        marginBottom: offset.o2
    },
    detailSender: {
        ...typography.paragraph,
        fontFamily: 'Nunito-Bold'
    },
    emptyCard: {
        display: 'flex',
        alignItems: 'center'
    },
    emptyIcn: {
        color: color.placeHolder
    },
    emptyTxt: {
        ...typography.placeholder
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('screen').height - 200
    },
    loadingTxt: {
        ...typography.placeholder
    },
    optionBox: {
        borderBottomWidth: 1,
        borderBottomColor: color.placeHolder,
        marginBottom: offset.o2
    }
})