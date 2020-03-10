import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import typo from '../../constant/typography'
import offset from '../../constant/offset'
export default StyleSheet.create({
  topContainer: {
    backgroundColor: color.lighter
  },
  header: {
    backgroundColor: color.primary
  },
  workInfo: {
    marginTop: offset.o5,
    padding: offset.o1
  },
  workContainer: {
    backgroundColor: color.light,
    display: 'flex',
    alignItems: 'center',
    padding: offset.o2
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: color.primary,
    borderWidth: 2,
    marginTop: - (offset.o5 + offset.o1),
    backgroundColor: color.light,
    marginBottom: offset.o1
  },
  id: {
    color: color.placeHolder,
    marginBottom: offset.o1,
    textAlign: 'center'
  },
  name: {
    ...typo.subHeader,
    color: color.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  position: {
    textAlign: 'center',
    color: color.secondary
  },
  dataList: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: color.lighter
  },
  dataListLast: {
    width: '100%'
  },
  label: {
    ...typo.placeholder,
    marginTop: offset.o1
  },
  dataValue: {
    marginBottom: offset.o1
  },
  title: {
    ...typo.subHeader,
    fontWeight: 'bold',
    padding: offset.o1
  },
  personalInfo: {
    padding: offset.o1,
    marginBottom: offset.o4
  },
  personalContainer: {
    padding: offset.o2,
    paddingTop: 0,
    backgroundColor: color.light
  }
})