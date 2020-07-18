import { StyleSheet, Dimensions} from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
import button from '../../constant/button'
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default StyleSheet.create({
    container: {
        padding: offset.o2,
        color: color.light
    },
    overlay: {
        color: color.lighter
    },
    left: {
        paddingRight: offset.o1
    },
    right: {
        paddingLeft: offset.o1
    },
    input: {
        marginBottom: offset.o1
    },
    textarea: {
        marginTop: offset.o5,
        fontFamily: 'Nunito'
    },
    picker: {
        marginBottom: offset.o4
    },
    // button: {
    //     ...button.primary,
    //     width: '100%',
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0
    // },
    button: {
        ...button.primary,
        width: '100%',
        marginTop: 20,
    },
    buttonPrimary: {
        ...button.primary
    },
    label: {
        ...typo.placeholder
    },
    icon: {
        ...typo.headline,
        color: color.placeHolder
    },
    tabs: {
        backgroundColor: color.primary
    },
    datepicker: {
        borderBottomWidth: 0.5,
        borderColor: color.placeHolder,
        position: 'relative'
    },
    pickerIcn: {
        position: 'absolute',
        right: offset.o1,
        bottom: 0,
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
        ...typo.cardTitle
    },
    cardRthLabel: {
        ...typo.cardRthLabel
    },
    cardXSText: {
        fontSize: 15,
        color: color.dark,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardSText: {
        ...typo.parabraph,
        color: color.placeHolder,
        marginBottom: offset.o1,
        marginTop: offset.oh,
    },

    cardReasonLabelText: {
        ...typo.parabraph,
        color: "#656565",
        //marginTop: offset.o1,
        marginBottom: offset.oh
    },
    dateFromText: {
        fontSize: 14,
        //fontWeight: 'bold',

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
    resultBox: {
        padding: offset.o2,
        color: color.lighter
    },
    badgeSuccess: {
        backgroundColor: color.primary
    },
    badgeReject: {
        backgroundColor: color.danger
    },
    divideText: {
        ...typo.subHeader,
        textAlign: 'center',
        color: color.placeHolder,
        marginTop: offset.o2,
        marginBottom: offset.o2
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
        marginTop: 15,
        color: '#656565'
    },
    toDate:{
        fontSize: 14,
        color: '#656565'
    },
    otHour: {
      fontSize: 16,
      marginTop: 5,
    },

    //otRequest
    otHeader: {
        height: 60,
        width: "100%",
        backgroundColor: color.light,
        alignItems: "center",
        flexDirection: "row",
      },
      backArrowIcon: {
        fontSize: offset.o4,
        color: color.primary,
        marginRight: offset.o2,
        marginLeft: 15,
      },
      headerText: {
        color: color.secondary,
        fontFamily: "Nunito",
      },
      grayView: {
        width: "100%",
        height: 20,
        backgroundColor: color.lighter,
      },
      bodyContent: {width: "100%", padding: 15 },
      otDateText: {
        fontFamily: "Nunito",
        color: "#656565",
        fontSize: 16,
      },
      datePickerContainer: {
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderColor: color.placeHolder,
        borderWidth: 0.5,
        borderRadius: 8,
        marginTop: 10,
      },
      dateTextContainer: { flexDirection: "row" },
      dateTextBold: { fontFamily: "Nunito-Bold", fontSize: 18 },
      dateText: {
        marginLeft: 5,
        color: "#656565",
        fontSize: 18,
        fontFamily: "Nunito",
      },
      timeFromContainer: { flexDirection: "row", marginTop: 30 },
      timeFromLabel: {
        fontFamily: "Nunito",
        color: "#656565",
        fontSize: 16,
      },
      timeFromPickContainer: {
        marginTop: 10,
        width: 100,
        height: 60,
        borderWidth: 0.5,
        borderColor: color.placeHolder,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      fromTimeBold: { fontFamily: "Nunito-Bold", fontSize: 16 },
    
      fromTimeText: {
        marginLeft: 5,
        color: "#656565",
        fontSize: 12,
        fontFamily: "Nunito",
      },
      durationContainer: {
        marginTop: 10,
        width: 70,
        height: 60,
        backgroundColor: color.primary,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      durationText: {
        color: color.light,
        fontFamily: "Nunito-Bold",
        fontSize: 16,
      },
      reasonText: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Nunito",
        color: "#656565",
        fontSize: 16,
      },
      otRequestBtnContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.primary,
        width: "100%",
        //marginTop: 30,
        borderRadius: 5,
      },
      submitText: {
        color: color.light,
        fontFamily: "Nunito",
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
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 15,
        textAlign: "center",
        marginBottom: 5,
      },
      lanTitleMM: {
        fontSize: 14,
        marginTop: 15,
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
   
});