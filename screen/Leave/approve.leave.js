import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native'

// native base
import {
    Container,
    Card,
    CardItem,
    Body,
    Grid,
    Col,
    Row,
    Button
} from 'native-base'

// icon set
import Icon from 'react-native-vector-icons/Feather'

// import component
// import Card from '../../components/card.component'


// import constant & style

import color from '../../constant/colors.constant'
import style from '../../constant/style.constant'
import attendance from '../../constant/attendance.constant'

export default class Approve extends Component {
    render () {
        return (
            <ScrollView>
                <View style={style.container}>
                    <Card style={{padding: 20, marginBottom: 20}}>
                        <View style={[style.dispayFlex, style.flexRow, style.justifyBetween, style.itemCenter, style.width100]}>
                            <Text style={[style.h2, style.fontBold]}>John Doe</Text>
                            <Text style={style.textPlaceholder}>1hr ago</Text>
                        </View>
                        <Text style={[style.textSecondary, style.h3]}>Web Developer</Text>
                        <Text style={[style.textPlaceholder, style.mt10, style.h4]}>07 Nov 2019 to 09 Nov 2019</Text>
                        <Text style={[style.textNegative, style.h4]}>Casual Leave</Text>
                        <View style={[style.dispayFlex, style.flexRow, style.mt20]}>
                            <Button style={[style.width50, style.mr10, style.backgroundPlaceholder]}>
                                <Text style={[style.width100, style.textCenter, style.textLight]}>Reject</Text>
                            </Button>
                            <Button style={[style.width50, style.ml5, style.backgroundPrimary]}>
                                <Text style={[style.width100, style.textCenter, style.textLight]}>Reject</Text>
                            </Button>
                        </View>
                    </Card>
                    <Card style={{padding: 20, marginBottom: 20}}>
                        <View style={[style.dispayFlex, style.flexRow, style.justifyBetween, style.itemCenter, style.width100]}>
                            <Text style={[style.h2, style.fontBold]}>Casual Leaves</Text>
                            <Text style={style.textPlaceholder}>1hr ago</Text>
                        </View>
                        {/* <Text style={[style.textSecondary, style.mb10]}>07 Nov 2019 to 09 Nov 2019</Text> */}
                        <Text style={[style.textPlaceholder, style.mt10, style.h4]}>07 Nov 2019 to 09 Nov 2019</Text>
                        <Text style={[style.textNegative, style.h4]}>Casual Leave</Text>

                        <Text style={[style.h3, style.textWarning, style.mt10]}>Your request is pending.</Text>

                        <Button style={[style.backgroundPlaceholder, style.mt20]}>
                            <Text style={[style.textCenter, style.width100, style.textLight]}>Cancel Request</Text>
                        </Button>
                        
                    </Card>
                    
                </View>
            </ScrollView>
        )
    }
}