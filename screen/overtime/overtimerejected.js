import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Left, Right, Icon, Container, Content, Header, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from '../leave/leave.style'
import ErrorMessage from '../../constant/messagetext'
// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/otstatuscard.component'
import moment from 'moment'
import APIs from '../../controllers/api.controller'

export class OvertimeRejected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            OTRejectedList: [],
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
                            this.getOTRejectedList(auth, id, url, this.state.year, this.state.month);

                        })
                })
        })
    }

    getOTRejectedList(auth, id, url, year, month) {
        APIs.getOTRejectedList(url, auth, id, year, month)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        this.setState({
                            OTRejectedList: res.data
                        })
                    }
                } else {
                    //ErrorMessage('serverError', this.props.navigation)
                    this.setState({
                        OTRejectedList: []
                    })
                }
            })
    }

    // filter next ctrl
    ctrlNext = ({ year, month }) => {
        this.setState({ month, year })
        this.getOTRejectedList(this.state.auth, this.state.id, this.state.url, year, month)
    }

    // filter prev ctrl
    ctrlPrev = ({ year, month }) => {
        this.setState({ month, year })
        this.getOTRejectedList(this.state.auth, this.state.id, this.state.url, year, month)

    }

    render() {
        let statusData = this.state.OTRejectedList.map((reject, index) => {
            return (
                <StatusCard
                    key={index}
                    hour={`${reject['hour']}:${reject['minute']}`}
                    date_from={reject['date_from']}
                    date_to={reject['date_to']}
                    description={reject['name']}
                    status={reject.state}
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
                        }} onPress={() => { this.props.navigation.navigate('Overtime') }} />
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
                        display: this.state.OTRejectedList.length === 0 ? 'flex' : 'none',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-information-circle-outline' style={{
                            color: color.placeHolder,
                            fontSize: 40
                        }} />
                        <Text style={{
                            color: color.placeHolder
                        }}>There is no overtime rejected data!</Text>
                    </View>
                </View>
            </Container>
        )
    }
}

export default OvertimeRejected
