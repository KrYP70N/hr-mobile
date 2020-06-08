## document picker
## geolocaton


## saved locale data
- @hr:endPoint [string]
- @hr:token [string]
- @hr:login [string] true/false

## leave callback
- leave status : getLeaveStatus(url, auth)
- leave history : getLeaveHistory(url, auth, id, year, month)
- get leave by status : getLeaveByStatus(url, auth, id, status, year, month)
- leave summary : getLeaveSummary(url, auth, id, year)
- leave balance : getLeaveBalance(url, auth, id, year)

## ot callback
getOTStatus(url, auth, status)
getOTSummary(url, auth, id, year)
getOTApprovedList(url, auth, id, year,month)
getOTRejectedList(url, auth, id, year,month)
getOTHistory(url, auth, id, year, month)


## dashbord api endpoint
# today Leave List
todayleave/list/dashboard/<employeeID>

# birthday List
birthday/list/dashboard/<employeeID>

# dept employee List
deptemployee/list/dashboard/<employeeID>

# contract list
contractlist/dashboard/<employeeID>

