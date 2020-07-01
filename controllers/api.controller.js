import React from 'react'
import axios from 'axios'

export default class APIs {

    static Auth(key, version) {
        return axios.get(`http://apiendpoint.innovixhr.com/api/build/hr?siteKey=${key}&appVersion=${1}`)
            .then(function (res) {
                return { data: res.data.model, status: res.data.success }
            }).catch((e) => {
                console.log("Error::", e)
            })
    }

    // auth token
    static Token(url, db, user, password) {
        console.log("Url", url)
        console.log("DB", db)
        console.log("Login", user)
        console.log("Password", password)
        return axios.create({
            headers: {
                db: db,
                login: user,
                password: password
            }
        }).get(`${url}/api/auth/token`)
            .then(function (res) {
                    console.log("Res Data", res.data)
                    if(res.data.data == undefined){
                        return { data: res.data, status: 'success' }
                    }else{
                        return { geterror: true, status: 'success'}
                    } 
            }).catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // token refresh
    static RefreshToken(url, token) {
        return axios.create({
            headers: {
                'Authorization': token
            }
        }).get(`${url}/refresh`)
            .then(function (res) {
                return { data: res.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // employee level
    static Level(url, token, id) {
        return axios.create({
            headers: {
                'Authorization': token
            }
        }).get(`${url}/employee/level/${id}?employeeID=${id}`)
            .then(function (res) {
                if(res.data.data.error){
                    return { error: true, status: 'success'}
                }else{
                    return { data: res.data.data, status: 'success' }
                }   
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // time controller
    static Time(url, token, id) {
        return axios.create({
            headers: {
                'Authorization': token
            }
        }).get(`${url}/getTime/${id}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // user controller
    static Profile(url, auth, id) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/user/profile/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    let data = res["request"]["_response"]

                    let dataStr = data.slice(data.indexOf('"data":') + '"data":'.length, data.length - 1)

                    dataStr = dataStr.replace(', "Work Information": "",', '}chunkit{')
                    dataStr = dataStr.replace(', "Personal Information": "", ', '}chunkit{')

                    let dataArray = dataStr.split('chunkit')

                    // reformat profileImage
                    let profileImage = res.data.data['Profile Picture']



                    let infoCollection = {
                        "Profile Image": profileImage,
                        "General Information": JSON.parse(dataArray[0]),
                        "Work Information": JSON.parse(dataArray[1]),
                        "Personal Information": JSON.parse(dataArray[2])
                    }

                    return { data: infoCollection, status: 'success' }
                }

            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // checkin controller
    static Checkin(url, auth, id, coord) {
        console.log(url)
        console.log(id)
        console.log(url)
        console.log("test", coord)
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(coord === undefined ? `${url}/checkin/${id}` : `${url}/checkin/${id}?latitude=${coord.lat}&longitude=${coord.long}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res, status: 'success' }
                }

            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // cehckout controller
    static Checkout(url, auth, id, coord) {
        console.log("test", coord)
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(coord === undefined ? `${url}/checkout/${id}` : `${url}/checkout/${id}?latitude=${coord.lat}&longitude=${coord.long}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // checkinout status
    static CheckStatus(id, auth, url) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/checkinout/status/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // monthly attendance
    static MonthlyAttendance(url, auth, id, month) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/attendance/${month}/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }

            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // attendance summary
    static AttendanceSummary(url, auth, year, month, id) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/attendance/summary/${year}/${month}/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request ot type
    static OTRequest(id, auth, url, request_date_from, request_date_to, description) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/overtime/${id}?request_date_from=${request_date_from}&request_date_to=${request_date_to}&description=${description}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request ot not in final approve
    static OTPending(id, auth, url) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/OTRequest/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // update ot status
    static OTUpdateStatus(otID, auth, url, status) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/approve/overtime/${otID}?status=${status}`)
            .then(function (res) {
                return { data: res.data.data, status: 'success' }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // monthly ot record
    static OTMonthly(url, auth, id, year, month) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/overtime/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // OT approval list (manager)
    static OTApproval(url, auth, id) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/approvelist/overtime/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave type
    static getLeaveType = (auth, url) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/leave/types`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // request leave
    static requestLeave(auth, url, id, leaveType, from, to, mroning_leave, evening_leave, description, file) {
        let fd = new FormData()
        for (let i = 0; i < file.length; i++) {
            if (i === 0) {
                fd.append(
                    'attac', file[i]
                )
            } else {
                fd.append(
                    `attac${i + 1}`, file[i]
                )
            }
        }

        return axios.post(`${url}/leave/${id}/${leaveType}?from_date=${from}&to_date=${to}&morning_leave=${mroning_leave}&evening_leave=${evening_leave}&description=${description}`,
            file.length === 0 ? null : fd, {
            headers: {
                'Authorization': auth
            }
        }
        )
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // leave monthly
    static LeaveMonthly(url, auth, id, year, month) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/leaves/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // Leave Approval List Manager
    static leaveApproval(url, auth, id) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/leaveRequest/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // yearly payroll record
    static yearPayroll = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/payroll/${id}/${year}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // update leave status
    static leaveStatusUpdate(url, auth, leaveID, status) {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/approve/leave/${leaveID}?status=${status}`)
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
                'Authorization': auth
            }
        }).get(`${url}/payroll/${slipid}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // download payslip [pending ...]
    static downloadPaySlip = (url, auth, slipid) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/download/payroll/${slipid}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get Dashboard summary
    static getDashboardSummary = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/dashboard/employee/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get Dashboard Today Leave
    static getTodayLeavesData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/todayleave/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //dashboard all employee list
    static getEmployeeListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/employeelist/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // Dept Employee List
    static getDeptEmployeeListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/deptemployee/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }

            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //get Dashboard Birthday Lists
    static getBirthdayListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/birthday/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //Dashboard Contract Profile
    static getDashboardContractData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/contractlist/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //Dashboard Absent Emp List
    static getDashboardTodayAbsentEmpListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/absent/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //Dashboard Attendance Emp List
    static getDashboardAttendanceEmployeeListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/attendance/today/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }
    //Dashboard Exit Employee Lists
    static getExitEmployeeListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/exit/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //Dashboard Join Employee List
    static getJoinEmployeeListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/join/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //Dashboard Leave Request Employee List
    static getDashboardLeaveRequestEmpListData = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/leaveRequest/list/dashboard/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }



    // get pending Leave Lists
    static getLeaveRequest = (auth, url, id) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/leaveRequest/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave history
    static leaveHistory = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/list/leaveRequest/${id}/year/month`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave status
    static getLeaveStatus = (url, auth) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/leave/status`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave history
    static getLeaveHistory = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/leaves/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get ot history
    static getOTHistory = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/overtime/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave approve, cancel, pending
    static getLeaveByStatus = (url, auth, id, status, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/list/${status}/leaves/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // ot status
    static getOTStatus = (url, auth) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/OT/status`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave summary
    static getLeaveSummary = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/leave/summary/${id}/${year}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get ot summary
    static getOTSummary = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/overtime/summary/${id}/${year}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //list/reject/leaves/empID/year/month
    //leave Rejected lists
    static getLeaveRejectedList = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/reject/leaves/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // ot rejected
    static getOTRejectedList = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/rejected/ot/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //get leave approve list (for employee)
    static getLeaveApprovedList = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/approved/leaves/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // ot approve
    static getOTApprovedList = (url, auth, id, year, month) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/approved/ot/${id}/${year}/${month}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get leave balance
    static getLeaveBalance = (url, auth, id, year) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/list/leave/balance/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // post receivedPayroll
    static sendReceived = (url, auth, payrollID) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).post(`${url}/payroll/receive/${payrollID}?status=receive`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get pending Leave Lists
    static getNotice = (auth, url, channel, from, to) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/noti/${channel}?from_date=${from}&to_date=${to}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    // get channel
    static getChannel = (auth, url, id) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/channel/${id}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }

    //get announcement
    static getAnnouncement = (auth, url, id, startDate, endDate) => {
        return axios.create({
            headers: {
                'Authorization': auth
            }
        }).get(`${url}/announcement/${id}?date_start=${startDate}&date_stop=${endDate}`)
            .then(function (res) {
                if (res.data.data.error) {
                    return { error: true, status: 'success' }
                } else {
                    return { data: res.data.data, status: 'success' }
                }
            })
            .catch(function (error) {
                return { error: error, status: 'fail' }
            })
    }
}
