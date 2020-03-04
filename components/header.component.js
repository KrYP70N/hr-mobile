import React, { Component } from 'react'
import { Image, Platform, StatusBar } from 'react-native'
import { Icon, Header, Left, Right } from 'native-base'
import styMain from '../screen/main/main.style'
export default class Heading extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        console.log(this.props.secondary)
        return (
            <Header style={[styMain.header, {
                marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
            }]}>
                <Left>
                    <Icon name='menu' style={styMain.headerMenu}
                        onPress={() => {
                            this.props.navigation.openDrawer(this.props)
                        }}
                    />
                </Left>
                <Right>
                    <Image source={
                        require('../assets/upload/logo.png')
                    } style={styMain.headerLogo} />
                </Right>
            </Header>
        )
    }
}