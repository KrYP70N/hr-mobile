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
    padding: 15
  },
  workContainer: {
    backgroundColor: color.light,
    display: 'flex',
    alignItems: 'center',
    padding: offset.o2,
    borderRadius: 5
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
    ...typo.textSmall,
    color: color.placeHolder,
    marginBottom: offset.oh,
    textAlign: 'center'
  },
  name: {
    ...typo.subHeader,
    color: color.primary,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center'
  },
  position: {
    ...typo.textSmall,
    textAlign: 'center',
    color: color.secondary,
    marginBottom: offset.o3
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
    marginTop: offset.o1,
    fontSize: 14
  },
  dataValue: {
    ...typo.paragraph,
    color: '#333',
    marginBottom: offset.o1
  },
  title: {
    ...typo.subHeader,
    fontFamily: 'Nunito-Bold',
    padding: offset.o1,
    color: '#333'
  },
  personalInfo: {
    padding: 15,
    marginBottom: offset.o4
  },
  personalContainer: {
    padding: offset.o2,
    paddingTop: 0,
    backgroundColor: color.light,
    borderRadius: 5
  }
})