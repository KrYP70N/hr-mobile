import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, SafeAreaView, AsyncStorage, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
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
import { Camera } from 'expo-camera';
import * as FileSystem from "expo-file-system";
import LOC from '../../components/Location'
import BackHeader from '../../components/BackHeader'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
class CheckOutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            auth: null,
            id: null,
            data: null,
            locationError: null,
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
            loading: true,
            //taking photo
            showCameraIcon: true,
            showUserPhoto: false,
            showCameraView: false,
            permission: null,
            type: Camera.Constants.Type.front,
            user_image: null,
            showPreviewImage: false,
            user_preview_img: null,
            image_binary: null

        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                url: null,
                auth: null,
                id: null,
                data: null,
                locationError: null,
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
                loading: true,
                //taking Photo
                showCameraIcon: true,
                showUserPhoto: false,
                showCameraView: false,
                permission: null,
                type: Camera.Constants.Type.front,
                user_image: null,
                showPreviewImage: false,
                user_preview_img: null,
                image_binary: null
            })

            console.log("Re Run the Check In Page")
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

    componentWillUnmount() {
        this.state = {
            url: null,
            auth: null,
            id: null,
            data: null,
            locationError: null,
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
            loading: true,
            //taking photo
            showCameraIcon: true,
            showUserPhoto: false,
            showCameraView: false,
            permission: null,
            type: Camera.Constants.Type.front,
            user_image: null,
            showPreviewImage: false,
            user_preview_img: null,
            image_binary: null,

        };

    }



    getProfileData = async (auth, id, url) => {
        // console.log("Get Profile")
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
                                    loading: false,
                                    currentLocation: undefined
                                })
                            } else {
                                // console.log("get Location Success")
                                this.setState({
                                    locationError: false,
                                    loading: false,
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
                        }).catch((e) => this.setState({
                            locationError: true,
                            loading: false
                        }))
                    }
                } else {
                    ErrorMessage('serverError', this.props.navigation)
                }
            })
    }


    clickCamera = async () => {
        console.log("Click Camera")
        const { status } = await Camera.requestPermissionsAsync();
        console.log("Status", status);
        this.setState({
            showCameraView: true,
            showCameraIcon: false,
        })

    }
    // const encodedBase64 = 'R0lGODlhAQABAIAAAAAA...7';
    // <Image source={{uri: `data:image/gif;base64,${encodedBase64}`}} />

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true
            });
          //  console.log("Photo Uri", photo)
           // console.log("Photo Base 64", photo.base64)

            this.setState({
                showPreviewImage: true,
                showCameraIcon: false,
                user_preview_img: photo
            })
        }

    }

    CheckOut = async () => {
      //console.log("User Image", this.state.user_image)
      console.log("User Image", this.state.id, this.state.auth, this.state.url, this.state.currentLocation)
     
        APIs.CheckStatus(this.state.id, this.state.auth, this.state.url)
            .then((res) => {
                //  console.log("Check Res", res)
                if (res.status === 'success') {
                    if (res.error) {
                        ErrorMessage('token', this.props.navigation)
                    } else {
                        //  console.log("Check Status", res.data.Checkout)
                        if (res.data.Checkout) {
                            this.setState({
                                user_image: null,
                                checkMessage: "You're already checked out!",
                                isModalVisible: true,

                            })
                        } else {
                            if (this.state.locationError == true) {
                                APIs.Checkout(this.state.url, this.state.auth, this.state.id, this.state.user_image.base64)
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
                                if (this.state.geofencing) {
                                    //geo true
                                    if (
                                        geolib.isPointWithinRadius(
                                            this.state.officeCoord,
                                            this.state.currentLocation,
                                            this.state.radius
                                        )
                                    ) { // Within Radius"
                                        APIs.Checkout(this.state.url, this.state.auth, this.state.id, this.state.currentLocation, this.state.user_image.base64)//this.state.currentLocation
                                            .then((res) => {
                                                if (res.status === 'success') {
                                                    if (res.error) {
                                                        ErrorMessage('token', this.props.navigation)
                                                    } else {
                                                        this.setState({
                                                            checkMessage: 'Check Out Successful!',
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
                                    APIs.Checkout(this.state.url, this.state.auth, this.state.id, this.state.currentLocation, this.state.user_image.base64)// this.state.currentLocation
                                        .then((res) => {
                                            if (res.status === 'success') {
                                                if (res.error) {
                                                    ErrorMessage('token', this.props.navigation)
                                                } else {
                                                    this.setState({
                                                        checkMessage: 'Check Out Successful!',
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
                {
                    (this.state.showPreviewImage) ? <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: color.indicator }}>
                        <ImageBackground resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: this.state.user_preview_img.uri }}>  
                        {/* `data:image/jpg;base64,${this.state.user_preview_img}` */}
                            <View style={{ width: '100%', position: 'absolute', bottom: width / 14, justifyContent: 'space-between', flexDirection: 'row', padding: 20 }}>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        showPreviewImage: false,
                                        showCameraView: true
                                    })
                                }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color.light, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ tintColor: color.primary, width: 20, height: 20, }} source={require('../../assets/icon/delete.png')} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        showPreviewImage: false,
                                        showCameraView: false,
                                        showUserPhoto: true,
                                        showCameraIcon: true,
                                        user_image: this.state.user_preview_img
                                    })
                                }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color.light, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ tintColor: color.primary, width: 20, height: 20, }} source={require('../../assets/icon/correct.png')} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </ImageBackground>
                        {/* <Image style={{flex: 1, width: width, height: height-60 }} source={{ uri: this.state.user_preview_img }} /> */}
                    </View> :
                        // camera view
                        (this.state.showCameraView) ? <View style={{ flex: 1, width: width, height: height }}>
                            <Camera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={{ flex: 1, width: width, height: height }}
                                type={this.state.type}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        alignItems: 'center'
                                    }}>
                                    <TouchableOpacity
                                        style={{ position: 'absolute', bottom: 0, marginBottom: 10, flexDirection: 'row' }}
                                        onPress={() => {
                                            this.snap()
                                        }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: '#fff' }}></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 30, height: 30, position: 'absolute', right: 0, bottom: 0, marginBottom: 25, marginRight: 50 }} onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front
                                        })
                                    }}>
                                        <Image style={{ tintColor: color.light, width: 30, height: 30 }} source={require('../../assets/icon/back_camera.png')} />
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        </View> :
                            <View style={{
                                flex: 1,
                                height: height,
                                backgroundColor: color.light
                            }}>
                                {
                                    this.state.locationError == null ?
                                        <View style={{ backgroundColor: color.tertiary, width: '100%', height: width / 2 + 50, justifyContent: 'center', alignItems: 'center' }}>
                                            <ActivityIndicator animating={this.state.loading} color={color.light} size="large" />
                                            <Text style={{ color: color.light, fontSize: 16, fontWeight: 'bold' }}>Getting Your Current Location...</Text>
                                        </View> :
                                        this.state.locationError == true ?
                                            <Image resizeMode='cover' style={{width: width}}  source={require('../../assets/images/no_location.jpg')} />
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
                                    {this.state.user_image != null && <View style={{ shadowColor: color.primary, shadowRadius: 20, elevation: 10, width: 105, height: 105, borderRadius: 105 / 2, backgroundColor: color.light, position: 'absolute', top: -55, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ width: 100, height: 100, borderRadius: 50 }}  source={{uri: this.state.user_image.uri}} />
                                    </View>}
                                    <Text style={{ fontFamily: 'Nunito', marginTop: this.state.user_image != null ? 35 : 20 }}>{`Have a nice day! ${this.state.userName}`}</Text>
                                    <Clock style={styles.time} navigation={this.props.navigation} checkScreen="checkinout" checkIconChange="checkout" />
                                    {!this.state.loading && <View style={styles.checkincontainer}>
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
                                    </View>}
                                </View>
                            </View>
                }

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

                {(!this.state.loading && !this.state.showCameraView) && <TouchableOpacity style={{
                    position: 'absolute', bottom: 0, marginBottom: 10, right: 0, marginRight: 15, width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 10,
                    // shadowColor: color.placeHolder, shadowRadius: 5, shadowOpacity: 0.5, elevation: 3
                    shadowColor: color.placeHolder,
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 24,
                }} onPress={() => { this.clickCamera() }}>

                    <Image style={{ tintColor: color.light, width: 30, height: 30 }} source={require('../../assets/icon/camera.png')} />

                </TouchableOpacity>}
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


export default CheckOutScreen;