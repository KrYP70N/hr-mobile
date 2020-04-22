import React, { useState } from 'react'
import { View, Text } from 'native-base'
import styles from './noticeboard.style'
import { Image, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import APIs from '../../controllers/api.controller'
import Loading from '../../components/loading.component'

export default function NotiList({ navigation }) {
    const [token, setToken] = useState("")
    const [endPoint, setEndPoint] = useState("")
    const [channel, setChannel] = useState("")
    const [emptyNoti, setemptyNoti] = useState(false)
    const [notilist, setnotilist] = useState([])

    if (token === "") {
        AsyncStorage.getItem('@hr:token')
            .then((res) => setToken(JSON.parse(res)))
    }

    if (endPoint === "") {
        AsyncStorage.getItem('@hr:endPoint')
            .then((res) => setEndPoint(JSON.parse(res)))
    }

    if (token !== "" && endPoint !== "") {
        if (channel === "") {
            APIs.getChannel(token.key, endPoint.ApiEndPoint, token.id)
                .then((res) => {
                    setChannel(res.data)
                })
        }

        if (channel !== "" && emptyNoti === false && notilist.length === 0) {
            if (channel.length > 0) {
                let notis = []
                channel.map((ch, i) => {
                    APIs.getNotice(token.key, endPoint.ApiEndPoint, ch['Channel ID'])
                        .then((res) => {
                            res.data.length !== 0 ? notis = [...notis, ...res.data] : null
                            if (i + 1 === channel.length) {
                                setnotilist(notis)
                            }
                        })
                })
            } else {
                setemptyNoti(true)
            }

        }
    }

    if(emptyNoti === false && notilist.length === 0) {
        return (
            <Loading />
        )
    }

    return (
        <React.Fragment>
            {
                notilist.map((noti, key) => (
                    <TouchableOpacity
                        style={styles.card}
                        key={key}
                        onPress={() => navigation.navigate('NotiboardDetail', noti)}
                    >
                        <View style={styles.imgBox}>
                            <Image style={styles.notiImg} source={require('../../assets/icon/notification-3.png')} />
                        </View>
                        <View style={styles.txtBox}>
                            <Text style={styles.notiTitle}>{noti['Subject']}</Text>
                            <Text style={styles.notiBody}>{
                                noti['Body']
                                    .replace(/<\/?[^>]+(>|$)/g, "")
                                    .replace(/\s+/g, ' ').trim()
                                    .slice(0, 100)
                            } {noti['Body'].length > 100 && '...'}</Text>
                            <View style={styles.notiFoot}>
                                <Text style={styles.notiBody}>{noti['Date']}</Text>
                                <Text style={styles.notiBadge}>{noti['Channel']}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </React.Fragment>
    )
}
