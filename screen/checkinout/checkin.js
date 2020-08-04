import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Toast } from 'native-base'
import color from '../../constant/color'
import offset from '../../constant/offset'
import typo from '../../constant/typography'
import typography from '../../constant/typography'
import APIs from '../../controllers/api.controller';
import Clock from '../../components/time.component';
import Modal from 'react-native-modal';
import MapView, { Marker, Circle } from 'react-native-maps';
import LOC from '../../components/Location'
import * as geolib from 'geolib';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class checkin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			auth: null,
			id: null,
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
			locationError: null,
		};
	}

	async componentDidMount() {
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

	getProfileData(auth, id, url) {
		APIs.Profile(url, auth, id)
			.then((res) => {
				if (res.status === "success") {
					if (res.error) {
						this.tokenExpiration()
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
									locationError: true
								})
							} else {
								LOC.getAsync().then((result) => {
									if (result.status == 'fail') {
										this.setState({
											locationError: true
										})
									} else {
										console.log("Location Res", result)
										this.setState({
											locationError: false,
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
											location: JSON.stringify(result.location.coords),
											mapCoord: {
												latitude: result.location.coords.latitude,
												longitude: result.location.coords.longitude,
												latitudeDelta: 0.0019,
												longitudeDelta: 0.0018
											},
											markerCoordinates: makerCoordsArr
										})
									}
								})
							}
						})
					}

				} else {
					this.apiFail()
				}
			})
			.catch((error) => {
				this.apiFail()
			})
	}

	tokenExpiration() {
		this.props.navigation.navigate('Login')
		Toast.show({
			text: 'Please login again. Your token is expired!',
			textStyle: {
				textAlign: 'center'
			},
			style: {
				backgroundColor: color.primary
			},
			duration: 6000
		})
	}

	// api data not success situation and show failed toast message
	apiFail() {
		Toast.show({
			text: 'Authentication Failed!',
			textStyle: {
				textAlign: 'center'
			},
			style: {
				backgroundColor: color.primary
			},
			duration: 6000
		})
	}

	async CheckIn() {
		console.log("Loc Error", this.state.locationError)
		if (this.state.locationError == true) { // if there is a location error, user click check in without location
			if (this.state.status.Checkin !== false) {
				this.setState({
					checkMessage: "You're already checked in!",
					isModalVisible: true,

				})
			} else {
				APIs.Checkin(this.state.url, this.state.auth, this.state.id)
					.then((res) => {
						if (res.status === 'success') {
							if (res.error) {
								this.tokenExpiration()
							} else {
								this.setState({
									checkMessage: 'Check In Successful!',
									isModalVisible: true,

								})
							}
						} else {
							this.apiFail()
						}
						this.CheckStatus(this.state.id, this.state.auth, this.state.url)
					})
					.catch((error) => {
						this.apiFail()
					})
			}

		} else {
			LOC.getAsync().then((result) => {
				if (result.status == 'fail') {
					this.setState({
						locationError: true
					})
				} else {
					if (this.state.geofencing) {
						//geo true
						if (
							geolib.isPointWithinRadius(
								this.state.officeCoord,
								{
									latitude: result.location.coords.latitude,
									longitude: result.location.coords.longitude,
								},
								//
								this.state.radius
							)
						) {
							if (this.state.status.Checkin !== false) {
								this.setState({
									checkMessage: "You're already checked in!",
									isModalVisible: true,
								})
							} else {
								// Within Radius"
								APIs.Checkin(this.state.url, this.state.auth, this.state.id, {
									lat: result.location.coords.latitude,
									long: result.location.coords.longitude
								}).then((res) => {
									if (res.status === 'success') {
										if (res.error) {
											this.tokenExpiration()
										} else {
											this.setState({
												checkMessage: 'Check In Successful!',
												isModalVisible: true,
											})
										}
									} else {
										this.setState({
											checkMessage: "Authentication Failed",
											isModalVisible: true,
										})
									}
									this.CheckStatus(this.state.id, this.state.auth, this.state.url)
								})
									.catch((error) => {
										this.apiFail()
									})
							}

						} else {
							//not within radius
							this.setState({
								checkMessage: "You're out of office area!",
								isModalVisible: true,
							})
						}
					} else {
						//geo false
						if (this.state.status.Checkin !== false) {
							this.setState({
								checkMessage: "You're already checked in!",
								isModalVisible: true,
							})
						} else {
							APIs.Checkin(this.state.url, this.state.auth, this.state.id, {
								lat: result.location.coords.latitude,
								long: result.location.coords.longitude
							}).then((res) => {
								if (res.status === 'success') {
									if (res.error) {
										this.tokenExpiration()
									} else {
										this.setState({
											checkMessage: 'Check In Successful!',
											isModalVisible: true,
										})
									}
								} else {
									this.setState({
										checkMessage: "Authentication Failed",
										isModalVisible: true,
									})
								}
								this.CheckStatus(this.state.id, this.state.auth, this.state.url)
							})
								.catch((error) => {
									console.log("Auth Failed")
								})
						}
					}
				}
			})
		}
	}

	CheckStatus(id, auth, url) {
		APIs.CheckStatus(id, auth, url)
			.then((res) => {
				if (res.status === 'success') {
					if (res.error) {
						this.tokenExpiration()
					} else {
						this.setState({
							status: res.data
						})
					}
				} else {
					this.setState({
						status: null
					})
				}
			})
	}

	render() {
		return (
			<Container style={{ flex: 1 }}>
				<Header style={{
					backgroundColor: color.light,
				}}>
					<Left style={styles.headerleft}>
						<Icon name='ios-arrow-round-back' style={styles.headerleftarrow} onPress={() => { this.props.navigation.navigate('Main') }} />
						<Text style={styles.headerleftTxt}>Check In</Text>
					</Left>
					<Right></Right>
				</Header>
				<Content style={{ flex: 1 }}>
					{
						this.state.data == null ? <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}><Text>Fetching Data....</Text></View> :
							<View style={styles.container}>
								{
									this.state.locationError == true ? <View style={{ flex: 1, height: height, backgroundColor: color.light }}>
										<Image source={require('../../assets/images/no_location.jpg')} />
										{/* <Text style={{ fontSize: 16, color: color.primary }}>Your mobile device is not supported to use google geo location service for this application. Please contact HR manager to disable the geo location function !!</Text> */}
									</View> :
										<View style={{ flex: 1, height: height, backgroundColor: color.light }}>
											<MapView
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
										</View>
								}
								<View style={styles.usercontainer}>
									{this.state.userName === null ? <Text style={{ fontSize: 40 }}>...</Text> :
										<Text>{`Have a nice day! ${this.state.userName}`}</Text>}
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
		height: height / 2,
		backgroundColor: '#fff',
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		position: 'absolute',
		bottom: height / 4 - 50,
		padding: 30,
		alignItems: 'center',
		//justifyContent: 'center'
	},
	checkincontainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
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

export default checkin;
