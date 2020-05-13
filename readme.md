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
