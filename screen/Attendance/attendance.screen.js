import React, { Component } from 'react'

import po from './po'
import styAttend from './attendance.style'
import { View, Container, Content, Card, CardItem, Body, Text, Row, Col, Item, Icon } from 'native-base'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import Loading from '../../components/loading.component'
import Clock from '../../components/time.component'
import CheckInOut from '../../components/checkinout.component'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'




export default class Attendance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            dataTitle: null
        }
    }

     componentDidMount () {
        APIs.AttendanceSummary(
            this.props.route.params.id,
            this.props.route.params.data.auth,
            this.props.route.params.url
        )
        .then((res) => {
            this.setState({
                data: res.data
            })  
        })
     }

    componentDidUpdate () {
        if(this.state.data !== null && this.state.dataTitle === null)  {
            let titles = []
                for (const key in this.state.data) {
                    if (this.state.data.hasOwnProperty(key)) {
                        titles.push(key)
                    }
                }
                this.setState({
                    dataTitle: titles
                })
        }
    }

    
    render() {

        if(this.state.data === null || this.state.dataTitle === null) {
            return (
                <Loading />
            )
        }


        let infos = this.state.dataTitle.map((title) => {
            console.log()
            return (
                <Card style={[styAttend.infoCard,
                    this.state.data[title][0][0] === null || this.state.data[title][0][0] === 0 ? {display: 'none'} : null
                ]} key={title}> 
                    <View style={styAttend.cardLTitle}>
                        <Text style={styAttend.infoCardTitle}>{title}</Text>
                        <Text style={styAttend.infoCardLabelSuccess}>{this.state.data[title][0]}</Text>
                    </View>
                </Card>
            )
        })

        return (
            <Container>
                <Content>
                    {/* time card */}
                    <View style={[styAttend.container, {
                        marginTop: offset.o1
                    }]}>
                        <Card style={styAttend.timeCard}>
                            <CardItem>
                                <Body style={styAttend.clock}>
                                    {/* <Text style={styAttend.time}>03:55 PM</Text> */}
                                    <Clock
                                    auth={this.props.route.params.data.auth}
                                    url={this.props.route.params.url}
                                    style={styAttend.time}
                                    monthStyle={styAttend.date}
                                    view="split"
                                    />
                                </Body>
                            </CardItem>
                        </Card>

                    </View>
                    {/* check in / out */}
                    <CheckInOut 
                    data={this.props.route.params.data.profile['General Information']}
                    auth={this.props.route.params.data.auth}
                    userid={this.props.route.params.data.id}
                    url={this.props.route.params.url}
                    />

                    <View style={[styAttend.container, {
                        marginBottom: offset.o3
                    }]}>
                        
                        {infos}
                    
                    </View>
                </Content>
            </Container>
        )
    }
}