import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'

// import feather icon
import Icon from 'react-native-vector-icons/Feather';

const CustomSelect = () => {
    return (
        <View>
            <TouchableNativeFeedback>
                <View style={styles.boxSelect}>

                    {/* placeholder */}
                    <View style={styles.placeholder}>
                        <Text>Select Your Option</Text>
                        <Icon name='chevron-down' style={styles.chevron} />
                    </View>



                </View>

            </TouchableNativeFeedback>

            {/* dropdown list */}
            <View style={styles.optionList}>
                <TouchableNativeFeedback>
                    <View style={styles.item, {fontSize: 24
                    
                    
                    
                    }}>
                        <Text>One</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.item}>
                        <Text>Two</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.item}>
                        <Text>Three</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({

    boxSelect: {
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'visible',
        zIndex: 9
    },
    placeholder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    chevron: {
        fontSize: 25
    },
    optionList: {
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '100%',
        marginTop: 5,
        maxHeight: 150,
        overflow: 'scroll',
        zIndex: 1
    },
    item: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: '#ccc'
    }
})

export default CustomSelect