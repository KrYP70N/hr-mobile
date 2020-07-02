import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { View, Container, Content, Text, Card, CardItem, Icon, Right, Body, List, ListItem, Left, Button, Toast, Header } from 'native-base'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'

import color from '../../constant/color'
import { StatusBar, Platform, Linking, SafeAreaView, Image} from 'react-native'
import offset from '../../constant/offset'

import * as WebBrowser from 'expo-web-browser';

export default class PayrollDetail extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            url: this.props.route.params.url,
            auth: this.props.route.params.auth,
            data: null,
            receive: null
        }

        this.slipReceived = () => {
            APIs.sendReceived(this.state.url, this.state.auth, this.props.route.params.slipid)
            .then((res) => {
                if(res.status === 'success') {
                    APIs.getPaySlip(this.props.route.params.slipid, this.state.auth, this.state.url)
                    .then((res) => {
                        if (res.status === 'success') {
                            this.setState({
                                data: res.data,
                                receive: res.data[0]['state']
                            })
                             
                            Toast.show({
                                text: 'Submit success!',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.primary
                                }
                            })
                        } else {
                            Toast.show({
                                text: 'Invalid request, Please try again in later!',
                                textStyle: {
                                    textAlign: 'center'
                                },
                                style: {
                                    backgroundColor: color.primary
                                }
                            })
                        }

                    })  

                }
            })
        }

        this.downloadPaySlip = () => {
            APIs.downloadPaySlip(this.state.url, this.state.auth, this.props.route.params.slipid)
            .then((res) => {
                if(res.status === 'success') {
                    Linking.openURL(res.data.data['Payslip PDF'][0])
                } else {
                    Toast.show({
                        text: 'Connection time out. Please check your internet connection!',
                        textStyle: {
                          textAlign: 'center'
                        },
                        style: {
                          backgroundColor: color.primary
                        },
                        duration: 6000
                    })
                }
            })
        }
    }

    componentDidMount () {
        
        this.props.navigation.addListener('focus', () => {
            this.setState({
                data: null
            })
            APIs.getPaySlip(this.props.route.params.slipid, this.state.auth, this.state.url)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        data: res.data,
                        receive: res.data[0]['state']
                    })
                } else {
                    Toast.show({
                        text: 'Authentication Failed!',
                        textStyle: {
                            textAlign: 'center'
                        },
                        style: {
                            backgroundColor: color.primary
                        }
                    })
                }

            })    
        })

    }

    

    render() {
        if (this.state.data === null) {
            return (
                <Loading />
            )
        }

        let silpdata = this.state.data.map((info) => {
            return (
                <ListItem style={styPayroll.listItem} key={info.payslip_line_name}>
                    <Text style={styPayroll.listLft}>{info['payslip_line_name']}</Text>
                    <Text style={styPayroll.listRht}>{info.payslip_line_total}</Text>
                </ListItem>
            )
        })

        return (
            <SafeAreaView style = {{
                flex: 1,
                //marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
            }}>
            <Container style = {{backgroundColor: color.lighter}}>
            <Header style={{
                        backgroundColor: color.light,
                        marginTop: Platform.OS === 'ios' ? -40 : 0
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
                            }} onPress={() => { this.props.navigation.navigate('Payroll') }} />
                            <Text style={{
                                color: color.secondary
                            }}>Payroll</Text>
                        </Left>
                        <Right></Right>
                    </Header>

                <Content>
                    
                    {/* banner */}
                    <View style={styPayroll.detailBanner}>
                        <Text style={styPayroll.detailSalary}>{this.state.data[this.state.data.length - 1].payslip_line_total} MMK</Text>
                        <Text style={styPayroll.bannerTxt}>Net Salary</Text>
                        <Text style={styPayroll.bannerTxtS}>From {this.state.data[0].date_from} to {this.state.data[0].date_to}</Text>
                    </View>

                    <View style={styPayroll.itemBox}>
                        <Card style={{
                            borderRadius: 5,
                            overflow: 'hidden'
                        }}>
                            <List>
                                {silpdata}
                            </List>
                        </Card>

                    </View>


                </Content>
                <View style={styPayroll.floatingButton}>
                    <Button style={[styPayroll.downloadButton]}
                        onPress={
                            this.downloadPaySlip
                        }
                    >
                        <Image source={require('../../assets/icon/download.png')} style={{width: 25, height: 25}}/>
                        <Text>Download</Text>
                    </Button>
                    <Button style={[styPayroll.stickyButton, {
                        borderLeftWidth: 1,
                        borderColor: '#fff',
                        display: this.state.receive === 'receive' ?  'none' : 'flex'
                    }]} 
                    onPress={this.slipReceived}
                    >
                        <Text>Receive</Text>
                    </Button>
                </View>
            </Container>
            </SafeAreaView>
        )
    }
}