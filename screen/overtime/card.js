import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import offset from '../../constant/offset'
import color from '../../constant/color'
const height = Dimensions.get('screen').height;
import React, { Component } from 'react'
const cardList = [
    {
        title: 'Apply',
        noti: 2,
        icon: require('../../assets/icon/leave_apply.png'),
        page: 'OvertimeRequest'
    },
    {
        title: 'History',
        noti: 3,
        icon: require('../../assets/icon/leave_history.png'),
        page: 'OvertimeHistory'
    },
    {
        title: 'Approved',
        noti: 0,
        icon: require('../../assets/icon/otapprove.png'),
        page: 'OvertimeApprove'
    },
    {
        title: 'Rejected',
        noti: 0,
        icon: require('../../assets/icon/otreject.png'),
        page: 'OvertimeRejected'
    },
    {
        title: 'Pending Approval',
        noti: 9,
        icon: require('../../assets/icon/leave_pending.png'),
        page: 'OvertimePending'
    },
]
export class cards extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.cardContainer}>
                {
                    cardList.map((card, key) => (
                        <TouchableOpacity
                            style={styles.innerCardContainer} key={key}
                            onPress={() => { this.props.navigation.navigate(card.page) }}>
                            <View style={{
                                width: '100%',
                                //paddingLeft: offset.o1,
                                justifyContent: 'center',
                                alignItems: 'center'
                                // height: height/6,
                            }} key={key}>
                            <Image source={card.icon} style={{
                                    width: 35,
                                    height: 35,
                                    marginBottom: offset.o1 + offset.oh
                                }} />
                                {/* {(card.title === 'Rejected') ? <Image source={card.icon} style={{
                                    width: 45,
                                    height: 43,
                                    marginBottom: offset.oh
                                }} /> : (card.title === 'Approved') ? <Image source={card.icon} style={{
                                    width: 48,
                                    height: 42,
                                    marginBottom: offset.oh
                                }} /> : <Image source={card.icon} style={{
                                    width: 35,
                                    height: 40,
                                    marginBottom: offset.oh
                                }} />} */}
                                <Text style={{ fontSize: 14, fontFamily: 'Nunito' }}>{card.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        flexWrap: 'wrap'
    },
    innerCardContainer: {
        width: '48%',
        padding: offset.o2,
        backgroundColor: color.light,
        marginTop: offset.o1 + offset.oh,
        borderRadius: offset.o1,
        borderColor: color.cardBorder,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
    },

})


export default cards