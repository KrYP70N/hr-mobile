import React, { Component } from 'react'
import {Icon} from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import { View, Text, AsyncStorage, Dimensions } from 'react-native'
import styles from './dashboard.style'
import colors from "../../constant/color";
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import color from '../../constant/color'
const width = Dimensions.get('screen').width;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const lb_color = [
    {
        title: 'Presents',
        color: '#35A9AC'
    },
    {
        title: 'Absents',
        color: '#FF0000'
    },
    {
        title: 'Total',
        color: '#ffffff'
    }
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
            chartLabel: '',
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
                if (res.status === 'success') {

                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        if (res.data["Dashboard Type"] == "HR") {
                            let data = []
                            let lData = [];
                            let total = 0;
                            total = res.data["Attendance Count"][0][0] + res.data["Today Absent Count"][0][0];
                            for (let i = 0; i < 3; i++) {

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
                                        value: res.data["Today Absent Count"][0][0],
                                        color: lb_color[i].color
                                    }
                                    data.push(obj)
                                    lData.push(obj)
                                }
                                if (i == 2) {
                                    let obj = {
                                        title: lb_color[i].title,
                                        value: total,
                                        color: lb_color[i].color
                                    }
                                    lData.push(obj)
                                }
                            }
                            this.setState({
                                summaryData: data,
                                labelData: lData,
                                chartLabel: `Today's Presents & Absents`
                            })
                        } else {
                            let data = []
                            let lData = []
                            let total = 0;
                            total = res.data["Attendance Count"][0][0] + res.data["Today Absent Count"];
                            for (let i = 0; i < 3; i++) {
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
                                        value: res.data["Today Absent Count"],
                                        color: lb_color[i].color
                                    }
                                    data.push(obj)
                                    lData.push(obj)
                                }
                                if (i == 2) {
                                    let obj = {
                                        title: lb_color[i].title,
                                        value: total,
                                        color: lb_color[i].color
                                    }
                                    lData.push(obj)
                                }
                            }
                            let date = new Date();
                            this.setState({
                                summaryData: data,
                                labelData: lData,
                                chartLabel: `${months[date.getMonth()]}-${date.getFullYear()}`
                            })
                        }
                    }
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

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: offset.o1,
                backgroundColor: color.primary,
            }}>
                <View style={{
                    width: width / 3,
                    height: 130,
                    justifyContent: 'center',
                    backgroundColor: color.primary,
                    marginRight: 10,
                }}>
                    <View style={{ width: 130, height: 130, marginRight: 20 }}>
                        <View style={{ width: 130, height: 130, position: 'absolute', borderRadius: 160 / 2, backgroundColor: '#fff', top: 0 }}></View>
                        <PieChart
                            style={{ height: 130, }}
                            data={pieData}
                            innerRadius="70%"
                            padAngle={0}
                        />
                    </View>
                </View>
                <View style={styles.pieInfo}>
                    <View><Text style={{ marginBottom: 20, color: color.light, fontFamily: 'Nunito-Bold', fontSize: 14, }}>{this.state.chartLabel}</Text></View>
                    {
                        this.state.labelData.map((d, key) => (
                            <View style={styles.pieTxtContainer} key={key}>
                                <Icon name="md-square" style={[styles.pieicn, { color: d.color }]} />
                                <View style={{ width: width / 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.pietxt}>{d.title}</Text>
                                    <Text style={styles.pietxt}> -  {d.value}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}
