import React, { useState } from 'react'
import { View, Text } from 'native-base'
import styles from './noticeboard.style'
import { Image, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import APIs from '../../controllers/api.controller'

export default function NotiList({ navigation }) {

    const [token, setToken] = useState("")
    const [endPoint, setEndPoint] = useState("")
    const [channel, setChannel] = useState("")

    const [notilist, setnotilist] = useState([
        {
            title: 'Birthday Wishes for November Born',
            body: 'Lorem ipsum dolor sit amet, consectetur... adipiscing elit',
            date: '2 hrs',
            new: true
        },
        {
            title: 'Announcement for Annual Staff Party',
            body: 'Lorem ipsum dolor sit amet, consectetur... adipiscing elit',
            date: '2 hrs',
            new: false
        },
        {
            title: 'Company Policy',
            body: 'Lorem ipsum dolor sit amet, consectetur... adipiscing elit',
            date: '2 hrs',
            new: false
        }
    ])

    if(token === "") {
        AsyncStorage.getItem('@hr:token')
        .then((res) => setToken(JSON.parse(res)))
    }

    if(endPoint === "") {
        AsyncStorage.getItem('@hr:endPoint')
        .then((res) => setEndPoint(JSON.parse(res)))
    }

    if(token !== "" && endPoint !== "") {
        console.log(token, endPoint)
        if(channel === "") {
            APIs.getChannel(token.key, endPoint.ApiEndPoint, token.id)
            .then((res) => {
                setChannel(res.data)
            })
        }
        
        if(channel !== "") {
            console.log(channel)
        }
        // APIs.getNotice(token.key, endPoint.ApiEndPoint, 1)
        // .then((res) => {
        //     console.log(res.data)
        // })
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
                            <Text style={styles.notiTitle}>{noti.title}</Text>
                            <Text style={styles.notiBody}>{noti.body.slice(0, 100)} {noti.body.length > 100 && '...'}</Text>
                            {noti.new && <Text style={styles.notiBadge}>New</Text>}
                        </View>
                    </TouchableOpacity>
                ))
            }
        </React.Fragment>
    )
}
