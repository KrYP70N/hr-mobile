import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, SafeAreaView, AsyncStorage, Dimensions } from 'react-native';
import color from '../../constant/color'
import offset from '../../constant/offset'
import ErrorMessage from '../../constant/messagetext'
import typo from '../../constant/typography'
import typography from '../../constant/typography'
import APIs from '../../controllers/api.controller';
import Clock from '../../components/time.component';
import Modal from 'react-native-modal';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as geolib from 'geolib';
import LOC from '../../components/Location'
import BackHeader from '../../components/BackHeader'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
class CheckInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            auth: null,
            id: null,
            data: null,
            locationError: true,
            currentLocation: undefined,
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
                        })
                })
        })
    }

    getProfileData = async (auth, id, url) => {
        console.log("Get Profile")
        APIs.Profile(url, auth, id)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        this.setState({
                            data: res.data,
                            userName: res.data['General Information']['Employee Name'],
                            geofencing: res.data['General Information']['Geo Fencing'],
                            radius: res.data['General Information']['Radius(m)'],
                        })
                        let makerCoordsArr = [];
                        LOC.getAsync().then((result) => {
                            if (result.status == 'fail') {
                                this.setState({
                                    locationError: true,
                                    currentLocation: undefined
                                })
                            } else {
                                console.log("get Location Success")
                                this.setState({
                                    locationError: false,
                                    currentLocation: {
                                        latitude: result.location.coords.latitude,
                                        longitude: result.location.coords.longitude
                                    },
                                    radius: res.data['General Information']['Radius(m)'],
                                    officeCoord: {
                                        latitude: res.data['General Information']['Latitude'],
                                        longitude: res.data['General Information']['Longtitude']
                                    },
                                })
                                let obj = {
                                    title: 'Office Location',
                                    coordinate: {
                                        latitude: res.data['General Information']['Latitude'],
                                        longitude: res.data['General Information']['Longtitude']
                                    }
                                }
                                makerCoordsArr.push(obj);

                                let Cobj = {
                                    title: 'You Are Here',
                                    coordinate: {
                                        latitude: result.location.coords.latitude,
                                        longitude: result.location.coords.longitude
                                    }
                                }
                                makerCoordsArr.push(Cobj);
                                this.setState({
                                    mapCoord: {
                                        latitude: result.location.coords.latitude,
                                        longitude: result.location.coords.longitude,
                                        latitudeDelta: 0.0019,
                                        longitudeDelta: 0.0018
                                    },
                                    markerCoordinates: makerCoordsArr
                                })
                            }
                        }).catch((e) => console.log("Error"))
                    }
                } else {
                    ErrorMessage('serverError', this.props.navigation)
                }
            })
    }

    CheckIn = () => {
        console.log("Click Check In", this.state.id, this.state.auth, this.state.url, this.state.currentLocation)
        APIs.CheckStatus(this.state.id, this.state.auth, this.state.url)
            .then((res) => {
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        if (res.data.Checkin) {
                            this.setState({
                                checkMessage: "You're already checked in!",
                                isModalVisible: true,

                            })
                        } else {
                            if (this.state.locationError == true) {
                                APIs.Checkin(this.state.url, this.state.auth, this.state.id)
                                    .then((res) => {
                                        if (res.status === 'success') {
                                            if (res.error) {
                                                ErrorMessage('token', this.props.navigation)
                                            } else {
                                                this.setState({
                                                    checkMessage: 'Check In Successful!',
                                                    isModalVisible: true,

                                                })
                                            }
                                        }
                                    })
                            } else {
                                if (this.state.geofencing && this.state.currentLocation != undefined) {
                                    //geo true
                                    if (
                                        geolib.isPointWithinRadius(
                                            this.state.officeCoord,
                                            this.state.currentLocation,
                                            this.state.radius
                                        )
                                    ) { // Within Radius"
                                        APIs.Checkin(this.state.url, this.state.auth, this.state.id, this.state.currentLocation)//this.state.currentLocation
                                            .then((res) => {
                                                if (res.status === 'success') {
                                                    if (res.error) {
                                                        ErrorMessage('token', this.props.navigation)
                                                    } else {
                                                        this.setState({
                                                            checkMessage: 'Check In Successful!',
                                                            isModalVisible: true,
                                                        })
                                                    }
                                                }
                                            })
                                    } else {
                                        //not within radius
                                        this.setState({
                                            checkMessage: "You're out of office area!",
                                            isModalVisible: true,
                                        })
                                    }
                                } else {
                                    APIs.Checkin(this.state.url, this.state.auth, this.state.id)// this.state.currentLocation
                                    .then((res) => {
                                        if (res.status === 'success') {
                                            if (res.error) {
                                               ErrorMessage('token', this.props.navigation)
                                            } else {
                                                this.setState({
                                                    checkMessage: 'Check In Successful!',
                                                    isModalVisible: true,
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            })
    }

    render() {
       // console.log("Current", this.state.currentLocation)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <BackHeader name="Check In" navigation={this.props.navigation} parent="Main" />
                <View style={{
                    flex: 1,
                    height: height,
                    backgroundColor: color.light
                }}>
                    {
                        this.state.locationError == true ?
                            <Image source={require('../../assets/images/no_location.jpg')} />
                            : <MapView
                                region={this.state.mapCoord}
                                style={styles.mapStyle}
                                initialRegion={this.state.mapCoord}>
                                {this.state.markerCoordinates.map((marker, index) => (
                                    <Marker key={index} coordinate={marker.coordinate} title={marker.title} >
                                        <View>
                                            {marker.title === "You Are Here" ? <Image style={{ width: 35, height: 35, }} source={require('../../assets/icon/map_person.png')} /> : <Image style={{ width: 35, height: 35, }} source={require('../../assets/icon/marker.png')} />}
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
                    }

                    <View style={styles.usercontainer}>
                        <Text style={{ fontFamily: 'Nunito', marginTop: 20 }}>{`Have a nice day! ${this.state.userName}`}</Text>
                        <Clock style={styles.time} navigation={this.props.navigation} checkScreen="checkinout" checkIconChange="checkin" />
                        <View style={styles.checkincontainer}>
                            <TouchableOpacity onPress={() => {
                                this.CheckIn()
                            }}>
                                <View style={styles.checkbtncontainer}>
                                    <Image
                                        source={require('../../assets/icon/checkin.png')}
                                        style={styles.checkinbtnimg}
                                    />
                                    <Text style={styles.checkinbtntTxt}>Check In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //position: 'relative'
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
        height: height / 2 + 40,
        backgroundColor: color.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        bottom: 0,
        //bottom: height / 4 - 50,
        padding: 30,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    checkincontainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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


export default CheckInScreen;
