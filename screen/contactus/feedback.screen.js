import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BackHeader from '../../components/BackHeader'
import color from '../../constant/color'

export default class FeedBack extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackHeader name="Feedback" navigation={this.props.navigation} parent="Main" />
        <View style={{ flex: 1, marginTop: 10, backgroundColor: color.light }}>
          <View style={{ padding: 20 }}>
            <Text style={styles.topicText}>Please select a topic</Text>
            { /* Application Error Radio */}
            <View style={styles.radioContainer}>
              <View style={styles.appOuterRadio}>

              </View>
              <Text style={styles.radioText}>Application Error</Text>
            </View>
            { /* Application Suggestion Radio */}
            <View style={styles.radioContainer}>
              <View style={styles.appOuterRadio}>

              </View>
              <Text style={styles.radioText}>Suggestion of Application</Text>
            </View>

            <Text>Comment</Text>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  topicText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: color.secondary
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  appOuterRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: color.dark,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Nunito',
    color: color.secondary
  },
  commentText: {
    fontSize: 16,
    fontFamily: 'Nunito',
    color: color.tertiary,
  }
})
