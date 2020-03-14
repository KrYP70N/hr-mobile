import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { Icon, Header, Left, Right } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
const data = [
    { name: 'Phoe Phoe', email: 'phoephoe@gmail.com' },
    { name: 'Thet Su', email: 'thetsu@gmail.com' },
    { name: 'Lwin', email: 'lwin@gmail.com' },
    { name: 'Ei Zon', email: 'eizon@gmail.com' },

];

export default class OvertimeApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaveLists: [],
        }
    }
    componentDidMount() {
        this.setState({ leaveLists: data })
    }
    render() {
        return (
            <View style={styles.leaveApproveContainer}>
                <Header style={{ backgroundColor: color.light, marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
                    <Left style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name='ios-arrow-round-back' style={{ fontSize: offset.o4, color: color.primary, marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{color: color.secondary}}>OT Approve</Text>
                    </Left>
                    <Right></Right>
                </Header>

                <FlatList
                    data={this.state.leaveLists}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={styles.leaveApproveCard}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.position}>Web Developer</Text>
                            <Text style={styles.date}>Date - 09 April 2020</Text>
                            <Text style = {styles.otHour}>OT Hour - 5:00 PM to 8:00 PM</Text>
                            <View style ={styles.leaveApproveBtn}>
                                <TouchableOpacity>
                                <View style = {{backgroundColor: color.placeHolder ,width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                                    <Text>Reject</Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <View style = {{marginLeft: 10,backgroundColor: color.primary,width: 145, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                                    <Text style = {{color: 'white'}}>Approve</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
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
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    position:{fontSize: 14, marginTop: 3},
    leaveApproveCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity: 0.62,
        padding: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    leaveApproveBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    date:{
        fontSize: 12,
        marginTop: 15,
        color: '#000'
    },
    otHour: {
      fontSize: 12,
      marginTop: 5,
      //color: color.placeHolder,
    }
})


