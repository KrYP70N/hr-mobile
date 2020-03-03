import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { View, Container, Content, Text, Card, CardItem, Icon, Right, Body, List, ListItem, Left, Button, Toast } from 'native-base'
import Loading from '../../components/loading.component'
import APIs from '../../controllers/api.controller'

import color from '../../constant/color'

export default class PayrollDetail extends Component {

    constructor (prop) {
        super(prop)
        this.state = {
            slipid: this.props.route.params.slipid,
            url: this.props.route.params.url,
            auth: this.props.route.params.auth,
            data: null
        }
    }

    componentDidMount () {
        APIs.getPaySlip(this.state.slipid, this.state.auth, this.state.url)
            .then((res) => {
                if(res.status === 'success') {
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

    render () {
        
        if(this.state.data === null) {
            return (
                <Loading />
            )
        }

        console.log(this.state.data)
        
        let silpdata = this.state.data.map((info) => {
            // console.log(info)
            return (
                <ListItem style={styPayroll.listItem} key={info.payslip_line_name}>
                    <Text style={styPayroll.listLft}>{info['payslip_line_name']}</Text>
                    <Text style={styPayroll.listRht}>{info.payslip_line_total}</Text>
                </ListItem>
            )
        })

        return (
            <Container>
                <Content>
                    
                    {/* banner */}
                    <View style={styPayroll.detailBanner}>
                        <Text style={styPayroll.detailSalary}>{this.state.data[this.state.data.length - 1].payslip_line_total} MMK</Text>
                        <Text style={styPayroll.bannerTxt}>Net Salary</Text>
                        <Text style={styPayroll.bannerTxtS}>From {this.state.data[0].date_from} to {this.state.data[0].date_to}</Text>
                    </View>

                    <View style={styPayroll.itemBox}>
                        <Card>
                            <List>
                                {silpdata}
                            </List>
                        </Card>
                        
                    </View>

                    
                </Content>
                <Button style={styPayroll.stickyButton}>
                    <Text>Download Payslip</Text>
                </Button>
            </Container>
        )
    }
}