import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export class DefatultDatetimeTesting extends Component {
    constructor(props) {
        super(props)
    }

    pickDate = (data) => {


        // let date = new Date(data)
        // this.setState({
        //     startDate: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`,
        //     //startDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        // })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
             
            </View>
        )
    }
}

export default DefatultDatetimeTesting
