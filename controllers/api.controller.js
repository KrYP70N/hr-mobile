import axios from 'axios'

const config = {
    req: 'http://192.168.1.102:8071',
    db: 'TESTING'
}

export default class APIs {
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
}