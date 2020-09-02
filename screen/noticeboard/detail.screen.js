import React, { Component } from 'react'
import { Container, Header, Left, Icon, Text, Content, View } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import styles from './noticeboard.style'

export default class NoticBoardDetail extends Component {
    render() {
        const { params } = this.props.route
        console.log("Body Message", params['Body'])
        return (
            <Container>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    <Left style={{
                        //display: 'flex',
                        flexDirection: 'row',
                        //justifyContent: 'center'
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginLeft: offset.o1,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('NoticeBoard') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>{params['Subject'].slice(0, 8)} {params['Subject'].length > 8 && '...'}</Text>
                    </Left>
                </Header>
                
                <Content style={{
                    backgroundColor: color.lighter
                }}>
                    {/* banner */}
                    <View style={styles.banner}>
                        <Text style={styles.bannerTitle}>{params['Subject']}</Text>
                    </View>

                    {/* body */}
                    <View style={styles.container}>
                        <Text style={styles.detailDate}>{params['Date']}</Text>
                        <Text style = {styles.detailBody}>{params['Body']}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
