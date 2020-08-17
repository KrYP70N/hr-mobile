import React, { Component} from 'react'
import { Container, Content} from 'native-base'
import {SafeAreaView } from 'react-native'
import styles from './noticeboard.style'
import NotiList from './notilist'
import BackHeader from '../../components/BackHeader'

export default class NoticeBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null,
            auth: null,
            id: null,
            startDate: '',
            endDate: ''
        }
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container>
                <BackHeader name = "Notice Board" navigation = {this.props.navigation} parent = "Main" />
                    <Content style={styles.container}>
                        <NotiList navigation={this.props.navigation} />
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}
