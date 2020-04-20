import React, { useState } from 'react'
import { View, Text } from 'native-base'
import styles from './noticeboard.style'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function NotiList() {

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

    return (
        <React.Fragment>
            {
                notilist.map((noti, key) => (
                    <TouchableOpacity key={key}>
                        <View style={styles.card} >
                            <View style={styles.imgBox}>
                                <Image style={styles.notiImg} source={require('../../assets/icon/notification-3.png')} />
                            </View>
                            <View style={styles.txtBox}>
                                <Text style={styles.notiTitle}>{noti.title}</Text>
                                <Text style={styles.notiBody}>{noti.body.slice(0, 100)} {noti.body.length > 100 && '...'}</Text>
                                {noti.new && <Text style={styles.notiBadge}>New</Text>}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </React.Fragment>
    )
}
