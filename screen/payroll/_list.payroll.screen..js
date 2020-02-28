import React, { Component } from 'react'
import po from './po'
import styPayroll from './payroll.style'
import { Text, Button, View, CardItem, Body, Card, Icon } from 'native-base'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

export default class PayrollList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        if (this.props.data.length > 0) {
            let slips = this.props.data.map((slip) => {
                return (
                    <Card key={slip.payslip_id}>
                        <CardItem>
                            <Body>
                                <View style={styPayroll.titleHolder}>
                                    <Text style={styPayroll.cardTitle}>{slip.slip_number}</Text>
                                    <Icon name="ios-arrow-round-forward" style={styPayroll.cardRthLabel} onPress={() => {
                                        this.props.navigation.navigate('PayrollDetail', {slipid: slip.payslip_id, auth: this.props.apidata.auth, url: this.props.apidata.url})
                                    }} />
                                </View>
                                <Text style={styPayroll.month}>{slip.date_to}</Text>
                                <View style={styPayroll.titleHolder}>
                                    <Text style={styPayroll.salary}>Net Salary - {Math.floor(slip.amount)} MMK</Text>
                                    <Button style={styPayroll.cardButton}>
                                        <Icon name="md-arrow-down" />
                                        <Text>PDF</Text>
                                    </Button>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                )
            })
            return (
                <View style={styPayroll.list}>
                    {slips}
                </View>
            )
        } else {
            return (
                <View style={styPayroll.noData}>
                    <Icon name='ios-information-circle-outline' style={styPayroll.nodataIcon}/>
                    <Text style={styPayroll.nodataText}>No data avaliable for {this.props.year}!</Text>
                </View>
            )
        }

    }
}