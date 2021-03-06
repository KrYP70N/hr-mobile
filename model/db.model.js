export default {
    // get name
    getName: (data) => {
        return JSON.parse(data)['Database']
    },

    // get endPoint
    getEndPoint: (data) => {
        return JSON.parse(data)['ApiEndPoint']
    },

    // get Company Name
    getCompanyName: (data) => {
        return JSON.parse(data)['CompanyName']
    },

    // get site key
    getSiteKey: (data) => {
        return JSON.parse(data)['SiteKey']
    },

    // get token
    getToken: (data) => {
        return JSON.parse(data)['key']
    },

    // get uid
    getUserId: (data) => {
        return JSON.parse(data)['id']
    }
}