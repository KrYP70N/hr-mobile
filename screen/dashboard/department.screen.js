import React, { Component } from 'react'
import { Text, View, SafeAreaView, AsyncStorage, Image } from 'react-native'
import { Container, Icon, Content, Toast } from 'native-base'
import color from '../../constant/color'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'
import BackHeader from '../../components/BackHeader'
export class DepartmentScreen extends Component {
    constructor(props) {
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
    componentDidMount() {
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


    getDepartmentData(auth, id, url, year) {
        APIs.getDeptEmployeeListData(url, auth, id, year)
            .then((res) => {
                if (res.status == "success") {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        this.setState({
                            deptLists: res.data,
                            loading: false,
                            loadingTxt: '',
                            requestData: false,
                        })
                    }
                } else {
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
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ backgroundColor: color.lighter }}>
                    <BackHeader name="Department" navigation={this.props.navigation} parent="Dashboard" />
                    {/* <Content style={{ flex: 1, marginBottom: 15}}> */}
                        {
                            this.state.deptLists.map((dept, index) => {
                                return (
                                    <View key={index} style={{ marginLeft: 15, marginRight: 15, marginTop: 15, borderRadius: 8, backgroundColor: color.light, padding: 10, alignItems: 'center', flexDirection: 'row', borderWidth: 0.3, borderColor: color.cardBorder }}>
                                        <Image style={{ width: 35, height: 35 }} source={require('../../assets/icon/department.png')}></Image>
                                        <View style={{flex: 1, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold' }}>{dept["Department"]}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 13, fontFamily: 'Nunito', color: '#656565' }}>Number of Employees - {dept["Number of Employees"]}</Text>

                                        </View>
                                    </View>
                                )
                            })
                        }
                    {/* </Content> */}
                </Container>
            </SafeAreaView>
        )
    }
}

export default DepartmentScreen
