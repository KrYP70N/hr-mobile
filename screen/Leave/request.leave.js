import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native'

// import native base
import { 
    Container, 
    Header, 
    Content, 
    Form,
    Item, 
    Input, 
    Label,
    Picker,
    Textarea,
    Button
} from 'native-base';

// icon set
import Icon from 'react-native-vector-icons/Feather'

// import component
import Card from '../../components/card.component'


// import constant & style

import color from '../../constant/colors.constant'
import style from '../../constant/style.constant'
import attendance from '../../constant/attendance.constant'

export default class Request extends Component {
    render () {
        return (
            <View style={style.container}>

                {/* leave type */}
                <Item picker style={style.mb20}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="chevron-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                    >
                        <Picker.Item label="Casual Leave" value="key0" />
                        <Picker.Item label="Another Leave" value="key1" />
                    </Picker>
                </Item>
                
                {/* start date */}
                <Item style={style.mb20}>
                    <Label style={{color: color.placeholder}}>Start Date</Label>
                    <Input />
                    <Icon active name='calendar' style={[style.h2, style.placeholder, style.textPlaceholder]}/>
                </Item>

                {/* end date */}
                <Item style={style.mb20}>
                    <Label style={{color: color.placeholder}}>End Date</Label>
                    <Input />
                    <Icon active name='calendar' style={[style.h2, style.placeholder, style.textPlaceholder]}/>
                </Item>

                {/* leave type */}
                <Item picker style={style.mb20}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="chevron-down" />}
                        style={{ width: undefined }}
                        placeholder="Date Type"
                        placeholderStyle={{ color: color.placeholder }}
                        placeholderIconColor="#007aff"
                    >
                        <Picker.Item label="Day Type" value="key0" />
                        <Picker.Item label="Another Leave" value="key1" />
                    </Picker>
                </Item>
                
                {/* reason */}
                <Textarea rowSpan={5} bordered placeholder="Reason for Leave" placeholderTextColor={{color: color.placeholder}} />

                <View style={[style.dispayFlex, style.flexRow, style.justifyBetween, style.itemCenter]}>
                    <Text style={[style.textPlaceholder, style.h3]}>Attachment</Text>
                    <Button primary style={{padding: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: color.primary}}>
                        <Text style={style.textLight}>Default Small</Text>
                    </Button>
                </View>
            </View>
        )
    }
}