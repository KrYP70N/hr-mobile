import React, { Component } from 'react'
import po from './po'
import styPayroll from './payroll.style'
import { Text, Button, View, CardItem, Body, Card, Icon } from 'native-base'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import * as WebBrowser from 'expo-web-browser';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'

export default class PayrollList extends Component {
    constructor(props) {
        super(props)

        this.download = (url, auth, slipid) => {
            console.log(url, auth, slipid)
            APIs.downloadPaySlip(url, auth, slipid)
            .then((res) => {
                // console.log(res.data.data['Payslip PDF'][0])
                WebBrowser.openBrowserAsync(res.data.data['Payslip PDF'][0])
                // Linking.openURL(res.data.data['Payslip PDF'][0])
            })
        }
    }
    render() {
        console.log(this.props.data)
        if (this.props.data.length > 0) {
            let slips = this.props.data.map((slip) => {
                return (
                    <TouchableOpacity key={slip.payslip_id}
                        onPress={() => {
                            this.props.navigation.navigate('PayrollDetail', {slipid: slip.payslip_id, auth: this.props.apidata.auth, url: this.props.apidata.url})
                        }}
                    >
                        <Card>
                            <CardItem>
                                <Body>
                                    <View style={styPayroll.titleHolder}>
                                        <Text style={styPayroll.cardTitle}>{slip.slip_number}</Text>
                                        <Icon name="ios-arrow-round-forward" style={styPayroll.cardRthLabel} />
                                    </View>
                                    <Text style={styPayroll.month}>{slip.date_to}</Text>
                                    <View style={styPayroll.titleHolder}>
                                        <Text style={styPayroll.salary}>Net Salary - {Math.floor(slip.amount)} MMK</Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
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