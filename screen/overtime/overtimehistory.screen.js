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

export class OvertimeHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            OTHistoryLists: [],
            filter: true,
            OTStatus: [],
            status: 'All',
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
                            this.getOTHistory(auth, id, url, this.state.year, this.state.month);
                            APIs.getOTStatus(url, auth)
                                .then((res) => {
                                    this.setState({
                                        OTStatus: res.data
                                    })
                                })
                        })
                })
        })
    }

    getOTHistory(auth, id, url, year, month, status='all') {
        APIs.getOTHistory(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    if(res.error){
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
                    }else{
                        this.setState({
                            OTHistoryLists: status === 'all' ? res.data : res.data.filter(list => list.state.toLowerCase() === status)
                        })
                    }
                } else {
                   this.setState({
                       OTHistoryLists: []
                   })
                }
            })
    }

    // change value
    changeValue = (date, status) => {
        this.setState({
            status: status
        })
        this.getOTHistory(this.state.auth, this.state.id, this.state.url, moment(date).format('YYYY'), moment(date).format('MM'), status)
    }

    render() {
        let statusData = this.state.OTHistoryLists.map((history, index) => {
            return (
                <StatusCard
                    key={index}
                    hour={`${history['hour']}:${history['minute']}`}
                    date_from={history['date_from']}
                    date_to={history['date_to']}
                    description = {history['name']=== null ? '': history['name']}
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
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
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
                        optionList={this.state.OTStatus}
                        onChangeValue={this.changeValue}
                    />
                    {statusData}
                    <View style={{
                            display: this.state.OTHistoryLists.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no overtime history for {this.state.status.charAt(0).toUpperCase() + this.state.status.substr(1).toLowerCase()}!</Text>
                        </View>
                </Content>
            </Container>
        )
    }
}

export default OvertimeHistory
