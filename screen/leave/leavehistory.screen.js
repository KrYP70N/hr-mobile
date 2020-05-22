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

export class EmployeeLeaveHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            leaveHistoryLists: [],
            filter: true,
            leaveType: [],
            leaveStatus: []
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
                            this.getLeaveHistory(auth, id, url, this.state.year, this.state.month);
                            // APIs.getLeaveType(auth, url)
                            // .then((res) => {
                            //     this.setState({
                            //         leaveType: res.data
                            //     })
                            // })
                            APIs.getLeaveStatus(url, auth)
                            .then((res) => {
                                this.setState({
                                    leaveStatus: res.data
                                })
                            })
                        })
                })
        })
    }

    getLeaveHistory(auth, id, url, year, month, status='all') {
        APIs.getLeaveHistory(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        leaveHistoryLists: status === 'all' ? res.data : res.data.filter(list => list.state.toLowerCase() === status)
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
    // ctrlNext = ({ year, month }) => {
    //     this.setState({ month, year })
        
    // }

    // filter prev ctrl
    // ctrlPrev = ({ year, month }) => {
    //     this.setState({ month, year })
    //     this.getLeaveHistory(this.state.auth, this.state.id, this.state.url, year, month)
    // }

    // change value
    changeValue = (date, status) => {
        this.getLeaveHistory(this.state.auth, this.state.id, this.state.url, moment(date).format('YYYY'), moment(date).format('MM'), status)
    }

    render() {
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
                        optionList={this.state.leaveStatus}
                        onChangeValue={this.changeValue}
                    />
                    {statusData}
                </Content>
            </Container>
        )
    }
}

export default EmployeeLeaveHistory
