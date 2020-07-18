

import React, { Component } from 'react'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon, Header, Left, Right, Toast, Button } from 'native-base'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'

import offset from '../../constant/offset'
import color from '../../constant/color'
import { AsyncStorage, StatusBar, Platform, BackHandler, SafeAreaView, TouchableOpacity } from 'react-native'
import { Calendar, CalendarList, Agenda, } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler'
import BottomTab from '../../components/bottomtab.component'

export default class Attendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            token: null,
            id: null,
            data: null,
            dataTitle: null,
            CalendarMarkedData: [],
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
           
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                    let url = JSON.parse(res).ApiEndPoint;
                    this.setState({
                        url: JSON.parse(res).ApiEndPoint,
                        year: year,
                        month: month
                    })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            let token = JSON.parse(res).key
                            let id = JSON.parse(res).id
                            this.setState({
                                token: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getAttendanceSummary(url, token, year, month, id)
                        })
                })
          
        })
    }

    componentDidUpdate() {
        if (
            this.state.url !== null &&
            this.state.token !== null &&
            this.state.id !== null &&
            this.state.data === null
        ) {
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            this.getAttendanceSummary(this.state.url, this.state.token, year, month, this.state.id)
               
        }

        if (this.state.data !== null && this.state.dataTitle === null) {
            let titles = []
            for (const key in this.state.data) {
                if (this.state.data.hasOwnProperty(key)) {
                    if (key === "list_att" || key === "list_holidays" || key === "Absence list") {
                        console.log(key);
                    }
                    else {
                        titles.push(key)
                    }
                }
            }
            this.setState({
                dataTitle: titles,
            })
        }
    }

    monthChange(date) {
        if (
            this.state.url !== null &&
            this.state.token !== null &&
            this.state.id !== null
        ) {
            let year = date.year;
            let month = (date.month) < 10 ? '0' + (date.month) : (date.month)

            this.getAttendanceSummary(this.state.url, this.state.token, year, month, this.state.id)
               
        }
    }

    getAttendanceSummary(url, token, year, month, id){
        APIs.AttendanceSummary(url, token, year, month, id)
        .then((res) => {
            console.log("Res Attendance Data", res)
            if (res.status === 'success') {
                if (res.error) {
                    Toast.show({
                        text: 'Please login again. Your token is expired!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        },
                        duration: 6000
                    })
                    this.props.navigation.navigate('Login')
                } else {
                    this.setState({
                        data: res.data
                    })
                }

            } else {
                Toast.show({
                    text: 'Authentication Failed!',
                    textStyle: {
                        textAlign: 'center'
                    },
                    style: {
                        backgroundColor: color.primary
                    },
                    duration: 6000
                })
               this.setState({
                   data: []
               })
            }

        })
    }

    render() {
        
        if (this.state.data === null || this.state.dataTitle === null) {
            return (
                <Loading />
            )
        }
        let MarkedData = [];
        if (this.state.data.list_att["Attendance List"].length > 0) {
            for (let i = 0; i < this.state.data.list_att["Attendance List"].length; i++) {
                MarkedData.push({
                    "Date": this.state.data.list_att["Attendance List"][i].Date,
                    "Color": '#03b1fc'
                })
            }
        }
        if (this.state.data.list_holidays["Holiday List"].length > 0) {
            for (let i = 0; i < this.state.data.list_holidays["Holiday List"].length; i++) {
                MarkedData.push({
                    "Date": this.state.data.list_holidays["Holiday List"][i]["Date"],
                    "Color": '#09d646'
                })
            }
        }

        if (this.state.data["Absence list"].length > 0) {
            for (let i = 0; i < this.state.data["Absence list"].length; i++) {
                MarkedData.push({
                    "Date": this.state.data["Absence list"][i],
                    "Color": '#FF0000'
                })
            }
        }
        let Arr = [];
        for (let i = 0; i < MarkedData.length; i++) {
            Arr.push(`'${MarkedData[i].Date}' : {marked: true, dotColor: '${MarkedData[i].Color}'}`) //activeOpacity: ${0},
        }

        let markedDateData = {}
        Arr.forEach((a) => {
            let val = JSON.parse(a
                .slice(a.indexOf("{"), a.length)
                .replace(/'/ig, '')
                .replace(/\{/ig, '{"')
                .replace(/\:/ig, '":')
                .replace(/ /ig, '"')
                .replace(/,/ig, '",')
                .replace(/}/ig, '"}'))

            markedDateData[a.slice(1, a.indexOf('\' :'))] = val
        })

        let infos = this.state.dataTitle.map((title) => {
            let col = color.placeHolder

            if (title === 'Leaves' || title === 'Absence') col = color.danger
            if (title === 'Attendance') col = color.primary


            return (
                <Card style={[styAttend.infoCard,
                this.state.data[title][0][0] === null || this.state.data[title][0][0] === 0 ? { display: 'none' } : null
                ]} key={title}>
                    <View style={styAttend.cardLTitle}>
                        <Text style={styAttend.infoCardTitle}>{title}</Text>
                        <Text style={[styAttend.infoCardLabelSuccess, {
                            color: col
                        }]}>{this.state.data[title][0]}</Text>
                    </View>
                </Card>
            )
        })
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: color.lighter, }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Attendance</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ flex: 1, }}>
                                <View style={styAttend.contentContainer}>
                                    <View style={[styAttend.container, {
                                        marginTop: offset.o1
                                    }]}>
                                        <Card style={styAttend.cardCalendar}>
                                            <Calendar
                                                onDayPress={(day) => { console.log('selected day', day) }}
                                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                                monthFormat={"MMMM yyyy"}
                                                onMonthChange={(month) => { this.monthChange(month) }}
                                                hideArrows={false}
                                                hideExtraDays={true}
                                                disableMonthChange={true}
                                                firstDay={1}
                                                hideDayNames={false}
                                                onPressArrowLeft={substractMonth => substractMonth()}
                                                onPressArrowRight={addMonth => addMonth()}
                                                disableArrowLeft={false}
                                                disableArrowRight={false}
                                                markedDates={markedDateData}
                                            />
                                            <View style={styAttend.dividerContainer}>
                                                <View style={styAttend.divider}></View>
                                            </View>

                                            <View style={styAttend.calendarLabelContainer}>
                                                <View style={styAttend.labelCirclePrimary}></View>
                                                <Text style={styAttend.labelText}>Attendance</Text>
                                                <View style={styAttend.labelCircleRed}></View>
                                                <Text style={styAttend.labelText}>Absence</Text>
                                                <View style={styAttend.labelCircleGray}></View>
                                                <Text style={styAttend.labelText}>Holiday</Text>

                                            </View>
                                        </Card>
                                    </View>
                                    <View style={[styAttend.container, {
                                        marginBottom: offset.o3
                                    }]}>

                                        {infos}

                                    </View>

                                </View>

                            </View>
                        </ScrollView>
                        {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('LeaveRequest') }}>
                            <View style={styAttend.submitButton} >
                                <Text style={styAttend.buttonText}>Apply Leave</Text>
                            </View>
                        </TouchableOpacity> */}

                    </View>
                    <BottomTab navigation={this.props.navigation} screen='attendance' />
                </View>
            </SafeAreaView>

        )
    }
}