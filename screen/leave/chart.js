import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions } from 'react-native'
import { Icon } from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import color from '../../constant/color'
import offset from '../../constant/color'
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
    }
    render() {
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
                marginBottom: offset.o2,
                borderRadius: offset.o1,
                height: '25%'
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
                    <View style = {{width: (2*width)/3, height: '75%'}}>
                    <FlatList
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
                    />
                    </View>
              
            </View>
        )
    }
}

export default chart
