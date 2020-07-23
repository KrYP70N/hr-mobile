import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import color from "../../constant/color";
import offset from "../../constant/offset";
import {
  Picker,
  Textarea,
  Row,
  Col,
  Button,
  Toast,
  Icon,
  Container,
  Content,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import APIs from "../../controllers/api.controller";
import Loading from "../../components/loading.component";
import styLeave from "./leave.style";
import Modal from "react-native-modal";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export class LeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      auth: null,
      id: null,
      leaveType: [],
      attachment: null,
      selectedLeaveType: null,
      morning_leave: false,
      evening_leave: false,
      //dayType: false,
      description: null,
      file: [],
      refresh: false,
      placeHolder: "testing",
      isStartDateVisible: false,
      startDate: "",
      endDate: "",
      isEndDateVisible: false,
      binary: [],
      loading: false,
      loadingTxt: "",
      checked: "full",
      startDateMonthLabel: "",
      startDateDayLabel: "",
      endDateMonthLabel: "",
      endDateDayLabel: "",
      totalDay: 1,
      isModalVisible: false,
      checkMessage: "",
      changeIconStatus: "",
    };
  }

  submit(auth, id, url) {
    console.log("Auth", auth);
    console.log("Id", id);
    console.log("Url", url);
    console.log("Start", this.state.startDate);
    console.log("Selected Leave Type", this.state.leaveType);
    console.log("Morning Leave", this.state.morning_leave);
    console.log("Evening Leave", this.state.evening_leave);
    this.setState({
      loading: true,
      loadingTxt: "requesting your leave ...",
    });
    APIs.requestLeave(
      auth,
      url,
      id,
      this.state.selectedLeaveType,
      this.state.startDate,
      this.state.endDate,
      this.state.morning_leave,
      this.state.evening_leave,
      this.state.description,
      this.state.binary
    )
      .then((res) => {
        console.log("Res Main Data", res);
        if (res.status == "success") {
          if (res.error) {
            Toast.show({
              text: "Please login again. Your token is expired!",
              textStyle: {
                textAlign: "center",
              },
              style: {
                backgroundColor: color.primary,
              },
              duration: 6000,
            });
            this.props.navigation.navigate("Login");
          } else {
            console.log("API Return Data::", res);
            if (res.data.error == false) {
              const d = new Date();
              this.setState({
                refresh: !this.state.refresh,
                startDate: `${d.getFullYear()}-${
                  d.getMonth() + 1 < 10
                    ? "0" + (d.getMonth() + 1)
                    : d.getMonth() + 1
                }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
                endDate: `${d.getFullYear()}-${
                  d.getMonth() + 1 < 10
                    ? "0" + (d.getMonth() + 1)
                    : d.getMonth() + 1
                }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
                //selectedLeaveType: res.data[0]['leave_type_id'],
                file: [],
                binary: [],
                description: "",
                checkMessage: "Leave Request Successful!",
                changeIconStatus: "success",
                isModalVisible: true,
                checked: "full",
                morning_leave: false,
                evening_leave: false,
              });
              this.getRequestData(auth, url);
            } else {
              this.setState({
                checkMessage: res.data.message,
                changeIconStatus: "fail",
                isModalVisible: true,
                checked: "full",
                morning_leave: false,
                evening_leave: false,
              });
            }
          }
        } else {
          console.log("API Return Error Data", res.data);
          this.setState({
            checkMessage: "Leave Request Failed!",
            changeIconStatus: "fail",
            isModalVisible: true,
          });
        }
        this.setState({
          loading: false,
          loadingTxt: "",
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
          loadingTxt: "",
        });
      });
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      let date = new Date();
      this.setState({
        refresh: !this.state.refresh,
        year: date.getFullYear(),
        month:
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
        startDate: `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
        startDate: `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
        startDateMonthLabel: months[date.getMonth()],
        startDateDayLabel:
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        endDateDayLabel:
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        totalDay: 1,
      });

      AsyncStorage.getItem("@hr:endPoint").then((res) => {
        const url = JSON.parse(res).ApiEndPoint;
        this.setState({ url: JSON.parse(res).ApiEndPoint });
        AsyncStorage.getItem("@hr:token").then((res) => {
          const auth = JSON.parse(res).key;
          const id = JSON.parse(res).id;
          this.setState({
            auth: JSON.parse(res).key,
            id: JSON.parse(res).id,
          });
          this.getRequestData(auth, url);
        });
      });
    });
  }

  getRequestData(auth, url) {
    const d = new Date();
    APIs.getLeaveType(auth, url).then((res) => {
      if (res.status === "success") {
        if (res.error) {
          Toast.show({
            text: "Please login again. Your token is expired!",
            textStyle: {
              textAlign: "center",
            },
            style: {
              backgroundColor: color.primary,
            },
            duration: 6000,
          });
          this.props.navigation.navigate("Login");
        } else {
          this.setState({
            leaveType: res.data,
            startDate: `${d.getFullYear()}-${
              d.getMonth() + 1 < 10
                ? "0" + (d.getMonth() + 1)
                : d.getMonth() + 1
            }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
            startDateMonthLabel: months[d.getMonth()],
            startDateDayLabel:
              d.getDate() < 10 ? "0" + d.getDate() : d.getDate(),
            endDate: `${d.getFullYear()}-${
              d.getMonth() + 1 < 10
                ? "0" + (d.getMonth() + 1)
                : d.getMonth() + 1
            }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`,
            endDateMonthLabel: months[d.getMonth()],
            endDateDayLabel: d.getDate() < 10 ? "0" + d.getDate() : d.getDate(),
            selectedLeaveType: res.data[0]["leave_type_id"],
            //description: null,
          });
        }
      } else {
        Toast.show({
          text: "Authentication Failed!",
          textStyle: {
            textAlign: "center",
          },
          style: {
            backgroundColor: color.primary,
          },
          duration: 3000,
        });
        this.setState({
          leaveType: [],
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.state.leaveType.length > 0 && this.state.attachment === null) {
      this.setState({
        attachment: this.state.leaveType[0].image,
      });
    }
  }

  showDatePicker = () => {
    this.setState({ isStartDateVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isStartDateVisible: false });
  };

  pickDate = (data) => {
    let date = new Date(data);
    this.setState({
      startDate: `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
      startDateMonthLabel: months[date.getMonth()],
      startDateDayLabel:
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      endDate: `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
      endDateMonthLabel: months[date.getMonth()],
      endDateDayLabel:
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      totalDay: 1,
    });
    this.hideDatePicker();
  };

  showEndDatePicker = () => {
    this.setState({ isEndDateVisible: true });
  };

  hideEndDatePicker = () => {
    this.setState({ isEndDateVisible: false });
  };

  pickEndDate = (data) => {
    let date = new Date(data);
    // difference between Start Date and End Date
    let secondDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    let eDate = new Date(secondDate);
    let sDate = new Date(this.state.startDate);

    if (sDate <= eDate) {
      let diffTime = eDate - sDate;
      let diffDay = diffTime / (1000 * 3600 * 24) + 1;
      //console.log(diffDay);
      this.setState({
        endDate: `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
        endDateMonthLabel: months[date.getMonth()],
        endDateDayLabel:
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        totalDay: diffDay,
      });
    } else {
      this.setState({
        endDate: this.state.endDate,
        endDateMonthLabel: this.state.endDateMonthLabel,
        endDateDayLabel: this.state.endDateDayLabel,
        totalDay: this.state.totalDay,
      });
    }
    this.hideEndDatePicker();
  };

  getIndex(value, leaveTypes) {
    for (var i = 0; i < leaveTypes.length; i++) {
      if (leaveTypes[i]["leave_type_id"] === value) {
        return i;
      }
    }
  }

  changeLeaveType(val, pos) {
    const index = this.getIndex(val, this.state.leaveType);
    const attachNumber = this.state.leaveType[index].image;
    this.setState({
      selectedLeaveType: val,
      attachment: attachNumber,
      file: [],
      binary: [],
    });
  }

  render() {
    if (
      this.state.startDate === null ||
      this.state.endDate === null ||
      this.state.attachment === null ||
      this.state.loading === true
    ) {
      return <Loading info={this.state.loadingTxt} />;
    }

    let AttachButton = () => {
      let attach = [];
      for (let i = 0; i < this.state.attachment; i++) {
        attach.push(i);
      }
      let data = attach.map((a, id) => {
        return (
          <Row style={styLeave.attachRow} key={id}>
            <Col>
              {this.state.file[id] === undefined ? (
                <Text style={styLeave.placeholder}>Attachment</Text>
              ) : (
                <View style={styLeave.file}>
                  <Text style={styLeave.filename}>
                    {this.state.file[id].name}
                  </Text>
                  <Icon
                    name="ios-close-circle-outline"
                    style={styLeave.closeImage}
                    onPress={() => {
                      let getFile = this.state.file;
                      getFile[id] = undefined;
                      let getBinary = this.state.binary;
                      getBinary[id] = undefined;
                      this.setState({
                        file: getFile,
                        binary: getBinary,
                      });
                    }}
                  />
                </View>
              )}
            </Col>
            <Col>
              <Button
                style={styLeave.attachButton}
                onPress={() => {
                  DocumentPicker.getDocumentAsync().then((res) => {
                    if (res.type === "success") {
                      let getFile = this.state.file;

                      getFile[id] = res;

                      this.setState({
                        file: getFile,
                      });
                      FileSystem.readAsStringAsync(res.uri, {
                        encoding: FileSystem.EncodingType.Base64,
                      }).then((res) => {
                        let getBinary = this.state.binary;
                        getBinary[id] = res;
                        this.setState({
                          binary: getBinary,
                        });
                      });
                    }
                  });
                }}
              >
                <Text style={styLeave.buttonText}>Add File</Text>
              </Button>
            </Col>
          </Row>
        );
      });
      return <View>{data}</View>;
    };
    
    return (
      <SafeAreaView style={{ flex: 1 }}>

      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1, backgroundColor: color.light }}
      >
        <ScrollView>
          {/* <Container style={{ flex: 1, backgroundColor: color.light }}> */}
          <View style={{ flex: 1, backgroundColor: color.light }}>
            <View style={styLeave.headerContainer}>
              <Icon
                name="ios-arrow-round-back"
                style={{
                  fontSize: offset.o4,
                  color: color.primary,
                  marginRight: offset.o2,
                  marginLeft: 15,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Leave");
                }}
              />
              <Text
                style={{
                  color: color.secondary,
                  fontFamily: "Nunito",
                }}
              >
                Apply Leave
              </Text>
            </View>

            <View style={styLeave.bgGrayContent}></View>

            <View style={styLeave.leaveTypeContainer}>
              <Picker
                //placeholder="Select Leve Type"
                textStyle={{
                  fontFamily: "Nunito",
                  // color: 'red'
                }}
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={this.state.selectedLeaveType}
                onValueChange={(value, index) => {
                  this.changeLeaveType(value, index);
                }}
              >
                {this.state.leaveType.map((type) => {
                  return (
                    <Picker.Item
                      label={type["name"]}
                      value={type["leave_type_id"]}
                      key={type["leave_type_id"]}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styLeave.container}>
              <View style={styLeave.divider} />

              <View style={styLeave.fromDateContainer}>
                <View>
                  <Text style={styLeave.fromLabel}>From</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.showDatePicker();
                    }}
                  >
                    <DateTimePickerModal
                      isVisible={this.state.isStartDateVisible}
                      mode="date"
                      onConfirm={this.pickDate}
                      onCancel={this.hideDatePicker}
                    />
                    <View style={styLeave.startDateContainer}>
                      <Text style={styLeave.startDateMonthText}>
                        {this.state.startDateMonthLabel}
                      </Text>
                      <Text style={styLeave.startDateDayText}>
                        {this.state.startDateDayLabel}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text style={styLeave.toLabel}>To</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.showEndDatePicker();
                    }}
                  >
                    <DateTimePickerModal
                      isVisible={this.state.isEndDateVisible}
                      mode="date"
                      onConfirm={this.pickEndDate}
                      onCancel={this.hideEndDatePicker}
                    />
                    <View style={styLeave.endDateTextContainer}>
                      <Text style={styLeave.endDateMonthText}>
                        {this.state.endDateMonthLabel}
                      </Text>
                      <Text style={styLeave.endDateDayText}>
                        {this.state.endDateDayLabel}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 20 }}>
                  <Text style={styLeave.totalDayLabel}>Total Day</Text>
                  <View style={styLeave.totalDayTextContainer}>
                    <Text style={styLeave.totalDayText}>
                      {this.state.totalDay}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: "100%", marginTop: 30 }}>
                <View style={styLeave.morningEveningContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        checked: "mhalf",
                        morning_leave: true,
                        evening_leave: false,
                      });
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={styLeave.outerMorningLeaveRadio}>
                        <View
                          style={[
                            styLeave.innerMorningLeaveRadio,
                            {
                              backgroundColor:
                                this.state.checked === "mhalf"
                                  ? color.primary
                                  : color.light,
                            },
                          ]}
                        ></View>
                      </View>
                      <Text style={styLeave.morningLeaveText}>
                        Morning Leave
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        checked: "ehalf",
                        evening_leave: true,
                        morning_leave: false,
                      });
                    }}
                  >
                    <View style={styLeave.eveningLeaveContainer}>
                      <View style={styLeave.outerEveningLeaveRadio}>
                        <View
                          style={[
                            styLeave.innerEveningLeaveRadio,
                            {
                              backgroundColor:
                                this.state.checked === "ehalf"
                                  ? color.primary
                                  : color.light,
                            },
                          ]}
                        ></View>
                      </View>
                      <Text style={styLeave.eveningLeaveText}>
                        Evening Leave
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      checked: "full",
                      morning_leave: false,
                      evening_leave: false,
                    });
                  }}
                >
                  <View style={styLeave.fullDayContainer}>
                    <View style={styLeave.outerFullDayRadio}>
                      <View
                        style={[
                          styLeave.innerFullDayRadio,
                          {
                            backgroundColor:
                              this.state.checked === "full"
                                ? color.primary
                                : color.light,
                          },
                        ]}
                      ></View>
                    </View>
                    <Text style={styLeave.fullDayText}>Full Day Leave</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 30 }}>
                <Text style={styLeave.leaveReasonText}>Reason For Leave</Text>
                <Textarea
                  placeholderTextColor={color.placeHolder}
                  rowSpan={3}
                  bordered
                  style={{ backgroundColor: color.lighter }}
                  onChangeText={(data) => {
                    this.setState({
                      description: data,
                    });
                  }}
                  value={this.state.description}
                />
              </View>

              <AttachButton />
              <TouchableOpacity
                onPress={() => {
                  this.submit(this.state.auth, this.state.id, this.state.url);
                }}
              >
                <View style={styLeave.submitButton}>
                  <Text style={styLeave.buttonText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isModalVisible}>
              <View style={styLeave.ModelViewContainer}>
                <View style={styLeave.iconView}>
                  {this.state.changeIconStatus === "success" ? (
                    <Image
                      source={require("../../assets/icon/success_icon.png")}
                      style={styLeave.dialogIcon}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/icon/fail_icon.png")}
                      style={styLeave.dialogIcon}
                    />
                  )}
                </View>
                <View style={{ width: "100%", padding: 20 }}>
                  <Text style={({ flex: 1 }, styLeave.lanTitle)}>
                    {this.state.checkMessage}
                  </Text>
                </View>
                <View style={styLeave.ModalTextContainer}>
                  <TouchableOpacity
                    style={styLeave.CancelOpacityContainer}
                    onPress={() => this.setState({ isModalVisible: false })}
                  >
                    <Text style={styLeave.modalTextStyle}>{"Close"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

//const styles = StyleSheet.create({
//   bgGrayContent: {
//     width: "100%",
//     height: 20,
//     backgroundColor: color.lighter,
//   },
//   leaveTypeContainer: {
//     width: "100%",
//     paddingLeft: 10,
//     paddingRight: 10,
//     marginTop: 10,
//   },
//   divider: {
//     width: "100%",
//     height: 1,
//     backgroundColor: color.placeHolder,
//   },
//   fromDateContainer: {
//     flexDirection: "row",
//     width: "100%",
//     marginTop: offset.o3,
//   },
//   fromLabel: {
//     fontSize: 16,
//     color: "#656565",
//     fontFamily: "Nunito",
//   },
//   startDateContainer: {
//     marginTop: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: color.placeHolder,
//     borderRadius: 5,
//     borderWidth: 1,
//     width: 80,
//     height: 80,
//   },
//   startDateMonthText: {
//     color: "#656565",
//     fontSize: 16,
//     fontFamily: "Nunito",
//   },
//   startDateDayText: {
//     marginTop: 5,
//     fontFamily: "Nunito-Bold",
//     fontSize: 18,
//   },
//   toLabel: {
//     fontSize: 16,
//     color: "#656565",
//     fontFamily: "Nunito",
//   },
//   endDateTextContainer: {
//     marginTop: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: color.placeHolder,
//     borderRadius: 5,
//     borderWidth: 1,
//     width: 80,
//     height: 80,
//   },
//   endDateMonthText: {
//     color: "#656565",
//     fontSize: 16,
//     fontFamily: "Nunito",
//   },
//   endDateDayText: {
//     marginTop: 5,
//     fontFamily: "Nunito-Bold",
//     fontSize: 18,
//   },
//   totalDayLabel: {
//     fontSize: 16,
//     color: "#656565",
//     fontFamily: "Nunito",
//   },
//   totalDayTextContainer: {
//     marginTop: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     backgroundColor: color.primary,
//     width: 80,
//     height: 80,
//   },
//   totalDayText: {
//     marginTop: 5,
//     fontFamily: "Nunito-Bold",
//     fontSize: 18,
//     color: "#fff",
//   },
//   morningEveningContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   outerMorningLeaveRadio: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     borderColor: color.dark,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   innerMorningLeaveRadio: {
//     width: 13,
//     height: 13,
//     borderRadius: 13 / 2,
//   },
//   morningLeaveText: {
//     marginLeft: 5,
//     fontSize: 16,
//     color: "#333333",
//     fontFamily: "Nunito",
//   },
//   eveningLeaveContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   outerEveningLeaveRadio: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     borderColor: color.dark,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   innerEveningLeaveRadio: {
//     width: 13,
//     height: 13,
//     borderRadius: 13 / 2,
//   },
//   eveningLeaveText: {
//     marginLeft: 5,
//     fontSize: 16,
//     color: "#333333",
//     fontFamily: "Nunito",
//   },
//   fullDayContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   outerFullDayRadio: {
//     width: 20,
//     height: 20,
//     borderRadius: 20 / 2,
//     borderColor: color.dark,
//     borderWidth: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   innerFullDayRadio: {
//     width: 13,
//     height: 13,
//     borderRadius: 13 / 2,
//   },
//   fullDayText: {
//     marginLeft: 5,
//     fontSize: 16,
//     color: "#333333",
//     fontFamily: "Nunito",
//   },
//   leaveReasonText: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontFamily: "Nunito",
//     color: "#656565",
//   },
//   headerContainer: {
//     height: 60,
//     width: "100%",
//     backgroundColor: color.light,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   ModelViewContainer: {
//     width: width + 15,
//     height: 200,
//     backgroundColor: "#f2f2f2",
//     alignItems: "center",
//     position: "absolute",
//     marginLeft: -30,
//     bottom: Platform.OS === "ios" ? 15 : -20,
//   },
//   lanTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     //marginTop: 15,
//     textAlign: "center",
//     //marginBottom: 5,
//   },
//   lanTitleMM: {
//     fontSize: 14,
//     //marginTop: 15,
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   ModalTextContainer: {
//     width: "100%",
//     flex: 1,
//     position: "absolute",
//     bottom: 0,
//   },
//   CancelOpacityContainer: {
//     width: "100%",
//     height: 50,
//     backgroundColor: color.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalTextStyle: { color: "#fff", textAlign: "center" },
//   iconView: {
//     width: "100%",
//     alignItems: "center",
//   },
//   dialogIcon: {
//     width: 28,
//     height: 28,
//     marginBottom: offset.o1,
//     marginTop: offset.o2,
//   },
//});

export default LeaveRequest;
