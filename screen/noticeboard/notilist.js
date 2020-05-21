import React, { useState } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Text, View, Icon, Spinner, Picker } from 'native-base'
import { AsyncStorage, Image } from 'react-native'
import styles from './noticeboard.style'
import APIs from '../../controllers/api.controller'
import moment from 'moment'
import offset from '../../constant/offset'
import color from '../../constant/color'
import Loading from '../../components/loading.component'

export default function notilist({ navigation }) {

    const [Collection, setCollection] = useState([])

    const [month, setmonth] = useState(moment().format('MM'))
    const loader = (month) => {
        console.log("Month", month)
        let token = AsyncStorage.getItem('@hr:token')
            .then(res => JSON.parse(res))
        let endPoint = AsyncStorage.getItem('@hr:endPoint')
            .then(res => JSON.parse(res))
        Promise.all([token, endPoint])
            .then((res) => {
                //console.log("RES", res)
                let token = res[0]
                let endPoint = res[1]
                console.log("Auth", token['key'])
                console.log("URL", endPoint['ApiEndPoint'])
                console.log("ID", token['id'])
                let date = new Date()
                let last_day = moment(`"${date.getFullYear()}-${month}"`, "YYYY-MM").daysInMonth();
                console.log("Start Date", `${moment().format('YYYY')}-${month}-01`)
                console.log("End Date", `${moment().format('YYYY')}-${month}-${last_day}`)

                APIs.getAnnouncement(token['key'], endPoint['ApiEndPoint'], token['id'], `${moment().format('YYYY')}-${month}-01`, `${moment().format('YYYY')}-${month}-${last_day}`)
                    .then((res) => {
                        console.log("res", res)
                        console.log("res.data", res.data)
                        if(res.status === 'success'){
                            if (res.data !== null) {
                                setCollection(res.data)
                            }
                        }else{
                            console.log("Error", res.error)
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
    console.log("Collection Data", Collection)
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
                    Collection.map((data, key) => (
                        <TouchableOpacity onPress = {() => {navigation.navigate('NotiboardDetail', {Subject: data.Title, Date: data['Date Start'], Body: data['Body'] })}}>
                        <View key = {key} style={{ marginTop: 20, borderWidth: 0.5, borderRadius: 5, borderColor: color.placeHolder, backgroundColor: color.light, paddingLeft: 10, flexDirection: 'row', paddingRight: 10, paddingBottom: 15, paddingTop: 15 }}>
                            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                <View style={{ width: 40, height: 40, borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                                    <Image style={{ width: 22, height: 22 }} source={require('../../assets/icon/announcement.png')} />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', width: '85%', flexDirection: 'row' }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontSize: 18, fontFamily: 'Nunito-Bold' }}>{`${data.Title}`}</Text>
                                    <Text style={{ marginTop: 5, fontSize: 16, fontFamily: 'Nunito', color: "#656565" }}>{`Date - ${data["Date Start"]}`}</Text>
                                </View>

                                <TouchableOpacity onPress={() => Linking.openURL(data['Url Link'])}>
                                    <Image style={{ width: 22, height: 22 }} source={require('../../assets/icon/attachment.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>
                        </TouchableOpacity>
                    ))

                }

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