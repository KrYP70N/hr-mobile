import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height
export class EmployeeLeavePending extends Component {
    render() {
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
                        }}>Pending Approval</Text>
                    </View>
                    <Content style={{ flex: 1, backgroundColor: color.lighter }}>
                       
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default EmployeeLeavePending
