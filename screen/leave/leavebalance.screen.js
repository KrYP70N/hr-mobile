import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native'
import { Container, Content, Icon, Toast} from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import color from '../../constant/color'
import ErrorMessage from '../../constant/messagetext'
import styLeave from './leave.style'
import APIs from '../../controllers/api.controller'
import BackHeader from '../../components/BackHeader'

export class EmployeeLeaveBalance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            id: null,
            url: null,
            year: null,
            leaveBalanceData: [],
            
        }
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                year: date.getFullYear(),
            })

            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date()
                    const currentYear = date.getFullYear()
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint, year: currentYear })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getLeaveBalanceData(auth, id, url, currentYear);
                        })
                })
        })
    }

    getLeaveBalanceData(auth, id, url, year){
        APIs.getLeaveBalance(url, auth, id, year)
        .then((res) => {
            if(res.status == "success"){
                if(res.error){
                   ErrorMessage('token', this.props.navigation)
                }else{
                    let data = [];
                    for(let i=0; i<res.data.length; i++){
                        let obj = {
                            title: res.data[i]["leave name"],
                            value: res.data[i]["leave days"],
                            color: res.data[i]["color code"]
                        }
                        data.push(obj)
                    }
                    this.setState({
                        leaveBalanceData: data
                    })
                }
            }
            else{
                //ErrorMessage('serverError', this.props.navigation)
                this.setState({leaveBalanceData: []})
            }
        })
    }

    render() {
        let leaveData = this.state.leaveBalanceData.map((leave, index) => {
            return (
                <View key = {index} style={{ width: '100%', }}>
                    <View style={{ width: '100%', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: leave.color }}></View>
                            <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'Nunito' }}>{leave.title}</Text>
                        </View>
                        <Text style={{ fontSize: 16, fontFamily: 'Nunito-Bold' }}>{leave.value}</Text>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: color.placeHolder }} />
                </View>
            )
        })

        let pieData = this.state.leaveBalanceData
            .filter((d) => d.value > 0)
            .map((d, index) => ({
                value: d.value,
                svg: {
                    fill: d.color,
                    onPress: () => console.log('press', index),

                },
                key: `pie-${index}`,
            }))



        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                <BackHeader name = "Leave Balance" navigation = {this.props.navigation} parent = "Leave" />
                    <View style={{ width: '100%', height: 20, backgroundColor: color.lighter }}></View>
                    <Content style={{ flex: 1 }}>
                        <View style={{ height: 200, width: '100%', justifyContent: 'center' }}>
                            <PieChart
                                style={{ height: 150, }} data={pieData}
                                innerRadius="0.5%"
                                padAngle={0}
                            >
                            </PieChart>
                        </View>

                        <View style={{ padding: 20 }}>
                            {leaveData}
                        </View>
                       
                    </Content>
                    <TouchableOpacity
                    style={{ position: 'absolute', bottom: 0, width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}
                     onPress={() => { 
                        this.props.navigation.navigate('LeaveRequest') 
                        }}>
                            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }} >
                                <Text style={styLeave.buttonText}>Apply Leave</Text>
                            </View>
                        </TouchableOpacity>
                </Container>
            </SafeAreaView>
        )
    }
}

export default EmployeeLeaveBalance
