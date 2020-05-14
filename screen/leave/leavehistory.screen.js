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

export class EmployeeLeaveHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: null,
            month: null,
            leaveHistoryLists: [],
            filter: true
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                year: date.getFullYear(),
                month: `${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}`,
            })

            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date()
                    let currentYear = date.getFullYear()
                    let currentMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
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
                            this.getLeaveHistory(auth, id, url, currentYear, currentMonth);
                        })
                })
        })
    }

    getLeaveHistory(auth, id, url, year, month) {
        APIs.getLeaveHistory(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Leave Data", res.data)
                    this.setState({
                        leaveHistoryLists: res.data
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

    render() {
        console.log("Leave History List", this.state.leaveHistoryLists)
        let statusData =  this.state.leaveHistoryLists.map((history, index) => {
            return(
                <StatusCard
                key = {index}
                leaveType={history.Leave_Type}
                date={`${history.date_from} to ${history.date_to}`}
                status={history.state}
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
                        }}>History</Text>
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
                    />
                    {statusData}
                </Content>
            </Container>
        )
    }
}

export default EmployeeLeaveHistory
