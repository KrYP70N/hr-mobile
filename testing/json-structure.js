const axios = require('axios')


axios.create({
    headers: {
        access_token: 'access_token_23600924292eba93058d060f4f28c574b5e53336'
    }
}).get(`http://192.168.1.108:8071/getTime`)
    .then(function (res) {
        return console.log({ data: res.data["data"]["Current Server Time"], status: 'success' })
    })
    .catch(function (error) {
        return { error: error, status: 'fail' }
    })
