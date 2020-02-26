import axios from 'axios'

const config = {
    req: 'http://192.168.1.100:8071',
    db: 'TESTING'
}

export default class APIs {

    // auth
    static Auth(key, version) {
        return axios.get(`http://apiendpoint.innovixhr.com/api/build/hr?siteKey=${key}&appVersion=${version}`)
            .then(function (res) {
                return { data: res.data.model, status: res.data.success }
            })
    }
    
    // auth token
    static Token(name, password, db) {
        console.log(name)
        console.log(password)
        console.log(db)
        return axios.create({
            headers: {
                db: db.db,
                login: name,
                password: password
            }
        }).get(`${db.url}/api/auth/token`)
            .then(function (res) {
                return { data: res.data, status: 'success' }
            })
            .catch(function (error) {
                console.log(error)
                return { error: error, status: 'fail' }
            })
    }

    // time controller
    static Time(auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/getTime`)
            .then(function (res) {
                return { data: res.data["data"]["Current Server Time"], status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // user controller
    static Profile(id, auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/user/profile/${id}`)
            .then(function (res) {
                let data = res["request"]["_response"]
                data = data.slice(data.indexOf('"Job Position"'), data.length)
                let str_index = data.indexOf('data\": ') + 'data\": '.length
                data = data.slice(str_index + 1, data.length - 2)

                // reformat image
                let profileImage = data.slice(0, data.indexOf('"Job Position"'))
                // console.log(profileImage)

                // reformat general information
                let generalInfo = data.slice(0, data.indexOf("Work Information") - 3).split(', "')
                let generalData = []
                generalInfo.map((data) => {
                    if(data.indexOf('false') === -1) {
                        generalData.push(JSON.parse(`{"${data}}`))
                    }
                })

                // reformat work info
                let workInfo = data.slice(data.indexOf("Work Information") - 1, data.indexOf("Personal Information") - 3).split(',')
                let workData = []
                workInfo.map(data => {
                    if(data.indexOf('false') === -1 && data.indexOf('""') === -1) {
                        workData.push(JSON.parse(`{${data}}`))
                    }
                })

                // reformat personal info
                let personalInfo = data.slice(data.indexOf("Personal Information") - 1 , data.length).split(',')
                let personalData = []
                personalInfo.map(data => {
                    if(data.indexOf('false') === -1 && data.indexOf('""') === -1) {
                        personalData.push(JSON.parse(`{${data}}`))
                    }
                })
                
                let infoCollection = {
                    "General Information": generalData,
                    "Work Information": workData,
                    "Personal Information": personalData
                }

                return { data: infoCollection, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // checkin controller
    static Checkin(id, auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(`${url}/checkin/${id}`)
            .then(function (res) {
                return { data: res, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // cehckout controller
    static Checkout(id, auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(`${url}/checkout/${id}`)
            .then(function (res) {
                return { data: res, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // checkinout status
    static CheckStatus(id, auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/checkinout/status/${id}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

}