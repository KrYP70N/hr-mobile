import React, { useState } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Text, View, Icon, Spinner, Picker } from 'native-base'
import { AsyncStorage, Image } from 'react-native'
import styles from './noticeboard.style'
import APIs from '../../controllers/api.controller'
import moment from 'moment'
import offset from '../../constant/offset'
import color from '../../constant/color'


export default function notilist({ navigation }) {

    const [Collection, setCollection] = useState({
        notis: null,
        attachs: null
    })

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

                APIs.getChannel(token.key, endPoint.ApiEndPoint, token.id)
                    .then((res) => {
                        let start = 0
                        let end = res.data.length
                        let items = {
                            notis: [],
                            attachs: []
                        }
                        const provider = (id) => {
                            if(start < end) {
                                APIs.getNotice(token['key'], endPoint['ApiEndPoint'], res.data[id]['Channel ID'], `${moment().format('YYYY')}-${month}-01`, `${moment().format('YYYY')}-${month}-31`)
                                .then((res) => {
                                    let collection = res.data
                                    // returned condition 
                                    if(collection.length !== 0) {
                                        let haveAttachment = JSON.stringify(collection).includes('{"Attachment":')
                                        let haveNoti = JSON.stringify(collection).includes('{"Noti":')
                                        if(haveAttachment) items.attachs = [...items.attachs, ...collection[0]]
                                        if(haveAttachment && haveNoti) items.notis = [...items.notis, ...collection[1]]
                                        if(!haveAttachment && haveNoti) items.notis = [...items.notis, ...collection[0]]
                                    }
                                    if(start === end - 1) {
                                        setCollection(items)
                                    }
                                    start++
                                    provider(start)
                                })
                            }
                        }
                        provider(start)

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

    if(Collection.notis === null) {
        return (
            <View style={styles.loading}>
                <Spinner />
                <Text style={styles.loadingTxt}>Loading data ...</Text>
            </View>
        )
    } else  if (Collection.notis.length === 0 && Collection.attachs.length === 0) {
        return (
            <View>
                { MonthOptions }
                <View style={styles.emptyCard}>
                    <Icon name='ios-information-circle-outline' style={styles.emptyIcn} />
                    <Text style={styles.emptyTxt}>There is no notification.</Text>
                </View>
            </View>
        )
    } else {
        return (
            <React.Fragment>
                { MonthOptions }
                {
                    Collection.notis.map((noti, key) => (
                        <TouchableOpacity
                            style={styles.card}
                            key={key}
                            onPress={() => navigation.navigate('NotiboardDetail', noti['Noti'])}
                        >
                            <View style={styles.imgBox}>
                                <Image style={styles.notiImg} source={require('../../assets/icon/notification-3.png')} />
                            </View>
                            <View style={styles.txtBox}>
                                <Text style={styles.notiTitle}>{noti['Noti']['Subject']}</Text>
                                <Text style={styles.notiBody}>{
                                    noti['Noti']['Body']
                                        .replace(/<\/?[^>]+(>|$)/g, "")
                                        .replace(/\s+/g, ' ').trim()
                                        .slice(0, 100)
                                } {noti['Noti']['Body'].length > 100 && '...'}</Text>
                                <View style={styles.notiFoot}>
                                    <Text style={styles.notiBody}>{noti['Noti']['Date']}</Text>
                                    <Text style={styles.notiBadge}>{noti['Noti']['Channel']}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                {
                    Collection.attachs.map((attach, key) => (
                        <TouchableOpacity
                            style={styles.card}
                            key={key}
                            onPress={() => Linking.openURL(attach['Attachment']['URL'])}
                        >
                            <View style={styles.imgBox}>
                                <Image style={styles.notiImg} source={require('../../assets/icon/notification-3.png')} />
                            </View>
                            <View style={styles.txtBox}>
                                <Text style={styles.notiTitle}>{attach['Attachment']['Name']}</Text>
                                <Text style={styles.notiBody}>{
                                    attach['Attachment']['URL']
                                        .replace(/<\/?[^>]+(>|$)/g, "")
                                        .replace(/\s+/g, ' ').trim()
                                        .slice(0, 100)
                                }</Text>
                                <View style={styles.notiFoot}>
                                    <Text style={styles.notiBody}>{attach['Attachment']['Date']}</Text>
                                    <Text style={[styles.notiBadge, styles.attachBadge]}>File/{attach['Attachment']['Mimetype'].slice(attach['Attachment']['Mimetype'].indexOf('/') + 1, attach['Attachment']['Mimetype'].length)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </React.Fragment>
        )
    }

    
}


// announcement