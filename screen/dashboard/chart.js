import React, { useState, Component } from 'react'

import { View, Text, Icon } from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import { AsyncStorage, Dimensions } from 'react-native'
import styles from './dashboard.style'
import colors from "../../constant/color";
import APIs from '../../controllers/api.controller'
const width = Dimensions.get('screen').width;

const lb_color = [
    {
        title: 'Presents',
        color: '#35A9AC'
    },
    {
        title: 'Absents',
        color: '#FF0000'
    },
]
export default class Chart extends Component {
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
            this.getSummaryData(this.state.auth, this.state.id, this.state.url, year)
        }
    }

    getSummaryData(auth, id, url, year) {
        APIs.getDashboardSummary(url, auth, id, year)
            .then((res) => {
                //console.log("Dashboard Data", res.data)
                if (res.status === 'success') {
                    if(res.data["Dashboard Type"] == "HR"){
                        let data = []
                        let lData = []
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
                           
                        }
                        this.setState({
                            summaryData: data,
                            labelData: lData
                        })
                    }else{
                        let data = []
                        let lData = []
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
                                   value: res.data["Today Absent Count"],
                                    color: lb_color[i].color
                                }
                                data.push(obj)
                                lData.push(obj)
                            }
                        }
                        this.setState({
                            summaryData: data,
                            labelData: lData
                        })
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
                <View style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
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
            <View style={styles.pieRow}>
                {/* <View style={styles.pieBox}>
                    <PieChart
                        style={{ height: 130 }} data={pieData}
                        innerRadius="75%"
                    />
                </View> */}
                 <View style={{
                    width: width / 3,
                    height: 160,
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <View style={{ width: width / 3, height: width / 3, marginRight: 20 }}>
                        <View style={{ width: width / 3, height: width / 3, position: 'absolute', borderRadius: width / 6, backgroundColor: colors.primary, top: 0 }}></View>
                        <PieChart
                            style={{ height: width / 3, }} data={pieData}
                            innerRadius="70%"
                            padAngle={0}
                        >
                        </PieChart>
                    </View>
                </View>
                <View style={styles.pieInfo}>
                    {
                        this.state.labelData.map((d, key) => (
                            <View style={styles.pieTxtContainer} key={key}>
                                <Icon name="md-square" style={[styles.pieicn, { color: d.color }]} />
                                <Text style={styles.pietxt}>{d.title} - {d.value}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}
