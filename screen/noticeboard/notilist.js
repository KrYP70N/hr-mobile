import React, { useState } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Text, View, Icon, Spinner, Picker, Toast } from 'native-base'
import { AsyncStorage, Image } from 'react-native'
import styles from './noticeboard.style'
import APIs from '../../controllers/api.controller'
import moment from 'moment'
import ErrorMessage from '../../constant/messagetext'
import color from '../../constant/color'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function notilist({ navigation }) {
    const [Collection, setCollection] = useState([])
    const [month, setmonth] = useState(moment().format('MM'))
    const loader = (month) => {
        let token = AsyncStorage.getItem('@hr:token')
            .then(res => JSON.parse(res))
        let endPoint = AsyncStorage.getItem('@hr:endPoint')
            .then(res => JSON.parse(res))
        Promise.all([token, endPoint])
            .then((res) => {
                let token = res[0]
                let endPoint = res[1]
                let date = new Date()
                let last_day = moment(`"${date.getFullYear()}-${month}"`, "YYYY-MM").daysInMonth();

                APIs.getAnnouncement(token['key'], endPoint['ApiEndPoint'], token['id'], `${moment().format('YYYY')}-${month}-01`, `${moment().format('YYYY')}-${month}-${last_day}`)
                    .then((res) => {
                        if (res.status === 'success') {
                            if (res.error) {
                               ErrorMessage('token', navigation)
                            } else {
                                if (res.data !== null) {
                                    setCollection(res.data)
                                }
                            }
                        } else {
                           // ErrorMessage('serverError', navigation)
                        }

                    })

            })
    }

    navigation.addListener('focus', () => {
        setmonth(moment().format('MM'))
        loader(moment().format('MM'))
    })

    const filter = (data) => {
        setmonth(data)
        loader(data)
    }

    const MonthOptions = (
        <View style={styles.optionBox}>
            <Picker
                note
                mode="dialog"
                selectedValue={month}
                iosIcon={<Icon name="ios-arrow-down" />}
                onValueChange={(data) => filter(data)}
            >
                <Picker.Item label="January" value="01" />
                <Picker.Item label="February" value="02" />
                <Picker.Item label="March" value="03" />
                <Picker.Item label="April" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="June" value="06" />
                <Picker.Item label="July" value="07" />
                <Picker.Item label="August" value="08" />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
            </Picker>
        </View>
    )
    if (Collection === null) {
        return (
            <View style={styles.loading}>
                <Spinner />
                <Text style={styles.loadingTxt}>Loading data ...</Text>
            </View>
        )
    }


    return (

        <React.Fragment>
            {MonthOptions}

            {
                Collection.map((data, index) => (
                    <TouchableOpacity key={index} onPress={() => { navigation.navigate('NotiboardDetail', { Subject: data.Title, Date: data['Date Start'], Body: data['Body'] }) }}>
                        <View key={index} style={{ marginTop: 20, borderWidth: 0.3, borderRadius: 5, borderColor: color.cardBorder, backgroundColor: color.light, padding: 10, flexDirection: 'row', }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 40, height: 40, borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: color.lighter }}>
                                    <Image style={{ width: 22, height: 22, tintColor: color.primary }} source={require('../../assets/icon/noticebo.png')} />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Nunito-Bold' }}>{`${data.Title}`}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ marginTop: 5, fontSize: 14, fontFamily: 'Nunito', color: "#656565" }}>{`Date - ${data["Date Start"]}`}</Text>
                                    {
                                        data['Url Link'] == null ? <View></View> :
                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => Linking.openURL(data['Url Link'])}>
                                                <Image style={{ width: 22, height: 22 }} source={require('../../assets/icon/attachment.png')} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))

            }
            <View style={{
                marginTop: 25,
                display: Collection.length === 0 ? 'flex' : 'none',
                alignItems: 'center'
            }}>
                <Icon name='ios-information-circle-outline' style={{
                    color: color.placeHolder,
                    fontSize: 40
                }} />
                <Text style={{
                    fontFamily: 'Nunito',
                    color: color.placeHolder
                }}>There is no announcement!</Text>
            </View>

            {/* <View style={{ marginTop: 20, borderWidth: 0.5, borderRadius: 5, borderColor: color.placeHolder, backgroundColor: color.light, paddingLeft: 10, flexDirection: 'row', paddingRight: 10, paddingBottom: 15, paddingTop: 15 }}>
                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{ width: 40, height: 40, borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                        <Image style={{ width: 22, height: 22 }} source={require('../../assets/icon/announcement.png')} />
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', width: '85%', flexDirection: 'row' }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Nunito-Bold' }}>{`Announcement`}</Text>
                        <Text style={{ marginTop: 5, fontSize: 16, fontFamily: 'Nunito', color: "#656565" }}>{`Date - 2020-05-20`}</Text>
                    </View>

                    <TouchableOpacity>
                        <Image style={{ width: 22, height: 22 }} source={require('../../assets/icon/attachment.png')} />
                    </TouchableOpacity>

                </View>
            </View> */}
        </React.Fragment>
    )




}


// announcement