import React, { Component } from 'react'
import { Text, Header, Left, Right, Container, Content } from 'native-base'

import Heading from '../../components/header.component'
import styProfile from './profile.style'
import Loading from '../../components/loading.component'
import { AsyncStorage } from 'react-native'
import APIs from '../../controllers/api.controller'

import GeneralProfile from './_general.profile'
import PersonalProfile from './_personal.profile'

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

  componentDidMount () {
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
      this.setState({
        auth: data['key'],
        id: data['id']
      })
    })

    this.props.navigation.addListener('focus', () => {
      if(this.state.url !== null && this.state.auth !== null && this.state.id !== null) {
        APIs.Profile(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          if(res.status === 'success') {
            this.setState({
              data: res.data
            })
          } else {
            this.props.navigation.navigate('Login')
          }
        })
      }
    });

  }

  componentDidUpdate () {
    if(this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
      APIs.Profile(this.state.url, this.state.auth, this.state.id)
      .then((res) => {
        if(res.status === 'success') {
          this.setState({
            data: res.data
          })
        } else {
          this.props.navigation.navigate('Login')
        }
      })
    }
  }

  render() {
    if(this.state.url === null || this.state.auth === null || this.state.id === null || this.state.data === null) {
      return (
        <Loading info='request profile data ...'/>
      )
    }

    return (
      <Container style={styProfile.topContainer}>
        <Content>
          <Heading secondary title="Profile" navigation={this.props.navigation} />
          <GeneralProfile data={this.state.data['General Information']} dataWork={this.state.data['Work Information']} />
          <Text style={styProfile.title}>Personal Information</Text>
          <PersonalProfile data={this.state.data['Personal Information']}/>
        </Content>
      </Container>
    )
  }

}