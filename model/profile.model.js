export default {
    checkKey: (data, key) => {
        let res;
        if(data.length > 0) {
            data.map((obj) => {
                if(res === undefined) {
                    JSON.stringify(obj).indexOf(key) === -1 ?
                    res = undefined :
                    res = obj[key]
                } else {
                    return res
                }
            })
        }
        return res
    },
    getKey: (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                return key
            }
        }
    },
    getVal: (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                return data[key]
            }
        }

    }
}