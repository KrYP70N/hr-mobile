import React, { Component } from 'react'
import { Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import { View, Text, Container, Content, Card, CardItem, Body, Row, Col, Item, Icon, Header, Left, Right, Toast } from 'native-base'

import offset from '../../constant/offset'
import color from '../../constant/color';
import Clock from '../../components/time.component';
import typo from '../../constant/typography';
import typography from '../../constant/typography';
import APIs from '../../controllers/api.controller';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';

import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import * as geolib from 'geolib';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export class CheckOut extends Component {
    constructor(props) {
        super(props)
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
            currentLatLong: {
                latitude: 16.8296448,
                longitude: 96.16424959999999,
            },
            mapCoord: null,
            mapMarkerCoord: null,
            userName: null,
        }

        // checkout control
        this.CheckOut = () => {
            const fun = () => {
                if (this.state.geofencing) {
                    // geo true
                    APIs.Checkout(this.state.url, this.state.auth, this.state.id, {
                        lat: this.state.location['latitude'],
                        long: this.state.location['longitude']
                    }).then((res) => {
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

                        this.CheckStatus()
                    })
                        .catch((error) => {
                            this.props.navigation.navigate('Login')
                        })
                } else {
                    // geo false
                    APIs.Checkout(this.state.url, this.state.auth, this.state.id)
                        .then((res) => {
                            if (res.status === 'success') {
                                this.setState({
                                    checkMessage: 'Check Out Successful!',
                                    isModalVisible: true,
                                })

                            } else {
                                this.setState({
                                    checkMessage: "You're Already Check Out!",
                                    isModalVisible: true,

                                })

                            }
                            this.CheckStatus()
                        })
                        .catch((error) => {
                            this.props.navigation.navigate('Login')
                        })
                }
            }
            if (this.state.status.Multiple_checkinout === true) {
                fun()
            } else {
                if (this.state.status.Checkout !== true) {
                    fun()
                } else {
                    this.setState({
                        checkMessage: "You're already checked out!",
                        isModalVisible: true,

                    })
                }
            }
        }

        // check status 
        this.CheckStatus = () => {
            APIs.CheckStatus(this.state.id, this.state.auth, this.state.url)
                .then((res) => {
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
    }

    async componentDidMount() {

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                locError: true
            });
        } else {
            let { status } = await Permissions.askAsync(Permissions.LOCATION)
            if (status !== 'granted') {
                this.setState({
                    locError: true
                })
            } else {
                let location = await Location.getCurrentPositionAsync({})
                console.log('Current Position Location', location.coords);
                this.setState({
                    location: location.coords,
                    mapCoord: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0921,
                    },
                    mapMarkerCoord: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                })
            }
        }

        AsyncStorage.getItem('@hr:endPoint')
            .then((res) => {
                this.setState({
                    url: JSON.parse(res)['ApiEndPoint']
                })
            })

        AsyncStorage.getItem('@hr:token')
            .then((res) => {
                let data = JSON.parse(res)
                this.setState({
                    auth: data['key'],
                    id: data['id'],
                })
            })

    }

    async componentDidUpdate() {

        if (this.state.url !== null && this.state.auth !== null && this.state.id !== null && this.state.data === null) {
            APIs.Profile(this.state.url, this.state.auth, this.state.id)
                .then((res) => {
                    console.log("User Profile Data", res.data)
                    this.setState({
                        data: res.data,
                        geofencing: res.data['General Information']['Geo Fencing'],
                        // geofencing: false,
                        radius: res.data['General Information']['Radius(m)'],
                        officeCoord: {
                            latitude: res.data['General Information']['Latitude'],
                            longitude: res.data['General Information']['Longtitude']
                        },
                        userName: res.data['General Information']['Employee Name']
                    })
                })
                .catch((error) => {
                    this.props.navigation.navigate('Login')
                })

            if (this.state.status === null) {
                this.CheckStatus()
            }

        }

        if (this.state.location !== null && this.state.geofencing === true) {
            setTimeout(async () => {
                let location = await Location.getCurrentPositionAsync({})

                if (
                    geolib.isPointWithinRadius(
                        this.state.officeCoord,
                        // this.state.officeCoord,
                        {
                            latitude: this.state.location['latitude'],
                            longitude: this.state.location['longitude'],
                        },
                        this.state.radius
                    )
                ) {
                    this.setState({
                        withinRadius: true
                    })
                } else {
                    this.setState({
                        withinRadius: false
                    })
                }

            }, 2000)
        }
    }

    render() {
        console.log(this.props.navigation);
        console.log("Current Location", this.state.location);
        console.log("Current Map Location", this.state.mapCoord)
        return (

            <Container style={{ flex: 1 }}>
                <Header style={{
                    backgroundColor: color.light,
                    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                }}>
                    <Left style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='ios-arrow-round-back' style={{
                            fontSize: offset.o4,
                            color: color.primary,
                            marginRight: offset.o2
                        }} onPress={() => { this.props.navigation.navigate('Main') }} />
                        <Text style={{
                            color: color.secondary,
                            fontFamily: 'Nunito'
                        }}>Check Out</Text>
                    </Left>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <View style = {{flex: 1, height: height}}>
                        {this.state.location === null ? <Text>...</Text> :
                            <MapView
                            style={styles.mapStyle}
                            initialRegion={this.state.mapCoord}
                        >
                            <Marker coordinate={this.state.mapMarkerCoord}>
                                <View>
                                    <Image style={{ width: 40, height: 40 }} source={require('../../assets/icon/marker.png')} />
                                </View>
                            </Marker>
                        </MapView>
                        }
                        </View>
                        
                        <View style={{
                            width: width,
                            height: height/2 ,
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            position: 'absolute',
                            bottom: height/4 - 50,
                            //bottom: 150,
                            //top: 400,
                            padding: 30,
                            alignItems: 'center'
                        }}>
                            {this.state.userName === null ? <Text style = {{fontSize: 40}}>...</Text> : 
                            <Text>{`Have a nice day! ${this.state.userName}`}</Text>}
                            <Clock style={styles.time} navigation={this.props.navigation} checkScreen="checkinout" />
                            {/* <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 60,
                                borderRadius: 25,
                                backgroundColor: color.lighter,
                                marginTop: 15,
                            }}>
                                <Image style={{
                                    width: 20,
                                    height: 20,
                                }} source={require('../../assets/icon/checktime.png')} />
                                <Text style={{
                                    marginLeft: 10,

                                }}>OfficeShift (09:00 AM-06:00 PM)</Text>
                            </View> */}
                            <View style={{
                                //flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 40,
                                //height: 60,
                            }}>
                                 <TouchableOpacity onPress={() => {
                                    
                                    this.CheckOut()
                                }}>
                                    <View style={{ borderRadius: 10, shadowColor: color.placeHolder, width: width/3, height: 70, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', shadowRadius: 10, shadowOpacity: 0.6, elevation: 3 }}>
                                        <Image
                                            source={require('../../assets/icon/checkout.png')}
                                            style={{ width: 30, height: 30 }}
                                        />
                                        <Text style={{ color: '#fff', marginTop: 5 }}>Check Out</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Modal isVisible={this.state.isModalVisible} >
                            <View style={styles.ModelViewContainer}>
                                <View style={styles.iconView}>
                                    <Image source={require('../../assets/icon/checktime.png')} style={styles.dialogIcon} />
                                </View>
                                <Text style={[styles.lanTitle, styles.lanTitleMM]}>{this.state.checkMessage}</Text>
                                <View style={styles.ModalTextContainer}>
                                    <TouchableOpacity style={styles.CancelOpacityContainer}
                                        onPress={() => this.setState({ isModalVisible: false })} >
                                        <Text style={styles.modalTextStyle} >
                                            {'Close'}
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </Modal>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapStyle: {
        width: width,
        height: height/3 + 50,
    },
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
    ModalTextContainer: { width: '100%', flex: 1, position: 'absolute', bottom: 0 },
    CancelOpacityContainer: {
        width: '100%',
        height: 50,
        backgroundColor: color.primary,
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
    }
});
export default CheckOut
