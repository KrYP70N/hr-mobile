import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Text, View } from 'native-base'

import styProfile from './profile.style'
import ProfileModel from '../../model/profile.model'
import Loading from '../../components/loading.component'
import offset from '../../constant/offset'

export default class GeneralProfile extends Component {
    constructor (props) {
        super(props)
        this.state = {
            workKey: null
        }
    }

    componentDidMount () {
        let workArray = []
        for (const key in this.props.dataWork) {
            if (this.props.dataWork.hasOwnProperty(key)) {
                workArray.push(key)
            }
        }
        this.setState({
            workKey: workArray
        })

        console.log(this.props.dataWork)
    }

    render () {

        if(this.state.workKey === null) {
            return (
                <Loading />
            )
        }

        let dataList = this.state.workKey.map(list => {
            if(list === this.state.workKey[0]) {
                return (
                    <View style={[styProfile.dataListLast, {
                        display: this.props.dataWork[`${list}`] ? null : 'none'
                    }]} key={list}>
                        <Text style={styProfile.label}>{list}</Text>
                        <Text style={[styProfile.dataValue, {paddingBottom: offset.o1}]}>{this.props.dataWork[`${list}`]}</Text>
                    </View>    
                )
            }
            return (
                <View style={[styProfile.dataList, {
                    display: this.props.dataWork[`${list}`] ? null : 'none'
                }]} key={list}>
                    <Text style={styProfile.label}>{list}</Text>
                    <Text style={styProfile.dataValue}>{this.props.dataWork[`${list}`]}</Text>
                </View>
            )
        })

        // console.log(dataList)
        
        return (
            <View style={styProfile.workInfo}>
                <View style={styProfile.workContainer}>
                    <Image source={
                    this.props.data['Profile Picture'][0] === false ?
                        require('../../assets/icon/user.png') :
                        {
                        uri: `data:${this.props.data['Profile Picture'][1]};base64,${this.props.data['Profile Picture'][0]}`
                        }
                    } style={styProfile.profileImage}/>
                    <Text style={styProfile.id}>ID - {this.props.data['Employee Code']}</Text>
                    <Text style={styProfile.name}>{this.props.data['Employee Name']}</Text>
                    <Text style={styProfile.position}>
                    {
                        this.props.data['Job Position'] ?
                        this.props.data['Job Position'] :
                        'Untitled Position'
                    }
                    </Text>
                    {dataList}
                </View>
            </View>
        )
    }
}