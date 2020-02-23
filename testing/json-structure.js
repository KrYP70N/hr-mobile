const axios = require('axios')


axios.create({
    headers: {
        access_token: 'access_token_a59d8b21ef10f428d77a9af6774dcae823fd9516'
    }
}).get(`http://192.168.1.102:8071/user/profile/1`)
    .then(function (res) {
        let data = res["request"]["_response"]
        
        let str_index = data.indexOf('data\": ') + 'data\": '.length

        data = data.slice(str_index + 1, data.length - 2)
        console.log(data)
        let generalInfo = data.slice(0, data.indexOf("Work Information")).split(', "')
        let generalArr = []

        

        console.log(generalArr)

        return { data: res.data, status: 'success' }
    })
    .catch(function (error) {
        console.log(error)
        return { error: error, status: 'fail' }
    })