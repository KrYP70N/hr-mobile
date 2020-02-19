import React, { Component } from 'react'

import po from './po'
import styPayroll from './payroll.style'
import { View, Container, Content, Text, Card, CardItem, Icon, Right, Body, List, ListItem, Left, Button } from 'native-base'

export default class PayrollDetail extends Component {
    render () {
        return (
            <Container>
                <Content>
                    
                    {/* banner */}
                    <View style={styPayroll.detailBanner}>
                        <Text style={styPayroll.detailSalary}>780,000 MMK</Text>
                        <Text style={styPayroll.bannerTxt}>Net Salary</Text>
                        <Text style={styPayroll.bannerTxtS}>From 01 Oct 2013 to 31 Oct 2020</Text>
                    </View>

                    <View style={styPayroll.form}>
                        <Card>
                            <List>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Pay Date</Text>
                                    <Text style={styPayroll.listRht}>31 Oct 2020</Text>
                                </ListItem>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Total Hours</Text>
                                    <Text style={styPayroll.listRht}>160:00 hrs</Text>
                                </ListItem>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Basic Salary</Text>
                                    <Text style={styPayroll.listRht}>800,000 MMK</Text>
                                </ListItem>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Travel Allowance</Text>
                                    <Text style={styPayroll.listRht}>20,000 MMK</Text>
                                </ListItem>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Other Allowance</Text>
                                    <Text style={styPayroll.listRht}>0 MMK</Text>
                                </ListItem>
                            </List>
                        </Card>
                        
                        <Text style={styPayroll.divText}>Deduction </Text>
                        <Card>
                            <List>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Other Deduction</Text>
                                    <Text style={styPayroll.listRht}>0 MMK</Text>
                                </ListItem>
                                <ListItem style={styPayroll.listItem}>
                                    <Text style={styPayroll.listLft}>Income Tax</Text>
                                    <Text style={styPayroll.listRht}>14,000 MMK</Text>
                                </ListItem>
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