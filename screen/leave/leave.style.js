import { StyleSheet, Platform, Dimensions } from 'react-native'
import offset from '../../constant/offset'
import color from '../../constant/color'
import typo from '../../constant/typography'
import button from '../../constant/button'
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
export default StyleSheet.create({
    overlay: {
        color: color.lighter
    },
    container: {
        //paddingLeft: offset.o2,
        //paddingRight: offset.o2,
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
    },
    cardTitle: {
        ...typo.cardTitle,
    },
    cardRthLabel: {
        ...typo.cardRthLabel
    },
    cardXSText: {
        ...typo.textSmall,
        color: '#656565',
        marginTop: 10,
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
        fontFamily: 'Nunito',
        color: color.placeHolder,
        marginTop: offset.o1,
        marginBottom: offset.o2
    },
    cardWarning: {
        ...typo.parabraph,
        color: color.warning,
        fontFamily: 'Nunito',
        marginBottom: offset.o2,
        fontSize: 16
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
        borderWidth: 0.3,
        borderColor: color.cardBorder,
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
        fontFamily: 'Nunito',
        fontSize: 14,
        marginTop: 10,
        color: '#656565'
    },
    leaveText:{
        ...typo.paragraph,
        marginTop: 5,
        color: color.danger
    },
    pickerIcn: {
        position: 'absolute',
        right: offset.o1,
        bottom: 0,
        color: color.placeHolder
    },
    pdContainer: {
        padding: 10,
        backgroundColor: color.lighter,
        position: 'relative'
    },

    //leave Request
    bgGrayContent: {
        width: "100%",
        height: 20,
        backgroundColor: color.lighter,
      },
      leaveTypeContainer: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
      },
      divider: {
        width: "100%",
        height: 1,
        backgroundColor: color.placeHolder,
      },
      fromDateContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: offset.o3,
      },
      fromLabel: {
        fontSize: 16,
        color: "#656565",
        fontFamily: "Nunito",
      },
      startDateContainer: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: color.placeHolder,
        borderRadius: 5,
        borderWidth: 1,
        width: 80,
        height: 80,
      },
      startDateMonthText: {
        color: "#656565",
        fontSize: 16,
        fontFamily: "Nunito",
      },
      startDateDayText: {
        marginTop: 5,
        fontFamily: "Nunito-Bold",
        fontSize: 18,
      },
      toLabel: {
        fontSize: 16,
        color: "#656565",
        fontFamily: "Nunito",
      },
      endDateTextContainer: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: color.placeHolder,
        borderRadius: 5,
        borderWidth: 1,
        width: 80,
        height: 80,
      },
      endDateMonthText: {
        color: "#656565",
        fontSize: 16,
        fontFamily: "Nunito",
      },
      endDateDayText: {
        marginTop: 5,
        fontFamily: "Nunito-Bold",
        fontSize: 18,
      },
      totalDayLabel: {
        fontSize: 16,
        color: "#656565",
        fontFamily: "Nunito",
      },
      totalDayTextContainer: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: color.primary,
        width: 80,
        height: 80,
      },
      totalDayText: {
        marginTop: 5,
        fontFamily: "Nunito-Bold",
        fontSize: 18,
        color: "#fff",
      },
      morningEveningContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      outerMorningLeaveRadio: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderColor: color.dark,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      innerMorningLeaveRadio: {
        width: 13,
        height: 13,
        borderRadius: 13 / 2,
      },
      morningLeaveText: {
        marginLeft: 5,
        fontSize: 16,
        color: "#333333",
        fontFamily: "Nunito",
      },
      eveningLeaveContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
      },
      outerEveningLeaveRadio: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderColor: color.dark,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      innerEveningLeaveRadio: {
        width: 13,
        height: 13,
        borderRadius: 13 / 2,
      },
      eveningLeaveText: {
        marginLeft: 5,
        fontSize: 16,
        color: "#333333",
        fontFamily: "Nunito",
      },
      fullDayContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
      },
      outerFullDayRadio: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderColor: color.dark,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      innerFullDayRadio: {
        width: 13,
        height: 13,
        borderRadius: 13 / 2,
      },
      fullDayText: {
        marginLeft: 5,
        fontSize: 16,
        color: "#333333",
        fontFamily: "Nunito",
      },
      leaveReasonText: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Nunito",
        color: "#656565",
      },
      headerContainer: {
        height: 60,
        width: "100%",
        backgroundColor: color.light,
        alignItems: "center",
        flexDirection: "row",
      },
      ModelViewContainer: {
        width: width + 15,
        height: 200,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        position: "absolute",
        marginLeft: -30,
        bottom: Platform.OS === "ios" ? 15 : -20,
      },
      lanTitle: {
        fontSize: 14,
        fontWeight: "bold",
        //marginTop: 15,
        textAlign: "center",
        //marginBottom: 5,
      },
      lanTitleMM: {
        fontSize: 14,
        //marginTop: 15,
        textAlign: "center",
        marginBottom: 5,
      },
      ModalTextContainer: {
        width: "100%",
        flex: 1,
        position: "absolute",
        bottom: 0,
      },
      CancelOpacityContainer: {
        width: "100%",
        height: 50,
        backgroundColor: color.primary,
        justifyContent: "center",
        alignItems: "center",
      },
      modalTextStyle: { color: "#fff", textAlign: "center" },
      iconView: {
        width: "100%",
        alignItems: "center",
      },
      dialogIcon: {
        width: 28,
        height: 28,
        marginBottom: offset.o1,
        marginTop: offset.o2,
      },
})