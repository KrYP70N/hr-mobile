import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage } from 'react-native'
import { Left, Right, Icon, Container, Content, Header, Toast } from 'native-base'

import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from '../leave/leave.style'

// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/otstatuscard.component'

import APIs from '../../controllers/api.controller'
import moment from 'moment'

export class OvertimeApprove extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            OTApproveList: [],
            filter: true
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getOTApprovedList(auth, id, url, this.state.year, this.state.month);
                        })
                })
        })
    }

    getOTApprovedList(auth, id, url, year, month) {
        APIs.getOTApprovedList(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Leave Data", res.data)
                    this.setState({
                        OTApproveList: res.data
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

    // filter next ctrl
    ctrlNext = ({ year, month }) => {
        this.setState({ month, year })
        this.getOTApprovedList(this.state.auth, this.state.id, this.state.url, year, month)

    }

    // filter prev ctrl
    ctrlPrev = ({ year, month }) => {
        this.setState({ month, year })
        this.getOTApprovedList(this.state.auth, this.state.id, this.state.url, year, month)

    }

    render() {
        let statusData = this.state.OTApproveList.map((approved, index) => {
            return (
                <StatusCard
                    key={index}
                    leaveType={approved.Leave_Type}
                    date={`${approved.date_from} to ${approved.date_to}`}
                    status={approved.state}
                />
            )
        })

        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
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
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Approved</Text>
                    </Left>
                    <Right>
                        <Icon
                            name="ios-options"
                            onPress={() => {
                                this.setState({
                                    filter: !this.state.filter
                                })
                            }}
                        />
                    </Right>
                </Header>
                <Content style={styles.pdContainer}>
                    <MonthPicker
                        show={this.state.filter}
                        onClosePress={() => this.setState({
                            filter: !this.state.filter
                        })}
                        onGoNext={this.ctrlNext}
                        onGoPrev={this.ctrlPrev}
                    />
                    {statusData}

                    <StatusCard
                        //key={index}
                        hour={2}
                        date_from={`2020-5-2020 03:01:15`}
                        date_to={`2020-5-2020 05:01:15`}
                        status={`Approved`}
                    />
                    <StatusCard
                        //key={index}
                        hour={3}
                        date={`2020-5-22 03:01:15 to 2020-5-22 06:01:15`}
                        date_from={`2020-5-2020 03:01:15`}
                        date_to={`2020-5-2020 05:01:15`}
                        status={`Approved`}
                    />
                    {/* <StatusCard 
                        leaveType="Casual Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Approved"
                    />
                    <StatusCard 
                        leaveType="Medical Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Approved"
                    />
                    <StatusCard 
                        leaveType="Annual Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Approved"
                    /> */}
                </Content>
            </Container>
        )
    }
}

export default OvertimeApprove
