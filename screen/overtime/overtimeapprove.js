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
                            OTApproveList: res.data
                        })
                    }  
                } else {
                    this.setState({
                        OTApproveList: []
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
                hour={`${approved['hour']}:${approved['minute']}`}
                date_from={approved['date_from']}
                date_to={approved['date_to']}
                description = {approved['name']}
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

                    <View style={{
                        marginTop: 20,
                            display: this.state.OTApproveList.length === 0 ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-information-circle-outline' style={{
                                color: color.placeHolder,
                                fontSize: 40
                            }} />
                            <Text style={{
                                color: color.placeHolder
                            }}>There is no overtime approved data!</Text>
                        </View>
                </Content>
            </Container>
        )
    }
}

export default OvertimeApprove
