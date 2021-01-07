import React, { Component } from 'react'
import { Text, Container, Content, Toast } from 'native-base'
import styProfile from './profile.style'
import Loading from '../../components/loading.component'
import { AsyncStorage, SafeAreaView, ScrollView, View } from 'react-native'
import APIs from '../../controllers/api.controller'
import GeneralProfile from './_general.profile'
import PersonalProfile from './_personal.profile'
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
    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
          let mainUrl = JSON.parse(res)['ApiEndPoint'];
          this.setState({
            url: JSON.parse(res)['ApiEndPoint']
          })
          AsyncStorage.getItem('@hr:token')
            .then((res) => {
              let data = JSON.parse(res)
              let user_auth = data['key']
              let user_id = data['id']
              this.setState({
                auth: data['key'],
                id: data['id']
              })
              APIs.Profile(mainUrl, user_auth, user_id)
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

            })
        })

    })

  }

  componentDidUpdate() {
    if (this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
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
  }

  render() {
    if (this.state.url === null || this.state.auth === null || this.state.id === null || this.state.data === null) {
      return (
        <Loading info='request profile data ...' />
      )
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader name="Profile" navigation={this.props.navigation} parent="Main" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <GeneralProfile data={this.state.data['General Information']} dataWork={this.state.data['Work Information']} />
            <Text style={styProfile.title}>Personal Information</Text>
            <PersonalProfile data={this.state.data['Personal Information']} />
          </View>
        </ScrollView>

      </SafeAreaView>
    )
  }

}