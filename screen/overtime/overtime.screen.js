import React, {Component} from 'react'
import { View, Text, Content, Container } from 'native-base'

import styOt from './overtime.style'
import po from './po'

import Request from './_request.screen'

export default class Overtime extends Component {
    render () {
        return (
            <Container>
                <Request />
            </Container>
        )
    }
}