import { StyleSheet, Platform } from 'react-native'
import offset from '../../constant/offset'
import color from '../../constant/color'
import typo from '../../constant/typography'
import button from '../../constant/button'
export default StyleSheet.create({
    overlay: {
        color: color.lighter
    },
    container: {
        paddingLeft: offset.o2,
        paddingRight: offset.o2,
    },
    left: {
        paddingRight: offset.o1
    },
    right: {
        paddingLeft: offset.o1
    },
    label: {
        ...typo.placeholder,
        fontSize: 16
    },
    picker: {
        marginBottom: offset.o4
    },
    placeholder: {
        ...typo.placeholder
    },
    textarea: {
        marginTop: offset.o3
    },
    formItem: {
        marginTop: offset.o1
    },
    attachRow: {
        marginTop: offset.o3
    },
    attachButton: {
        ...button.primary
    },
    // submitButton: {
    //     ...button.primary,
    //     width: '100%',
    //     marginTop: 20,
    // },
    submitButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        width: '100%',
        marginTop: 30,
        borderRadius: 5
        //position: 'absolute',
        //left: 0,
        //bottom: Platform.OS === 'ios' ? 0 : -30
    },
    buttonText: {
        color: color.light,
        fontFamily: 'Nunito'
    },
    tabStyle: {
        backgroundColor: color.primary
    },
    DatePicker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: color.placeHolder,
        marginTop: offset.o1
    },
    datePlaceholder: {
        paddingLeft: offset.o1 + offset.oh,
        color: color.placeHolder
    },
    cardTitleContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: offset.o1
    },
    cardTitle: {
        ...typo.cardTitle,
    },
    cardRthLabel: {
        ...typo.cardRthLabel
    },
    cardXSText: {
        ...typo.textSmall,
        color: color.placeHolder
    },
    dateFromText: {
        fontSize: 14,
        //fontWeight: 'bold',

    },
    cardReasonLabelText: {
        ...typo.parabraph,
        color: "#656565",
        //marginTop: offset.o1,
        marginBottom: offset.oh
    },
    cardReasonText: {
        ...typo.parabraph,
        color: color.placeHolder,
        marginBottom: offset.o1
    },
    cardSText: {
        ...typo.parabraph,
        color: color.placeHolder,
        marginBottom: offset.o1
    },
    cardWarning: {
        ...typo.parabraph,
        color: color.warning,
        marginBottom: offset.o2
    },
    ButtonSecondary: {
        ...button.secondary,
        width: '100%'
    },
    buttonPrimary: {
        ...button.primary
    },
    resultBox: {
        padding: offset.o2,
        color: color.lighter
    },
    file: {
        width: 100,
        height: 100,
        padding: offset.o1,
        borderWidth: 1,
        borderColor: color.placeHolder,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filename: {
        fontSize: offset.o1,
        textAlign: 'center'
    },
    closeImage: {
        fontSize: offset.o3,
        position: 'absolute',
        top: - (offset.o1 + offset.oh),
        right: - (offset.o1 + offset.oh)
    },
    leaveApproveContainer: {
        flex: 1,
    },
    name: {
        ...typo.paragraph,
        fontFamily: 'Nunito-Bold'
    },
    position:{
        ...typo.textSmall,
        color: color.tertiary
    },
    leaveApproveCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity: 0.62,
        padding: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    leaveApproveBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    date:{
        fontSize: 14,
        marginTop: 10,
        color: '#656565'
    },
    leaveText:{
        ...typo.paragraph,
        marginTop: 5,
    },
    pickerIcn: {
        position: 'absolute',
        right: offset.o1,
        bottom: 0,
        color: color.placeHolder
    },

})