import axios from 'axios'

export default class APIs {

    static Auth(key, version) {
        return axios.get(`http://apiendpoint.innovixhr.com/api/build/hr?siteKey=${key}&appVersion=${version}`)
            .then(function (res) {
                return { data: res.data.model, status: res.data.success }
            })
    }
    
    // auth token
    static Token(url, db, user, password) {
        return axios.create({
            headers: {
                db: db,
                login: user,
                password: password
            }
        }).get(`${url}/api/auth/token`)
            .then(function (res) {
                return { data: res.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // time controller
    static Time(url, token) {
        return axios.create({
            headers: {
                access_token: token
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
    static Profile(url, auth, id) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/user/profile/${id}`)
            .then(function (res) {
                let data = res["request"]["_response"]
                data = data.slice(data.indexOf('"Job Position"'), data.length - 2)
                
                // reformat profileImage
                let profileImage = res.data.data['Profile Picture']

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
                    "Profile Image": profileImage,
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
    static Checkin(url, auth, id, coord) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(coord === undefined ? `${url}/checkin/${id}` : `${url}/checkin/${id}?latitude=${coord.lat}&longitude=${coord.long}`)
            .then(function (res) {
                return { data: res, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // cehckout controller
    static Checkout(url, auth, id, coord) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(coord === undefined ? `${url}/checkout/${id}` : `${url}/checkout/${id}?latitude=${coord.lat}&longitude=${coord.long}`)
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

    // attendance summary
    static AttendanceSummary(url, auth, id) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/attendance/summary/${id}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request ot type
    static OTRequest(id, auth, url, date, hour, description) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(`${url}/overtime/${id}?request_date=${date}&hour=${hour}&description=${description}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request ot not in final approve
    static OTPending(id, auth, url) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/list/OTRequest/${id}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // cancel ot
    static OTCancel(otID, auth, url, status) {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(`${url}/approve/overtime/${otID}?status=${status}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // yearly payroll record
    static yearPayroll = (id, auth, url, year) => {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/payroll/${id}/${year}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // monthly payslip
    static getPaySlip = (slipid, auth, url) => {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/payroll/${slipid}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave type
    static getLeaveType = (auth, url) => {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/leave/types`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request leave
    static requestLeave = (auth, url, id, leaveType, from, to, dayType) => {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).post(`${url}/leave/${id}/${leaveType}?from_date=${from}&to_date=${to}&half_day=${dayType}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get pending Leave
    static getLeaveRequest = (auth, url, id) => {
        return axios.create({
            headers: {
                access_token: auth
            }
        }).get(`${url}/list/leaveRequest/${id}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave history
    // static getLeaveHistory = (auth)

}