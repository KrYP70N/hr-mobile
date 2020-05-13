import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions, AsyncStorage } from 'react-native'
import { Content, Container, Toast, Icon, Card, CardItem, Body, Button, } from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import color from '../../constant/color'
import offset from '../../constant/color'
import APIs from '../../controllers/api.controller'
const width = Dimensions.get('screen').width;


const data = [
    {
        title: 'AVAILABLE',
        value: 8,
        color: color.indicator
    },
    {
        title: 'PENDING',
        value: 4,
        color: color.warning
    },
    {
        title: 'APPROVED',
        value: 5,
        color: '#92DD4D'
    },
    {
        title: 'APPLIED',
        value: 6,
        color: '#47E9EE'
    },
    {
        title: 'REJECTED',
        value: 2,
        color: color.danger
    },

]

const labelData = [
    {
        title: 'AVAILABLE',
        value: 8,
        color: color.indicator
    },
    {
        title: 'PENDING',
        value: 4,
        color: color.warning
    },
    {
        title: 'APPROVED',
        value: 5,
        color: '#92DD4D'
    },
    {
        title: 'APPLIED',
        value: 6,
        color: '#47E9EE'
    },
    {
        title: 'REJECTED',
        value: 2,
        color: color.danger
    },
    {
        title: 'TOTAL',
        value: 25,
        color: color.light
    },

]
export class chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: null,
            id: null,
            year: null,
            summaryData: [],
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

    getSummaryData(auth, id, url, year) {
        console.log("Auth", auth)
        console.log("Url", url)
        console.log("ID", id)
        console.log("Year", year)
        APIs.getLeaveSummary(url, auth, id, year)
            .then((res) => {
                if (res.status === 'success') {
                    console.log("Res data", res.data)
                    this.setState({
                        summaryData: res.data
                    })
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

    render() {
        console.log("Summary Data", this.state.summaryData)
        let pieData = data
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
                //justifyContent: 'center',
                padding: offset.o2,
                backgroundColor: color.primary,
                //marginBottom: offset.o2,
                borderRadius: offset.o1,
                //height: '35%'
            }}>
                <View style={{
                    width: width/3,
                    height: 160,
                    justifyContent: 'center',
                    backgroundColor: color.primary,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <View style={{ width: width/3, height: width/3, marginRight: 20}}>
                        <View style={{ width: width/3, height: width/3, position: 'absolute', borderRadius: width / 6, backgroundColor: '#fff', top: 0 }}></View>
                        <PieChart
                            style={{ height: width/3, }} data={pieData}
                            innerRadius="70%"
                            padAngle={0}

                        >
                        </PieChart>
                    </View>
                </View>
                    <View style = {{width: (2*width)/3, 
                    marginTop: 5,
                         //height: '75%'
                         }}>
                    {/* <FlatList
                        data={labelData}
                        numColumns={2}
                        renderItem={({ item }) => {
                           return(
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: (2*width)/6, padding: 5 }}>
                                    <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: item.color }}></View>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ fontSize: 12, color: color.light, fontFamily: 'Nunito-Bold' }}>{item.value}</Text>
                                        <Text style={{ marginTop: 2, fontSize: 12, color: color.light, fontFamily: 'Nunito' }}>{item.title}</Text>
                                    </View>
                                </View>
                          
                           )
                        }

                        }
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                    </View>
              
            </View>
        )
    }
}

export default chart
