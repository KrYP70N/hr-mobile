const axios = require('axios')

const config = {
  req: 'http://192.168.1.106:8071',
  db: 'TESTING'
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
  static checkIn (token, id, coord) {
  //   return axios.create({
  //     headers: {
  //       access_token: 'access_token_b03d611a2843fa21a01e329bf4ad3fc4365ed9e6'
  //     }
  //   }).post(`${config.req}/user/profile/1`, {
  //       latitude: 18.55263,
  //       longitude: 20.35412
  //   })
  //     .then(function(res) {
  //       return console.log('success')
  //     })
  //     .catch(function(error) {
  //       console.log("---------")
  //       console.log(error)
  //       return {error: error, status: 'fail'}
  //     })
  // }

    axios({
      method: 'post',
      url: `http://192.168.1.106:8071/checkin/1`,
      headers: {
        access_token: 'access_token_b03d611a2843fa21a01e329bf4ad3fc4365ed9e6'
      }
    })
    .then(function (res) {
      console.log('status : ------------')
      console.log(res.data)
    })
    .catch(function (error) {
      console.log('error: -----------')
      console.log(error)
    })
  }

}

module.exports = APIs

APIs.checkIn()