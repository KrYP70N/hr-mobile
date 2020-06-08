import React, { useState, Component } from 'react'

import { View, Text, Icon } from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import { AsyncStorage } from 'react-native'
import styles from './dashboard.style'
import colors from "../../constant/color";
import APIs from '../../controllers/api.controller'

const lb_color = [
    {
        title: 'Presents',
        //value: 70,
        color: colors.indicator
    },
    {
        title: 'Absents',
        //value: 20,
        color: colors.danger
    },
    // {
    //     title: 'Overtime',
    //     //value: 10,
    //     color: colors.warning
    // },
]
export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            id: null,
            auth: null,
            year: null,
            summaryData: [],
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
        APIs.getDashboardSummary(url, auth, id, year)
            .then((res) => {
                //console.log("Dashboard Data", res.data)
                if (res.status === 'success') {
                    let data = []
                    let lData = []
                    if(res.data["Dashboard Type"] == "HR"){
                        for (let i = 0; i < 2; i++) {
                            if (i == 0) {
                                let obj = {
                                    title: lb_color[i].title,
                                    value: res.data["Attendance Count"][0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                            if (i == 1) {
                                let obj = {
                                    title: lb_color[i].title,
                                   // value: res.data["Today Absent Count"][0][0],
                                   value: res.data["Today Absent Count"][0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                            // if (i == 2) {
                            //     let obj = {
                            //         title: lb_color[i].title,
                            //         value: res.data["OT Count"][0][0],
                            //         color: lb_color[i].color
                            //     }
                            //     data.push(obj)
                            //     lData.push(obj)
                            // }
                            this.setState({
                                summaryData: data,
                                labelData: lData
                            })
                        }
                    }else{
                        for (let i = 0; i < 2; i++) {
                            if (i == 0) {
                                let obj = {
                                    title: lb_color[i].title,
                                    value: res.data["Attendance Count"][0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                            if (i == 1) {
                                let obj = {
                                    title: lb_color[i].title,
                                   // value: res.data["Today Absent Count"][0][0],
                                   value: res.data["Today Absent Count"][0][0],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                            // if (i == 2) {
                            //     let obj = {
                            //         title: lb_color[i].title,
                            //         value: res.data["OT Count"][0][0],
                            //         color: lb_color[i].color
                            //     }
                            //     data.push(obj)
                            //     lData.push(obj)
                            // }
                            this.setState({
                                summaryData: data,
                                labelData: lData
                            })
                        }
                    }
                } 
                else {
                    console.log("Else Condition")
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

        const pieData = this.state.summaryData
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
            <View style={styles.pieRow}>
                <View style={styles.pieBox}>
                    <PieChart
                        style={{ height: 130 }} data={pieData}
                        innerRadius="75%"
                    />
                </View>
                <View style={styles.pieInfo}>
                    {
                        this.state.labelData.map((d, key) => (
                            <View style={styles.pieTxtContainer} key={key}>
                                <Icon name="md-square" style={[styles.pieicn, { color: d.color }]} />
                                <Text style={styles.pietxt}>{d.title} - {d.value}%</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}
