import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import color from './colors.constant'

let style

export default style = StyleSheet.create({
  h1: {
    fontSize: 28
  },
  h2: {
    fontSize: 22
  },
  h3: {
    fontSize: 18
  },
  h4: {
    fontSize: 16
  },
  h5: {
    fontSize: 14
  },
  h6: {
    fontSize: 12
  },
  icon: {
    fontSize: 19
  },
  fontBold: {
    fontWeight: 'bold'
  },
  fontLight: {
    fontWeight: 'normal'
  },
  backgroundPrimary: {
    backgroundColor: color.primary
  },
  backgroundSecondary: {
    backgroundColor: color.secondary
  },
  backgroundPlaceholder: {
    backgroundColor: color.placeholder
  },
  textButton: {
    fontSize: 16
  },
  textPrimary: {
    color: color.primary
  },
  textSecondary: {
    color: color.secondary
  },
  textNegative: {
    color: color.negative
  },
  textWarning: {
    color: color.warning
  },
  textLight: {
    color: color.light
  },
  textPlaceholder: {
    color: color.placeholder
  },
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  buttonPrimary: {
    backgroundColor: color.primary
  },
  width100: {
    width: '100%'
  },
  width50: {
    width: '50%'
  },
  dispayFlex: {
    display: 'flex'
  },
  flexRow: {
    flexDirection: 'row'
  },
  itemCenter: {
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  mr10: {
    marginRight: 10
  },
  ml10: {
    marginLeft: 10
  },
  ml20: {
    marginLeft: 20
  },
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mt30: {
    marginTop: 30
  },
  mt40: {
    marginTop: 40
  },
  mt50: {
    marginBottom: 50
  },
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  mb30: {
    marginBottom: 30
  },
  mb40: {
    marginBottom: 40
  },
  mb50: {
    marginBottom: 50
  },
  mb60: {
    marginBottom: 60
  },
  mb70: {
    marginBottom: 70
  },
  mb80: {
    marginBottom: 80
  },
  mb90: {
    marginBottom: 90
  },
  mb100: {
    marginBottom: 100
  },
  border0: {
    borderWidth: 0
  },
  radius: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  copyright: {
    textAlign: 'center'
  },
  list: {
    backgroundColor: color.light,
    borderBottomWidth: 1,
    borderBottomColor: color.light2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  listLast: {
    borderWidth: 0,
    borderBottomColor: color.light
  },
  listLabel: {
    color: color.placeholder
  },
  container: {
    padding: 20
  },
  stickyFoot: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: 20,
      backgroundColor: color.primary,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  }
})