import React, { Component } from 'react'
import { Text, Header, Left, Right, Container, Content, Icon } from 'native-base'

import Heading from '../../components/header.component'
import styProfile from './profile.style'
import Loading from '../../components/loading.component'
import { AsyncStorage, View, SafeAreaView } from 'react-native'
import APIs from '../../controllers/api.controller'

import GeneralProfile from './_general.profile'
import PersonalProfile from './_personal.profile'
import { BaseRouter } from '@react-navigation/native'
import color from '../../constant/color'
import offset from '../../constant/offset'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      auth: null,
      id: null,
      data: null,
      name: null,
      random: null
    }
  }


  backAction = () => {
    if (this.props.navigation.params.backScreen == "MainScreen") {
      this.props.navigation.goBack();
      return false;
    } else {
      return true;
    }
  };


  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction)
    // request endpoint
    AsyncStorage.getItem('@hr:endPoint')
      .then((res) => {
        this.setState({
          url: JSON.parse(res)['ApiEndPoint']
        })
      })
    // request auth & id
    AsyncStorage.getItem('@hr:token')
      .then((res) => {
        let data = JSON.parse(res)
        console.log(data.id, '<<<<')
        this.setState({
          auth: data['key'],
          id: data['id']
        })
      })

    this.props.navigation.addListener('focus', () => {
      if (this.state.url !== null && this.state.auth !== null && this.state.id !== null) {
        APIs.Profile(this.state.url, this.state.auth, this.state.id)
          .then((res) => {
            if (res.status === 'success') {
              if (res.error) {
                this.props.navigation.navigate('Login')
              } else {
                this.setState({
                  data: res.data
                })
              }
            } else {
              this.setState({
                data: []
              })
              //this.props.navigation.navigate('Login')
            }
          })
          .catch((error) => {
            this.props.navigation.navigate('Login')
          })
      }
    });

  }
  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }

  componentDidUpdate() {
    if (this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
      APIs.Profile(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          if (res.status === 'success') {
            if (res.error) {
              this.props.navigation.navigate('Login')
            } else {
              this.setState({
                data: res.data
              })
            }
          } else {
            this.setState({
              data: []
            })
          }
        })
        .catch((error) => {
          this.props.navigation.navigate('Login')
        })
    }
  }

  render() {
    if (this.state.url === null || this.state.auth === null || this.state.id === null || this.state.data === null) {
      return (
        <Loading info='request profile data ...' />
      )
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={styProfile.topContainer}>
          <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
            <Icon name='ios-arrow-round-back' style={{
              fontSize: offset.o4,
              color: color.primary,
              marginRight: offset.o2,
              marginLeft: 15,
            }} onPress={() => { this.props.navigation.navigate('Main') }} />
            <Text style={{
              color: color.secondary,
              fontFamily: 'Nunito'
            }}>Profile</Text>
          </View>

          <Content>
            {/* <Heading secondary title="Profile" navigation={this.props.navigation} /> */}

            <GeneralProfile data={this.state.data['General Information']} dataWork={this.state.data['Work Information']} />
            <Text style={styProfile.title}>Personal Information</Text>
            <PersonalProfile data={this.state.data['Personal Information']} />
          </Content>
        </Container>
      </SafeAreaView>
    )
  }

}