import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import offset from '../../constant/offset'
import color from '../../constant/color'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height

const data = [
    {
        title: 'Casual Leave',
        value: 6,
        color: '#47E9EE'
    },
    {
        title: 'Marriage Leave',
        value: 3,
        color: '#35A9AC'
    },
    {
        title: 'Medical Leave',
        value: 20,
        color: '#377375'
    },
    {
        title: 'Annual Leave',
        value: 7,
        color: '#FFB300'
    },
    {
        title: 'Examination Leave',
        value: 6,
        color: '#9ECE1B'
    },

]



export class EmployeeLeaveBalance extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        let leaveData = data.map((leave) => {
            return(
                <View style={{ width: '100%', }}>
                <View style={{ width: '100%', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style = {{width: 20, height: 20, borderRadius: 20/2, backgroundColor: leave.color}}></View>
                        <Text style = {{marginLeft: 10, fontSize: 16, fontFamily: 'Nunito'}}>{leave.title}</Text>
                    </View>
                    <Text style = {{fontSize: 16, fontFamily: 'Nunito-Bold'}}>{leave.value}</Text>
                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: color.placeHolder }} />
            </View>
            )
        })

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
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Leave') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Leave Balance</Text>
                    </View>
                    <View style = {{width: '100%', height: 20, backgroundColor: color.lighter}}></View>
                    <Content style={{ flex: 1 }}>
                        <View style = {{height: 200, width: '100%',justifyContent: 'center'}}>
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
                </Container>
            </SafeAreaView>
        )
    }
}

export default EmployeeLeaveBalance
