import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text
} from 'react-native'

import {
  Content, 
  List, 
  ListItem } from 'native-base';


// icon set
import Icon from 'react-native-vector-icons/Feather';

// import constant & style

import color from '../constant/colors.constant'
import style from '../constant/style.constant'
import profile from '../constant/profile.constant'

// imort component
import APIs from '../controller/api.controller'

export default class ProfileScreen extends Component {

  // constructor
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      user: null,
      workInfo: [],
      personalInfo: []
    }
  }

  // mount
  componentDidMount () {
    // console.log(this.props.navigation.state.params)
    console.log(this.state.personalInfo)
    this.setState({
      token: this.props.navigation.state.params.token,
      user: this.props.navigation.state.params.user
    })
  }

  WorkInfo = () => {
    this.state.workInfo.map((data) => {
      return (
        <Text>{data}</Text>
      )
    })
  }

  componentDidUpdate () {
    let index = 'general'
    let work = []
    let personal = []
    // check user information
    if(this.state.user !== null) {
      let user = this.state.user.data
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if(key === 'Work Information') {
            index = 'work'
          }
          if(key === 'Personal Information') {
            index = 'personal'
          }
          // update work info
          if(index === 'work') {
            work.push({
              'name' : key,
              'value' : user[key]
            })
          }
          // update profile info
          if(index === 'personal') {
            personal.push({
              'name' : key,
              'value' : user[key]
            })
          }
        }
      }
    }

    
    
    if(this.state.personalInfo.length === 0) {
      this.setState({
        workInfo: work,
        personalInfo: personal
      })  
    }
  }

  render () {

    const workinfo = this.state.workInfo.map((data) => {
      if(data.value !== "" && data.value !== false) {
        return (
          <View style={[style.list]} key={data.name}>
            <Text style={[style.listLabel, style.h4, style.mb10]}>{data.name}</Text>
            <Text style={[style.h3]}>{data.value}</Text>
          </View>
        )
      }
    })

    const personalinfo = this.state.personalInfo.map((data) => {
      if(data.value !== "" && data.value !== false) {
        return (
          <View style={[style.list]} key={data.name}>
            <Text style={[style.listLabel, style.h4, style.mb10]}>{data.name}</Text>
            <Text style={[style.h3]}>{data.value}</Text>
          </View>
        )
      }
    })

    return (
      <ScrollView style={profile.container}>
        <View style={profile.topGab}></View>
        
        {/* personal info */}
        <View style={[profile.personalContainer, style.mb40]}>
          {/* profile - primary */}
          <View style={[profile.profile, style.mb10]}>
            <View style={profile.pictureBox}>
              {
                this.state.user === null ?
                <Image source={require('../assets/icon/user.png')} style={profile.picture}/> :
                <Image source={{


                  uri: `data:${this.state.user.data['Profile Picture'][1]};base64,${this.state.user.data['Profile Picture'][0]}`
                }} style={profile.picture}/>
              }
              
            </View>
            <Text style={[style.textPlaceholder, style.mb10]}>
              {this.state.user === null ? 'null' : this.state.user.data['Employee Code']
            }</Text>
            <Text style={[style.h2, style.textPrimary, style.mb10, style.fontBold]}>
              {this.state.user === null ? 'adasf' : this.state.user.data['Employee Name']}
            </Text>
            <Text style={[style.textSecondary, style.h4]}>
            {this.state.user === null ? 'adasf' : this.state.user.data['Job Position']}
            </Text>
          </View>
          {/* profile secondary */}
          <View style={style.listBox, style.radius, style.mb10}>
            {workinfo}
          </View>
        </View>

        {/* contact info */}
        <Text style={[style.h2, style.fontBold, style.mb20]}>Personal Info</Text>
        <View style={[style.mb40, style.radius]}>
          <View style={style.listBox}>
            {personalinfo}
          </View>
        </View>
      </ScrollView>
    )
  }
}
