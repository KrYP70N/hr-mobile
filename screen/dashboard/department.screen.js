import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image } from 'react-native'
import { Container, Icon, Content, } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

const deptLists = [
    {
        "name": "Hla Hla",
        "position": "Manager",
        "deptname": "IT",
        "location": "Yangon"
    },
    {
        "name": "Aung Aung",
        "position": "Manager",
        "deptname": "IT",
        "location": "Yangon"
    },
    {
        "name": "Su Su",
        "position": "Manager",
        "deptname": "Marketing",
        "location": "Mandalay"
    }
]

export class DepartmentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null,
            id: null,
            auth: null,
            year: null,
            deptLists: [],   
            loading: true,
            loadingTxt: 'Loading...',
            requestData: true,
        }
    }
    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            let date = new Date()
            this.setState({
                year: date.getFullYear(),
            })
    
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    let date = new Date()
                    const currentYear = date.getFullYear()
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id
                            })
                            this.getDepartmentData(auth, id, url, currentYear);
                        })
                })
        })
    }
    

    getDepartmentData(auth, id, url, year){
        APIs.getDeptEmployeeListData(url, auth, id, year)
        .then((res) => {
            if(res.status == "success"){
                if(res.error){
                    this.props.navigation.navigate('Login')
                }else{
                    console.log("Dept List", res.data)
                    this.setState({
                        deptLists: res.data,
                        loading: false,
                        loadingTxt: '',
                        requestData: false,
                    })
                }               
            }else{
                this.setState({
                    deptLists: [],
                    loading: false,
                    loadingTxt: '',
                    requestData: false,
                })
            }
        })
    }

    render() {
        if (this.state.requestData == true) {
            return (
                <Loading info={this.state.loadingTxt} />
            )
        }
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Container style = {{backgroundColor: color.lighter}}>
                    <View style={{ height: 60, width: '100%', backgroundColor: color.light, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2,
                            marginLeft: 15,
                        }} onPress={() => { this.props.navigation.navigate('Dashboard') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Department</Text>
                    </View>
                    <Content style={{ flex: 1 }}>
                    {
                            this.state.deptLists.map((dept, index) => {
                                return (
                                    <View key={index} style={{ marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.placeHolder }}>
                                        <Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require('../../assets/icon/user.png')}></Image>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{dept["Department"]}</Text>
                                        <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>Number of Employees - {dept["Number of Employees"]}</Text>

                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default DepartmentScreen
