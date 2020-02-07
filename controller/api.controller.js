const axios = require('axios')

const config = {
  req: 'http://192.168.1.175:8071',
  db: 'Odoo11_HR_C'
}

class APIs {
  // request token
  static getToken (name, password) {
    return axios.create({
      headers: {
        db: config.db,
        login: name,
        password: password
      }
    }).get(`${config.req}/api/auth/token`)
      .then(function(res) {
        return {data: res.data, status: 'success'}
      })
      .catch(function(error) {
        return {error: error, status: 'fail'}
      })
  }

  // request getTime
  static getServerTime (token) {
    return axios.create({
      headers: {
        access_token: token
      }
    }).get(`${config.req}/getTime`)
      .then(function(res) {
        return {data: res.data.data, status: 'success'}
      })
      .catch(function(error) {
          return {error: error, status: 'fail'}
      })
  }

  // request profile
  static getProfile (token, id) {
    return axios.create({
      headers: {
        access_token: token
      }
    }).get(`${config.req}/user/profile/${id}`)
      .then(function(res) {
        return {data: res.data, status: 'success'}
      })
      .catch(function(error) {
          return {error: error, status: 'fail'}
      })
  }

  // checkin-out
  static postCheckin (token, id) {
    return axios.create(
        {
          headers: {
            access_token: token
          }
        }
      ).post(`${config.req}/checkin/${id}?latitude=18.55263&longitude=20.35412`)
      .then(function(res) {
        return res.data
      })
      .catch(function(err) {
        return err
      })
  }

}

module.exports = APIs

// sample api call

// token

// console.log('hi')