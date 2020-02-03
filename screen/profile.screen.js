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

export default class ProfileScreen extends Component {
  render () {
    return (
      <ScrollView style={profile.container}>
        <View style={profile.topGab}></View>
        
        {/* personal info */}
        <View style={[profile.personalContainer, style.mb40]}>
          {/* profile - primary */}
          <View style={[profile.profile, style.mb10]}>
            <View style={profile.pictureBox}>
              <Image source={require('../assets/icon/user.png')} style={profile.picture}/>
            </View>
            <Text style={[style.textPlaceholder, style.mb10]}>ID - 123456</Text>
            <Text style={[style.h2, style.textPrimary, style.mb10, style.fontBold]}>John Doe</Text>
            <Text style={[style.textSecondary, style.h4]}>Web Developer</Text>
          </View>
          {/* profile secondary */}
          <View style={style.listBox, style.radius, style.mb10}>
            <View style={[style.list]}>
              <Text style={[style.listLabel, style.h4, style.mb10]}>Department</Text>
              <Text style={[style.h3]}>IT</Text>
            </View>
            <View style={[style.list]}>
              <Text style={[style.listLabel, style.h4, style.mb10]}>Date of Joining</Text>
              <Text style={[style.h3]}>01/05/2018</Text>
            </View>
            <View style={[style.list, style.listLast]}>
              <Text style={[style.listLabel, style.h4, style.mb10]}>E-mail</Text>
              <Text style={[style.h3]}>johndoe@innovixhr.com</Text>
            </View>
          </View>
        </View>

        {/* contact info */}
        <Text style={[style.h2, style.fontBold, style.mb20]}>Contact Info</Text>
        <View style={[style.mb40, style.radius]}>
          <View style={style.listBox}>
            <View style={[style.list]}>
                <Text style={[style.listLabel, style.h4, style.mb10]}>Phone</Text>
                <Text style={[style.h3]}>95 9 7955 80 950</Text>
            </View>
            <View style={[style.list, style.listLast]}>
                <Text style={[style.listLabel, style.h4, style.mb10]}>E-mail</Text>
                <Text style={[style.h3]}>kyawmyohtut29@gmail.com</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    )
  }
}