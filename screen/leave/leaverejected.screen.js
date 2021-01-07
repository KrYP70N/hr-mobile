import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Left, Right, Icon, Container, Content, Header } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './leave.style'
import ErrorMessage from '../../constant/messagetext'
// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/statuscard.component'
import moment from 'moment'
import APIs from '../../controllers/api.controller'

export class EmployeeLeaveRejected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            leaveRejectedList: [],
            filter: true,
            year: moment().format('YYYY'),
            month: moment().format('MM')
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
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
                            this.getLeaveRejectedList(auth, id, url, this.state.year, this.state.month);

                        })
                })
        })
    }

    getLeaveRejectedList(auth, id, url, year, month) {
        APIs.getLeaveRejectedList(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        this.setState({
                            leaveRejectedList: res.data
                        })
                    }
                } else {
                    //ErrorMessage('serverError', this.props.navigation)
                    this.setState({
                        leaveRejectedList: []
                    })
                }
            })
    }

    // filter next ctrl
    ctrlNext = ({ year, month }) => {
        this.setState({ month, year })
        this.getLeaveRejectedList(this.state.auth, this.state.id, this.state.url, year, month)

    }

    // filter prev ctrl
    ctrlPrev = ({ year, month }) => {
        this.setState({ month, year })
        this.getLeaveRejectedList(this.state.auth, this.state.id, this.state.url, year, month)

    }

    render() {
        let statusData = this.state.leaveRejectedList.map((reject, index) => {
            return (
                <StatusCard
                    key={index}
                    leaveType={reject.Leave_Type}
                    date={`${reject.date_from} to ${reject.date_to}`}
                    status={reject.state}
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
                            marginRight: offset.o2,
                            marginLeft: offset.o1
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            fontSize: 16,
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Rejected</Text>
                    </Left>
                    <Right>
                        <Icon
                            style={{ color: color.tertiary }}
                            name="ios-options"
                            onPress={() => {
                                this.setState({
                                    filter: !this.state.filter
                                })
                            }}
                        />
                    </Right>
                </Header>
                <View style={styles.pdContainer}>
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
                        display: this.state.leaveRejectedList.length === 0 ? 'flex' : 'none',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-information-circle-outline' style={{
                            color: color.placeHolder,
                            fontSize: 40
                        }} />
                        <Text style={{
                            color: color.placeHolder
                        }}>There is no leave rejected data!</Text>
                    </View>
                </View>
            </Container >
        )
    }
}

export default EmployeeLeaveRejected
