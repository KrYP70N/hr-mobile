

import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon, Header, Left, Right, Toast } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import Loading from '../../components/loading.component'
import Clock from '../../components/time.component'
import CheckInOut from '../../components/checkinout.component'
import APIs from '../../controllers/api.controller'

import offset from '../../constant/offset'
import color from '../../constant/color'
import { AsyncStorage, StatusBar, Platform, BackHandler } from 'react-native'
import { Calendar, CalendarList, Agenda, } from 'react-native-calendars';

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

        AsyncStorage.getItem('@hr:endPoint')
            .then((res) => {
                this.setState({
                    url: JSON.parse(res).ApiEndPoint
                })
                AsyncStorage.getItem('@hr:token')
                    .then((res) => {
                        this.setState({
                            token: JSON.parse(res).key,
                            id: JSON.parse(res).id
                        })
                    })
            })

        this.props.navigation.addListener('focus', () => {
            if (
                this.state.url !== null &&
                this.state.token !== null &&
                this.state.id !== null
            ) {
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                APIs.AttendanceSummary(this.state.url, this.state.token, year, month, this.state.id)
                    .then((res) => {
                        if (res.status === 'success') {
                            this.setState({
                                data: res.data
                            })
                        } else {
                            Toast.show({
                                text: 'Connection time out. Please check your internet connection!',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.primary
                                },
                                duration: 6000
                            })
                        }

                    })
            }
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
            APIs.AttendanceSummary(this.state.url, this.state.token, year, month, this.state.id)
                .then((res) => {
                    if (res.status === 'success') {
                        this.setState({
                            data: res.data
                        })
                    } else {
                        Toast.show({
                            text: 'Connection time out. Please check your internet connection!',
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
        console.log('month changed', date);

        if (
            this.state.url !== null &&
            this.state.token !== null &&
            this.state.id !== null
        ) {
            let year = date.year;
            let month = (date.month) < 10 ? '0' + (date.month) : (date.month)
            APIs.AttendanceSummary(this.state.url, this.state.token, year, month, this.state.id)
                .then((res) => {
                    if (res.status === 'success') {
                        this.setState({
                            data: res.data
                        })
                    } else {
                        Toast.show({
                            text: 'Connection time out. Please check your internet connection!',
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
                    "Color": color.attendance
                })
            }
        }
        if (this.state.data.list_holidays["Holiday List"].length > 0) {
            for (let i = 0; i < this.state.data.list_att["Holiday List"].length; i++) {
                MarkedData.push({
                    "Date": this.state.data.list_att["Holiday List"][i],
                    "Color": color.placeHolder
                })
            }
        }

        if (this.state.data["Absence list"].length > 0) {
            for (let i = 0; i < this.state.data["Absence list"].length; i++) {
                MarkedData.push({
                    "Date": this.state.data["Absence list"][i],
                    "Color": color.danger
                })
            }
        }
        let Arr = [];
        for (let i = 0; i < MarkedData.length; i++) {
            Arr.push(`'${MarkedData[i].Date}' : {marked: true, activeOpacity: ${0}, dotColor: '${MarkedData[i].Color}'}`)
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
            // console.log(val)

            markedDateData[a.slice(1, a.indexOf('\' :'))] = val
        })

        console.log("Final Obj", markedDateData)

        // let markedDateData = {
        //     '2020-04-16': { selected: true, marked: true, selectedColor: 'blue' },
        //     '2020-04-17': { marked: true },
        //     '2020-04-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
        //     '2020-04-19': { disabled: true, disableTouchEvent: true }
        // }
        let infos = this.state.dataTitle.map((title) => {
            let col = color.placeHolder

            if (title === 'Leaves') col = color.danger
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
            <Container style = {{backgroundColor: color.lighter}}>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    <Left style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Attendance</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={{ flex: 1, }}>
                        <View style={[styAttend.container, {
                            marginTop: offset.o1
                        }]}>
                            <Card style={{ borderRadius: 5, backgroundColor: color.light, padding: 10 }}>
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
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                    <View style={{ width: '95%', height: 1, backgroundColor: color.placeHolder }}></View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: color.attendance, borderRadius: 10 / 2 }}></View>
                                    <Text style={{ marginLeft: 5 }}>Attendance</Text>
                                    <View style={{ width: 10, height: 10, marginLeft: 15, backgroundColor: color.danger, borderRadius: 10 / 2 }}></View>
                                    <Text style={{ marginLeft: 5 }}>Absence</Text>
                                    <View style={{ width: 10, height: 10, marginLeft: 15, backgroundColor: color.placeHolder, borderRadius: 10 / 2 }}></View>
                                    <Text style={{ marginLeft: 5 }}>Holiday</Text>

                                </View>
                            </Card>
                        </View>
                        <View style={[styAttend.container, {
                            marginBottom: offset.o3
                        }]}>

                            {infos}

                        </View>
                    </View>
                </Content>

            </Container>
        )
    }
}