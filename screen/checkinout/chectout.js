import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Header, Left, Right, Icon } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import typo from '../../constant/typography'
import typography from '../../constant/typography'
import APIs from '../../controllers/api.controller';
import Clock from '../../components/time.component';
import Modal from 'react-native-modal';
import MapView, { Marker, Circle } from 'react-native-maps';

//Location
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import * as geolib from 'geolib';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            auth: null,
            id: null,
            location: null,
            locError: null,
            data: null,
            geofencing: null,
            officeCoord: null,
            radius: null,
            withinRadius: 'wait',
            status: null,
            isModalVisible: false,
            checkMessage: '',
            mapCoord: null,
            markerCoordinates: [],
            userName: null,
            refresh: false,
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('@hr:endPoint')
                .then((res) => {
                    const url = JSON.parse(res).ApiEndPoint
                    this.setState({ url: JSON.parse(res).ApiEndPoint })
                    AsyncStorage.getItem('@hr:token')
                        .then((res) => {
                            const auth = JSON.parse(res).key;
                            const id = JSON.parse(res).id;
                            this.setState({
                                auth: JSON.parse(res).key,
                                id: JSON.parse(res).id,
                                refresh: !this.state.refresh
                            })
                            this.getProfileData(auth, id, url);
                            this.CheckStatus(id, auth, url)
                        })
                })
        })
    }

    async getProfileData(auth, id, url) {
        let location = await Location.getCurrentPositionAsync({});
        APIs.Profile(url, auth, id)
            .then((res) => {
                if (res.status === "success") {
                    let makerCoordsArr = [];
                    let Cobj = {
                        title: 'Current Location',
                        coordinate: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }
                    }
                    makerCoordsArr.push(Cobj);

                    let obj = {
                        title: 'Office Location',
                        coordinate: {
                            latitude: res.data['General Information']['Latitude'],
                            longitude: res.data['General Information']['Longtitude']
                        }
                    }
                    makerCoordsArr.push(obj);
                    this.setState({
                        location: JSON.stringify(location.coords),
                        data: res.data,
                        geofencing: res.data['General Information']['Geo Fencing'],
                        // geofencing: false,
                        radius: res.data['General Information']['Radius(m)'],
                        officeCoord: {
                            latitude: res.data['General Information']['Latitude'],
                            longitude: res.data['General Information']['Longtitude']
                        },
                        userName: res.data['General Information']['Employee Name'],
                        mapCoord: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0009,
                            longitudeDelta: 0.0008
                        },
                        markerCoordinates: makerCoordsArr
                    })
                }
            })
            .catch((error) => {
                this.props.navigation.navigate('Login')
            })
    }

    async CheckOut() {
        let location = await Location.getCurrentPositionAsync({})
        if (this.state.geofencing) {
            if (
                geolib.isPointWithinRadius(
                    this.state.officeCoord,
                    {

                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                    this.state.radius
                )
            ) {

                if (this.state.status.Checkout !== false) {
                    this.setState({
                        checkMessage: "You're already checked out!",
                        isModalVisible: true,

                    })
                } else {
                    console.log("Within Radius")
                    // geo true
                    APIs.Checkout(this.state.url, this.state.auth, this.state.id, {
                        lat: this.state.location['latitude'],
                        long: this.state.location['longitude']
                    }).then((res) => {
                        console.log("Check Out Screen Data", res)
                        if (res.status === 'success') {
                            this.setState({
                                checkMessage: 'Check Out Successful!',
                                isModalVisible: true,

                            })
                        } else {
                            this.setState({
                                checkMessage: "You're already check out!",
                                isModalVisible: true,

                            })

                        }
                        this.CheckStatus(this.state.id, this.state.auth, this.state.url)
                    })
                        .catch((error) => {
                            this.props.navigation.navigate('Login')
                        })
                }

            } else {
                console.log("Not within radius")
                //not within radius
                this.setState({
                    checkMessage: "You're out of office area!",
                    isModalVisible: true,
                })
            }
        } else {
            // geo false
            if (this.state.status.Checkout !== false) {
                this.setState({
                    checkMessage: "You're already checked out!",
                    isModalVisible: true,

                })
            } else {
                APIs.Checkout(this.state.url, this.state.auth, this.state.id)
                    .then((res) => {
                        if (res.status === 'success') {
                            this.setState({
                                checkMessage: 'Check Out Successful!',
                                isModalVisible: true,

                            })
                        } else {
                            this.setState({
                                checkMessage: "You're already check out!",
                                isModalVisible: true,

                            })
                        }
                        this.CheckStatus(this.state.id, this.state.auth, this.state.url)
                    })
                    .catch((error) => {
                        this.props.navigation.navigate('Login')
                    })
            }
        }
    }

    CheckStatus(id, auth, url) {
        APIs.CheckStatus(id, auth, url)
            .then((res) => {
                console.log("Check Out Status", res)
                if (res.status === 'success') {
                    this.setState({
                        status: res.data
                    })
                } else {
                    this.setState({
                        status: null
                    })
                }
            })
    }

    render() {
        // console.log("Data:::", this.state.data)
        console.log("Geofencing:::", this.state.geofencing)
        //  console.log("Radius:::", this.state.radius)
        console.log("Office Coord:::", this.state.officeCoord)
        console.log("Marker Coordinates", this.state.markerCoordinates)
        console.log("Map Cood::", this.state.mapCoord)
        // console.log("User Name", this.state.userName)
        // console.log("Location Latitude", this.state.location)
        // console.log("Url::", this.state.url)
        // console.log("Auth:::", this.state.auth)
        // console.log("id:::", this.state.id)
        console.log("Status:::", this.state.status)
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{
                    backgroundColor: color.light,
                }}>
                    <Left style={styles.headerleft}>
                        <Icon name='ios-arrow-round-back' style={styles.headerleftarrow} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={styles.headerleftTxt}>Check Out</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <Content>
                    {
                        this.state.data === null ? <View style={{ marginTop: 40, flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, color: color.primary }}>Loading...</Text>
                        </View> :
                            <View style={styles.container}>
                                <View style={{ flex: 1, height: height }}>
                                    <MapView
                                        style={styles.mapStyle}
                                        region={this.state.mapCoord}>
                                        {this.state.markerCoordinates.map((marker, index) => (
                                            <Marker key={index} coordinate={marker.coordinate} title={marker.title} >

                                                <View>
                                                    {/* <Text style={{ color: marker.title === "Current Location" ? color.danger : color.primary }}>{marker.title}</Text> */}
                                                    {marker.title === "Current Location" ? <Image style={{ width: 30, height: 30, }} source={require('../../assets/icon/user_marker.png')} /> : <Image style={{ width: 30, height: 30, }} source={require('../../assets/icon/marker.png')} />}
                                                </View>
                                            </Marker>
                                        ))}
                                        {this.state.officeCoord === null ? <View></View> : <Circle
                                            center={this.state.officeCoord}
                                            radius={this.state.radius}
                                            strokeWidth={1}
                                            strokeColor={'#1a66ff'}
                                            fillColor={'rgba(230,238,255,0.5)'}
                                        />}
                                    </MapView>
                                </View>

                                <View style={styles.usercontainer}>
                                    {this.state.userName === null ? <Text style={{ fontSize: 40 }}>...</Text> :
                                        <Text>{`Have a nice day! ${this.state.userName}`}</Text>}
                                    <Clock style={styles.time} navigation={this.props.navigation} checkScreen="checkinout" checkIconChange="checkin" />
                                    <View style={styles.checkincontainer}>

                                        <TouchableOpacity onPress={() => {
                                            this.CheckOut()
                                        }}>
                                            <View style={styles.checkbtncontainer}>
                                                <Image
                                                    source={require('../../assets/icon/checkout.png')}
                                                    style={styles.checkinbtnimg}
                                                />
                                                <Text style={styles.checkinbtntTxt}>Check Out</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <Modal isVisible={this.state.isModalVisible} >
                                    <View style={styles.ModelViewContainer}>
                                        <View style={styles.iconView}>
                                            <Image source={require('../../assets/icon/checkintime.png')} style={styles.dialogIcon} />
                                        </View>
                                        <Text style={[styles.lanTitle, styles.lanTitleMM]}>{this.state.checkMessage}</Text>
                                        <TouchableOpacity style={[styles.ModalTextContainer]}
                                            onPress={() => this.setState({ isModalVisible: false })} >
                                            <View style={styles.CancelOpacityContainer}>
                                                <Text style={styles.modalTextStyle} >
                                                    {'Close'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </Modal>
                            </View>
                    }

                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerleft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerleftarrow: {
        fontSize: offset.o4,
        color: color.primary,
        marginRight: offset.o2,
        marginLeft: offset.o1
    },
    headerleftTxt: {
        color: color.secondary,
        fontFamily: 'Nunito'
    },
    mapStyle: {
        width: width,
        height: height / 3 + 50,
    },
    usercontainer: {
        width: width,
        height: height / 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        bottom: height / 4 - 50,
        padding: 30,
        alignItems: 'center'
    },
    checkincontainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    checkbtncontainer: { borderRadius: 10, width: width / 3, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', },
    checkinbtntTxt: { color: '#fff', marginTop: 5 },
    checkinbtnimg: { width: 30, height: 30 },
    time: {
        ...typo.textSmall,
        width: '100%',
        textAlign: 'center',
        color: color.light,
        marginBottom: offset.o2
    },
    ModelViewContainer: {
        width: width + 30,
        height: 200,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: -30,
        bottom: Platform.OS === 'ios' ? 15 : -20,
    },
    lanTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
    lanTitleMM: {
        fontSize: 14,
        marginTop: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
    ModalTextContainer: {
        backgroundColor: color.primary, height: 50, width: '100%', flex: 1, position: 'absolute', bottom: 0, justifyContent: 'center',
        alignItems: 'center',
    },
    CancelOpacityContainer: {
        width: '100%',
        height: 50,
        //backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTextStyle: { color: '#fff', textAlign: 'center', },
    iconView: {
        width: '100%',
        alignItems: 'center',
    },
    dialogIcon: {
        width: 28,
        height: 28,
        marginBottom: offset.o1,
        marginTop: offset.o2,
    },
    errorBox: {
        padding: 15
    },
    error: {
        backgroundColor: color.light,
        padding: offset.o3,
        display: 'flex',
        alignItems: 'center'
    },
    errorTitle: {
        ...typography.subHeader
    },
    errorTxt: {
        ...typography.placeholder,
        fontSize: 14
    },
    errImg: {
        width: 64,
        height: 64,
        marginBottom: offset.o2
    },
});

export default checkout;

