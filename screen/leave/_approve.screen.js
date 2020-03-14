import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Header } from 'native-base'
const data = [  
    {name: 'Phoe Phoe', email: 'phoephoe@gmail.com'},
    {name: 'Thet Su', email: 'thetsu@gmail.com'}, 
    {name: 'Lwin', email: 'lwin@gmail.com'},
    {name: 'Ei Zon', email: 'eizon@gmail.com'},  
   
];

export default class LeaveApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaveLists: [],
        }
    }
    componentDidMount(){
        this.setState({leaveLists: data})
    }
    render() {
        return (
            <View style={styles.leaveApproveContainer}>
                <Header style={{
                    backgroundColor: color.light,
                    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    <Left style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary
                        }}>Leave Approve</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <FlatList
                    data={this.state.leaveLists}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={styles.leaveApproveCard}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                    }
                    keyExtractor={item => item.email}
                />



            </View>
        )
    }
}

const styles = StyleSheet.create({
    leaveApproveContainer: {
        flex: 1,
    },
    leaveApproveCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity: 0.62
    }
})


