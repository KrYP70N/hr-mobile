import React, {useState} from 'react'

import { View, Text, Icon } from 'native-base'
import { PieChart } from 'react-native-svg-charts'

import styles from './dashboard.style'
import colors from "../../constant/color";


export default function Chart() {

    const [data, setdata] = useState([
        {
            title: 'Presents',
            value: 70,
            color: colors.primary
        },
        {
            title: 'Absents',
            value: 20,
            color: colors.danger
        },
        {
            title: 'Overtime',
            value: 10,
            color: colors.warning
        },
    ])

    const pieData = data
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
                style={{ height: 150 }} data={pieData} 
                innerRadius="70%"
                />
            </View>
            <View style={styles.pieInfo}>
                {
                    data.map((d, key) => (
                        <View style={styles.pieTxtContainer} key={key}>
                            <Icon name="md-square" style={[styles.pieicn, {color: d.color}]} /> 
                            <Text style={styles.pietxt}>{d.title} - {d.value}%</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}
