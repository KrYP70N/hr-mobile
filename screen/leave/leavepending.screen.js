import React, { Component } from 'react'
import { Text, View, SafeAreaView, Dimensions, AsyncStorage, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Content, Container, Toast, Icon, Card, CardItem, Body, Button, } from 'native-base'
import offset from '../../constant/offset'
import color from '../../constant/color'
import ErrorMessage from '../../constant/messagetext'
import APIs from '../../controllers/api.controller'
import styLeave from './leave.style'
import Modal from 'react-native-modal';
import BackHeader from '../../components/BackHeader'
const width = Dimensions.get('screen').width;

export class EmployeeLeavePending extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: null,
			auth: null,
			id: null,
			leaves: [],
			isModalVisible: false,
			checkMessage: '',
			changeIconStatus: '',
		}
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
								id: JSON.parse(res).id
							})
							this.getApproveData(auth, id, url);

						})
				})
		})
	}

	cancelOT = (cid) => {
		APIs.leaveStatusUpdate(this.state.url, this.state.auth, cid, 'cancel')
			.then((res) => {
				if (res.status === 'success') {
					this.getApproveData(this.state.auth, this.state.id, this.state.url)
					this.setState({
						checkMessage: 'Cancellation Successful!',
						changeIconStatus: 'success',
						isModalVisible: true,

					})
				} else {
					this.setState({
						checkMessage: "Cancellation Failed!",
						changeIconStatus: 'fail',
						isModalVisible: true,

					})
				}
			})
	}

	getApproveData(auth, id, url) {
		console.log("Auth", auth)
		console.log("Id", id)
		console.log("Url", url)
		APIs.getLeavePendingLists(auth, url, id)
			.then((res) => {
				console.log("Leave Pending List", res)
				if (res.status === 'success') {
					if(res.error){
						ErrorMessage('token', this.props.navigation)
					}else{
						this.setState({
							leaves: res.data
						})
					}
					
				} else {
					//ErrorMessage('serverError', this.props.navigation)
					this.setState({
						leaves: []
					})
				}
			})
	}

	render() {
		let GetLeave = this.state.leaves.map((leave, key) => {
			return (
					<View key = {key} style={{
						backgroundColor: 'white',
						borderRadius: 5,
						borderWidth: 0.3,
						borderColor: color.cardBorder,
						padding: 20,
						marginTop: 10,
						marginLeft: 10,
						marginRight: 10,
						marginBottom: 5
					}}>
					<View style={styLeave.cardTitleContainer}>
						<Text style={styLeave.cardTitle}>{leave['Leave Type']}</Text>
					</View>
					<Text style={styLeave.cardXSText}>{leave['date_from']} to {leave['date_to']}</Text>
					<Text style={styLeave.cardSText}>Reason : {leave['Reason']}</Text>
					<Text style={styLeave.cardWarning}>Your request is pending</Text>
					<Button
						style={styLeave.ButtonSecondary}
						onPress={() => {
							this.cancelOT(leave['Obj id'])
						}}
					>
						<Text style={{ fontFamily: 'Nunito', fontSize: 14 }}>Cancel Request</Text>
					</Button>
					</View>
				
			)
		})
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Container>
					<BackHeader name="Pending Approval" navigation={this.props.navigation} parent="Leave" />
					<View style={{ flex: 1, backgroundColor: color.lighter }}>
						<View style={{ padding: 5 }}>
							{GetLeave}
						</View>

						<View style={{
							display: this.state.leaves.length === 0 ? 'flex' : 'none',
							alignItems: 'center'
						}}>
							<Icon name='ios-information-circle-outline' style={{
								color: color.placeHolder,
								fontSize: 40
							}} />
							<Text style={{
								fontFamily: 'Nunito',
								color: color.placeHolder
							}}>There is no pending leave request!</Text>
						</View>

						<Modal isVisible={this.state.isModalVisible} >
							<View style={styles.ModelViewContainer}>
								<View style={styles.iconView}>
									{this.state.changeIconStatus === "success" ? <Image source={require('../../assets/icon/success_icon.png')} style={styles.dialogIcon} /> : <Image source={require('../../assets/icon/fail_icon.png')} style={styles.dialogIcon} />}
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
				</Container>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
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
		fontFamily: 'Nunito',
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
export default EmployeeLeavePending
