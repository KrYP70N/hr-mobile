import React, { Component} from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native'


// import constant & style
import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import Icon from 'react-native-vector-icons/Feather';

let Card

export default Card = ({data}) => {
    // title layout
    let InfoTitle = () => {
        if(data.title) {
            if(data.title.layout === 'row') {
                return (
                    <View style={[
                        style.dispayFlex, 
                        style.flexRow, style.itemCenter, 
                        style.justifyCenter, 
                        style.mb10, 
                        style.mt10
                    ]}>
                        <Icon active name={data.title.icon ? data.title.icon : null} style={[style.icon, style.textPrimary, style.mr10]}/>
                        <Text style={style.h3}>{data.title.label}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={[
                        style.dispayFlex,
                        style.itemCenter, 
                        style.justifyCenter, 
                        style.mb10, 
                        style.mt10
                    ]}>
                        <Icon 
                            active 
                            name={data.title.icon ? data.title.icon : null} 
                            style={[style.h1, style.textPrimary, style.mb10]}
                        />
                        <Text style={style.h4}>{data.title.label}</Text>
                    </View>
                )
            }
        }
    }

    let Placeholder = () => {
            if(data.placeholder) {
                return (
                    <Text 
                    style={[
                        style.textCenter, 
                        style.h6, 
                        style.mb20, 
                        style.textPlaceholder
                    ]}>
                        {data.placeholder}
                    </Text>
                )
            } else {
                return null
            }
    }

     
    return (
        <TouchableNativeFeedback>
            <View style={data.cardStyle}>
                <InfoTitle />
                <Placeholder />
            </View>
        </TouchableNativeFeedback>
    )
}