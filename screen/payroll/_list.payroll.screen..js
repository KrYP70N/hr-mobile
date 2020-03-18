import React, { Component } from 'react'
import po from './po'
import styPayroll from './payroll.style'
import { Text, Button, View, CardItem, Body, Card, Icon } from 'native-base'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';

export default class PayrollList extends Component {
    constructor(props) {
        super(props)

        this.download = (url, auth, slipid) => {
            console.log(url, auth, slipid)
            APIs.downloadPaySlip(url, auth, slipid)
            .then((res) => {
                // FileSystem.downloadAsync(
                //         'http://techslides.com/demos/sample-videos/small.mp4',
                //         FileSystem.documentDirectory + 'small.mp4'
                //       )
                //         .then(({ uri }) => {
                //               console.log('Finished downloading to ', uri);
                //     })
                //     .catch(error => {
                //           console.error(error);
                //         })
                let url =  'https://lfhs.lfcisd.net/UserFiles/Servers/Server_904/File/ECCastillo/Color%20Theory%20Worksheet.pdf'
                
                WebBrowser.openBrowserAsync(url)

            })
        }
    }
    render() {
        console.log(this.props.data)
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
                                    <Button 
                                    style={styPayroll.cardButton}
                                    onPress={() => this.download(this.props.apidata.url, this.props.apidata.auth, slip.payslip_id)}
                                    >
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