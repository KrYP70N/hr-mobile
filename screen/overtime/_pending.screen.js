import React, { Component } from 'react'
import styOt from './overtime.style'
import po from './po'
import { Text, Container, Content, Card, CardItem, Body, Row, Col, Button, View, Toast } from 'native-base'
import APIs from '../../controllers/api.controller'
import color from '../../constant/color'
import Loading from '../../components/loading.component'
import { AsyncStorage } from 'react-native'


export default class Pending extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: [],
            url: null,
            token: null,
            id: null
        }
    }

    cancelOT(data){
        console.log("Click Cancel:::");
            APIs.OTUpdateStatus(data, this.state.auth, this.state.url, 'cancel')
                .then((res) => {
                    console.log("Return Message", res.data)
                    if(res.status === 'success') {  
                        Toast.show({
                            text: 'OT Cancel successful!',
                            textStyle: {
                                textAlign: "center"
                            },
                            style: {
                                backgroundColor: color.primary
                            }
                        })                   
                        this.getApproveData(this.state.auth, this.state.id, this.state.url);
                        //this.getOTList()
                     
                    } else {
                        console.log(res)
                    }
                })
        }

        getApproveData(auth, id, url) {
            APIs.OTPending(id, auth, url)
                .then((res) => {
                    if (res.status === 'success') {
                        console.log("Pending List::", res.data)
                        this.setState({
                            data: res.data
                        })
                    } else {
                        Toast.show({
                            text: 'Network Error',
                            textStyle: {
                                textAlign: 'center'
                            },
                            style: {
                                backgroundColor: color.danger
                            }
                        })
                    }
                })
        }
    

    componentDidMount () {

        this.getApproveData(this.props.auth, this.props.id, this.props.url)
        AsyncStorage.getItem('@hr:token')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                auth: data.key,
                id: data.id
            })
        })
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => {
            let data = JSON.parse(res)
            this.setState({
                url: data['ApiEndPoint']
            })
        })
    }

    render () {     
        console.log(this.state.data)
        if(this.state.url === null || this.state.auth === null || this.state.id === null) {
            return (
                <Loading />
            )
        }
        let requests = this.state.data.map((req) => {
            return (
                <Card key={Math.floor(Math.random()*3000)+req['date']+Math.floor(Math.random()*3000)} >
                    <CardItem>
                        <Body>
                            <View style={styOt.cardTitleContainer}>
                                <Text style={styOt.cardTitle}>{po.approve.staff.cardTitle}</Text>
                            </View>
                            <Text style={styOt.cardXSText}>{po.approve.staff.label1}{req['date']}</Text>
                            <Text style={styOt.cardSText}>{po.approve.staff.label2}{req['hours']}</Text>
                            <Text style={styOt.cardWarning}>{po.approve.staff.warning}</Text>
                            <Button 
                            style={styOt.ButtonSecondary}
                            onPress={() => {this.cancelOT(req['Obj Id'])}}
                            >
                                <Text>{po.approve.staff.button}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            )
        })

        return (
            <Container style={styOt.container}>
                <Content>
                    {requests}
                </Content>
            </Container>
        )
    }
}