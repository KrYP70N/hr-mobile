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
            leaveTypeList: [],
            leaveStatus: [],
            status: 'All'
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
                            APIs.getLeaveType(auth, url)
                            .then((res) => {
                                this.setState({
                                    leaveTypeList: res.data
                                })
                            })
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
                    if(res.error){
                        Toast.show({
                            text: 'Please login again. Your token is expried!',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.primary
                            },
                            duration: 6000
                        })
                        this.props.navigation.navigate('Login')
                    }else{
                        this.setState({
                            leaveHistoryLists: status === 'all' ? res.data : res.data.filter(list => list.state.toLowerCase() === status)
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
                        leaveHistoryLists: []
                    })
                }
            })
    }

    

    // change value
    changeValue = (date, status) => {
        this.setState({
            status: status
        })
        this.getLeaveHistory(this.state.auth, this.state.id, this.state.url, moment(date).format('YYYY'), moment(date).format('MM'), status)
    }

    // componentDidUpdate(){
    //     if(this.state.url !== null && this.state.id !== null && this.state.auth !== null && this.state.leaveHistoryLists === null) {
    //     this.getLeaveHistory(this.state.auth, this.state.id, this.state.url, moment(date).format('YYYY'), moment(date).format('MM'), status)
    //     }
    // }

    render() {
        let statusData =  this.state.leaveHistoryLists.map((history, index) => {
            return(
                <StatusCard
                key={index}
                leaveType={history.Leave_Type}
                date={`${history.date_from} to ${history.date_to}`}
                status={history.state}
                //leaveTypes = {this.state.leaveTypeList}
                auth={this.state.auth}
                url= {this.state.url}
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
                    <View style={{
                        marginTop: 20,
                            display: this.state.leaveHistoryLists.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no leave history for {this.state.status.charAt(0).toUpperCase() + this.state.status.substr(1).toLowerCase()}!</Text>
                        </View>
                </Content>
            </Container>
        )
    }
}

export default EmployeeLeaveHistory
