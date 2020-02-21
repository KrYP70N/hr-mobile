import axios from 'axios'

const config = {
    req: 'http://192.168.1.108:8071',
    db: 'TESTING'
}

export default class APIs {
    
    // auth token
    static Token(name, password) {
        return axios.create({
            headers: {
                db: config.db,
                login: name,
                password: password
            }
        }).get(`${config.req}/api/auth/token`)
            .then(function (res) {
                return { data: res.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // time controller
    static Time(auth) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${config.req}/getTime`)
            .then(function (res) {
                return { data: res.data["data"]["Current Server Time"], status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // user controller
    static Profile(id, auth) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${config.req}/user/profile/${id}`)
            .then(function (res) {
                let data = res["request"]["_response"]
                
                let str_index = data.indexOf('data\": ') + 'data\": '.length

                data = data.slice(str_index, data.length - 1)

                console.log(data)
                // console.log(JSON.parse())
                // return { data: res.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

}