import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { View, Text, Icon, Row, Col } from 'native-base'
import colors from '../constant/color'
import moment from 'moment'

export default function MonthPicker({show, onClosePress, onGoNext, onGoPrev}) {

    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))

    // next emitter
    const goNext = () => {
        setDate(moment(date).add(1, 'months'))
        onGoNext({
            month: moment(date).add(1, 'months').format('MM'),
            year: moment(date).add(1, 'months').format('YYYY')
        })
    }

    // prev emitter
    const goPrev = () => {
        setDate(moment(date).subtract(1, 'months'))
        onGoPrev({
            month: moment(date).subtract(1, 'months').format('MM'),
            year: moment(date).subtract(1, 'months').format('YYYY')
        })
    }
    

    return (
        <View style={[styles.container, {
            display: show ? 'flex' : 'none'
        }]}>
            <View style={styles.header}>
                <Text style={styles.headText}>Filters</Text>
                <Icon
                    style={styles.close}
                    name="ios-close"
                    onPress={onClosePress} />
            </View>
            <View style={styles.body}>
                <Row>
                    <Col>
                        <TouchableOpacity onPress={goPrev}>
                            <Text style={styles.fitText}>
                                <Icon name="ios-arrow-back" style={styles.chevron} />
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <Text style={[styles.fitText, styles.fit]}>
                            {moment(date).format('YYYY-MMM')}
                        </Text>
                    </Col>
                    <Col>
                        <TouchableOpacity onPress={goNext}>
                            <Text style={styles.fitText}>
                                <Icon
                                    name="ios-arrow-forward"
                                    style={styles.chevron}
                                />
                            </Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        marginBottom: 10,
        display: 'none'
    },
    header: {
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: colors.lighter,
        padding: 10
    },
    headText: {
        textAlign: 'center',
        color: colors.secondary,
        fontSize: 15,
        fontFamily: 'Nunito'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 20,
        color: colors.placeHolder
    },
    body: {
        padding: 20
    },
    fit: {
        backgroundColor: colors.lighter,
        borderRadius: 5,
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    },
    fitText: {
        textAlign: 'center',
        padding: 10
    },
    chevron: {
        fontSize: 18
    }
})

MonthPicker.propTypes = {
    show: PropTypes.bool.isRequired,
    onClosePress: PropTypes.func.isRequired,
    onGoNext: PropTypes.func,
    onGoPrev: PropTypes.func
}

