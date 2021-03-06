import React, { Component } from 'react'
import { Text, View, Dimensions, AsyncStorage } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import color from '../../constant/color'
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
const width = Dimensions.get('screen').width;

const lb_color = [
    {
        title: 'APPROVED',
        color: '#92DD4D'
    },
    {
        title: 'PENDING',
        color: '#FFB300'
    },
    {
        title: 'REJECTED',
        color: '#FF0000'
    },
]

const colors = ['#35A9AC', '#FFB300', '#92DD4D',]
export class chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: null,
            summaryData: null,
            labelData: [],
        }
    }

    componentDidMount() {
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
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getSummaryData(auth, id, url, currentYear);

                        })
                })
        })
    }

    componentDidUpdate() {
        if (
            this.state.url !== null &&
            this.state.auth !== null &&
            this.state.id !== null &&
            this.state.summaryData === null
        ) {
            let date = new Date();
            let year = date.getFullYear();
            //let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
            this.getSummaryData(this.state.auth, this.state.id, this.state.url, year)
        }
    }

    getSummaryData(auth, id, url, year) {
        APIs.getOTSummary(url, auth, id, year)
            .then((res) => {
                if (res.status === 'success') {
                    if(res.error){
                        ErrorMessage('token', this.props.navigation)
                    }else{
                        let data = []
                        let lData = []
                        for (let i = 0; i < 4; i++) {
                            if (i == 0) {
                                let obj = {
                                    title: lb_color[i].title,
                                    value: res.data.Approved[0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                           
                            if (i == 1) {
                                let obj = {
                                    title: lb_color[i].title,
                                    value: res.data.Pending[0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                            if (i == 2) {
                                let obj = {
                                    title: lb_color[i].title,
                                    value: res.data.Rejected[0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                        }
                        lData.push({
                            title: "TOTAL",
                            value: res.data.Total[0][0],
                            color: '#FFFFFF'
                        })
                        this.setState({
                            summaryData: data,
                            labelData: lData
                        })
                    }
                   
                } else {
                   this.setState({
                       summaryData: [],
                       labelData: []
                   })
                }
            })
    }

    render() {
        if (this.state.summaryData === null) {
            return (
                <View style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                    <Text style={{ fontSize: 24, color: '#fff' }}>. . .</Text>
                </View>
            )
        }
        let pieData = this.state.summaryData
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
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: offset.o1,
                backgroundColor: color.primary,
                //borderRadius: offset.o1,
            }}>
                <View style={{
                    width: width / 3,
                    height: 160,
                    justifyContent: 'center',
                    backgroundColor: color.primary,
                    marginRight: 10
                }}>
                    <View style={{ width: width / 3, height: width / 3, marginRight: 20 }}>
                        <View style={{ width: width / 3, height: width / 3, position: 'absolute', borderRadius: width / 6, backgroundColor: '#fff', top: 0 }}></View>
                        <PieChart
                            style={{ height: width / 3, }} data={pieData}
                            innerRadius="70%"
                            padAngle={0}
                        />
                       
                    </View>
                </View>
                <View style={{
                    width: (2 * width) / 3,
                    marginTop: 5,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                       
                        
                    }}>
                        {this.state.labelData.map((lb, index) => {
                            return(
                                <View key = {index} style={{ flexDirection: 'row', alignItems: 'center', width: (2*width)/6, padding: 5 }}>
                                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: lb.color }}></View>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ fontSize: 12, color: color.light, fontFamily: 'Nunito-Bold' }}>{lb.value}</Text>
                                    <Text style={{ marginTop: 2, fontSize: 12, color: color.light, fontFamily: 'Nunito' }}>{lb.title}</Text>
                                </View>
                            </View>
                            )
                        })}
                    </View>
                </View>

            </View>
        )
    }
}

export default chart
