import React, { Component } from 'react'
import { Text, View, Image, AsyncStorage } from 'react-native'
import { Left, Right, Icon, Container, Content, Header, Toast } from 'native-base'

import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './leave.style'

// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/statuscard.component'

import APIs from '../../controllers/api.controller'
import moment from 'moment'

export class EmployeeLeaveApproved extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            leaveApproveList: [],
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
                            this.getLeaveApproved(auth, id, url, this.state.year, this.state.month);
                        })
                })
        })
    }

    getLeaveApproved(auth, id, url, year, month) {
        APIs.getLeaveApprovedList(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Leave Approved List::", res.data)
                    this.setState({
                        leaveApproveList: res.data
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
        this.getLeaveApproved(this.state.auth, this.state.id, this.state.url, year, month)

    }

    // filter prev ctrl
    ctrlPrev = ({ year, month }) => {
        this.setState({ month, year })
        this.getLeaveApproved(this.state.auth, this.state.id, this.state.url, year, month)

    }

    render() {
        let statusData = this.state.leaveApproveList.map((approved, index) => {
            return (
                <StatusCard
                    key={index}
                    leaveType={approved.Leave_Type}
                    date={`${approved.date_from} to ${approved.date_to}`}
                    status={approved.state}
                    auth={this.state.auth}
                    url={this.state.url}
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
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
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
                    <View style={{
                        marginTop: 20,
                            display: this.state.leaveApproveList.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no leave approved data!</Text>
                        </View>
                   
                </Content>
            </Container>
        )
    }
}

export default EmployeeLeaveApproved
