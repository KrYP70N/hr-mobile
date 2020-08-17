import React, { Component } from 'react'
import { Text, Container, Content, Toast } from 'native-base'
import styProfile from './profile.style'
import Loading from '../../components/loading.component'
import { AsyncStorage, SafeAreaView } from 'react-native'
import APIs from '../../controllers/api.controller'
import GeneralProfile from './_general.profile'
import PersonalProfile from './_personal.profile'
import color from '../../constant/color'
import ErrorMessage from '../../constant/messagetext'
import BackHeader from '../../components/BackHeader'

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
      if (this.state.url !== null && this.state.auth !== null && this.state.id !== null) {
        APIs.Profile(this.state.url, this.state.auth, this.state.id)
          .then((res) => {
            if (res.status === 'success') {
              if (res.error) {
                ErrorMessage('token', this.props.navigation)
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
      }
    });

  }

  componentDidUpdate() {
    if (this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
      APIs.Profile(this.state.url, this.state.auth, this.state.id)
        .then((res) => {
          if (res.status === 'success') {
            if (res.error) {
             this.tokenExpiration()
            } else {
              this.setState({
                data: res.data
              })
            }
          } else {
           this.apiFail()
            this.setState({
              data: []
            })
          }
        })
        .catch((error) => {
         this.apiFail()
        })
    }
  }

  tokenExpiration(){
    Toast.show({
      text: 'Please login again. Your token is expired!',
      textStyle: {
          textAlign: 'center'
      },
      style: {
          backgroundColor: color.primary
      },
      duration: 6000
  })
    this.props.navigation.navigate('Login')
  }

  apiFail(){
    Toast.show({
      text: 'Authentication Failed!',
      textStyle: {
          textAlign: 'center'
      },
      style: {
          backgroundColor: color.primary
      },
      duration: 3000
  })
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
        <BackHeader name = "Profile" navigation = {this.props.navigation} parent = "Main" />
          <Content>
            <GeneralProfile data={this.state.data['General Information']} dataWork={this.state.data['Work Information']} />
            <Text style={styProfile.title}>Personal Information</Text>
            <PersonalProfile data={this.state.data['Personal Information']} />
          </Content>
        </Container>
      </SafeAreaView>
    )
  }

}