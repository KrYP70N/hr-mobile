import React, { useState } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import { Text, View, Icon, Col } from 'native-base'
import { AsyncStorage, Image } from 'react-native'
import styles from './noticeboard.style'
import APIs from '../../controllers/api.controller'


export default function notilist({ navigation }) {

    const [Collection, setCollection] = useState({
        notis: [],
        attachs: []
    })

    const loader = () => {

        if (Collection.notis.length === 0 && Collection.attachs.length === 0) {

            let token = AsyncStorage.getItem('@hr:token')
                .then(res => JSON.parse(res))

            let endPoint = AsyncStorage.getItem('@hr:endPoint')
                .then(res => JSON.parse(res))


            Promise.all([token, endPoint])
                .then((res) => {
                    let token = res[0]
                    let endPoint = res[1]

                    // collecting data
                    APIs.getChannel(token.key, endPoint.ApiEndPoint, token.id)
                        .then((res) => {
                            const channels = res.data
                            channels.map((channel, i) => {
                                APIs.getNotice(token.key, endPoint.ApiEndPoint, channel['Channel ID'])
                                    .then((res) => {
                                        if (res.data.length !== 0) {
                                            let dataStr = JSON.stringify(res.data)
                                            let haveAttachment = dataStr.includes('{"Attachment":{')
                                            let haveNoti = dataStr.includes('{"Noti"')

                                            let item = {}

                                            if (haveAttachment) item.attachs = res.data[0]
                                            if (haveNoti && haveAttachment) item.notis = res.data[1]
                                            if (haveNoti && !haveAttachment) item.notis = res.data[0]

                                            setCollection({
                                                notis: [...Collection.notis, ...item.notis],
                                                attachs: [...Collection.attachs, ...item.attachs]
                                            })
                                        }
                                    })
                            })

                        })

                })
        }
    }

    navigation.addListener('focus', () => {
        loader()
    })

    console.log(Collection.attachs)


    if (Collection.notis.length === 0 && Collection.attachs.length === 0) {
        return (
            <View style={styles.emptyCard}>
                <Icon name='ios-information-circle-outline' style={styles.emptyIcn} />
                <Text style={styles.emptyTxt}>There is no new notification.</Text>
            </View>
        )
    }

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
