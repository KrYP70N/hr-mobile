import React, { useState } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Text, View, Icon } from 'native-base'
import { AsyncStorage, Image } from 'react-native'
import Loading from '../../components/loading.component'
import styles from './noticeboard.style'
import APIs from '../../controllers/api.controller'
import moment from 'moment'


export default function notilist({ navigation }) {

    const [Collection, setCollection] = useState({
        notis: null,
        attachs: null
    })

    const date = {
        from: moment().format('YYYY-MM').concat('-01'),
        to: moment().format('YYYY-MM-DD')
    }

    const loader = () => {
        let token = AsyncStorage.getItem('@hr:token')
            .then(res => JSON.parse(res))
        let endPoint = AsyncStorage.getItem('@hr:endPoint')
            .then(res => JSON.parse(res))
        Promise.all([token, endPoint])
            .then((res) => {
                let token = res[0]
                let endPoint = res[1]

                console.log(token, endPoint)
                // collecting data
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
                                APIs.getNotice(token['key'], endPoint['ApiEndPoint'], res.data[id]['Channel ID'], date.from, date.to)
                                .then((res) => {
                                    let collection = res.data
                                    // returned condition 
                                    if(collection.length !== 0) {
                                        let haveAttachment = JSON.stringify(collection).includes('{"Attachment":')
                                        let haveNoti = JSON.stringify(collection).includes('{"Noti":')
                                        console.log(haveAttachment, haveNoti)
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
        loader()
    })

    if(Collection.notis === null) {
        console.log('loading ...')
        return (
            <Text>loading ...</Text>
        )
    } else  if (Collection.notis.length === 0 && Collection.attachs.length === 0) {
        console.log('empty')
        return (
            <View style={styles.emptyCard}>
                <Icon name='ios-information-circle-outline' style={styles.emptyIcn} />
                <Text style={styles.emptyTxt}>There is no new notification.</Text>
            </View>
        )
    } else {
        return (
            <React.Fragment>
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
