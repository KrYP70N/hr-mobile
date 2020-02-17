import React, {Component} from 'react'
import { View, Text, Content, Container } from 'native-base'

import styOt from './overtime.style'
import po from './po'

import History from './_history.screen'


export default class Overtime extends Component {
    render () {
        return (
            <Container>
                <History />
            </Container>
        )
    }
}