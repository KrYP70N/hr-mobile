import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Left, Right, Icon, Container, Content, Header } from 'native-base'

import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './leave.style'

// components
import MonthPicker from '../../components/monthpicker.component'
import StatusCard from '../../components/statuscard.component'

export class EmployeeLeaveRejected extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            filter: true
        }
    }

    render() {
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
                        }}>Rejected</Text>
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

                    <StatusCard 
                        leaveType="Casual Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Rejected"
                    />
                    <StatusCard 
                        leaveType="Medical Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Rejected"
                    />
                    <StatusCard 
                        leaveType="Annual Leave"
                        date="07 Nov 2019 to 09 Nov 2019"
                        status="Rejected"
                    />
                </Content>
           </Container>
        )
    }
}

export default EmployeeLeaveRejected
