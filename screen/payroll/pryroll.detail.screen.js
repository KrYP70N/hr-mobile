import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { View, Container, Content, Text, Card, CardItem, Icon, Right, Body, List, ListItem, Left, Button, Toast, Header } from 'native-base'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'

import color from '../../constant/color'
import { StatusBar, Platform } from 'react-native'
import offset from '../../constant/offset'

export default class PayrollDetail extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            slipid: '',
            url: '',
            auth: '',
            data: []
        }
    }

    componentDidMount () {

        const slipid= this.props.route.params.slipid
        const url= this.props.route.params.url
        const auth= this.props.route.params.auth

        APIs.getPaySlip(slipid, auth, url)
            .then((res) => {
                if (res.status === 'success') {
                    this.setState({
                        data: res.data
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

    render() {

        if (this.state.data !== [] || this.state.data !== null || this.state.data !== "") {
            return (
                <Container>
                    <Content>
                        <Header style={{
                            backgroundColor: color.light,
                            marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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

                        {/* banner */}
                        <View style={styPayroll.detailBanner}>
                            <Text style={styPayroll.detailSalary}>{
                                this.state.data.length > 0 ?
                                this.state.data[this.state.data.length - 1].payslip_line_total : null
                            } MMK</Text>
                            <Text style={styPayroll.bannerTxt}>Net Salary</Text>
                            <Text style={styPayroll.bannerTxtS}>From {
                                this.state.data.length > 0 ?
                                this.state.data[0].date_from :
                                null
                            } to {
                                this.state.data.length > 0 ?
                                this.state.data[0].date_to :
                                null
                            }</Text>
                        </View>

                        <View style={styPayroll.itemBox}>
                            <Card>
                                <List>
                                    {
                                        this.state.data.map((info) => {
                                            // console.log(info)
                                            return (
                                                <ListItem style={styPayroll.listItem} key={info.payslip_line_name}>
                                                    <Text style={styPayroll.listLft}>{info['payslip_line_name']}</Text>
                                                    <Text style={styPayroll.listRht}>{info.payslip_line_total}</Text>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Card>

                        </View>


                    </Content>
                    <Button style={styPayroll.stickyButton}>
                        <Text>Download Payslip</Text>
                    </Button>
                </Container>
            )
        }else{
            return(
            <View><Text>This is null</Text></View>
            )
        }


    }
}