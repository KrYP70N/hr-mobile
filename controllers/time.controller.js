export default class Time {
    // format hour
    static hour(data) {
        let t = new Date(data)
        t = t.getHours() > 12 ? t.getHours() - 12 : t.getHours()
        return t < 10 ? '0'+t : t
    }
    // format minutes
    static minute(data) {
        let t = new Date(data).getMinutes()
        return t < 10 ? '0'+t : t
    }
    // format second
    static second(data) {
        let t = new Date(data).getSeconds()
        return t < 10 ? '0'+t : t
    }
    // part
    static part(data) {
        let t = new Date(data).getHours()
        return t > 11 ? 'PM' : 'AM'
    }
    // day
    static day(data) {
        let t = new Date(data)
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return days[t.getDay()]
    }
    // date
    static date(data) {
        let t = new Date(data).getDate()
        return t < 10 ? '0'+t : t
    }
    // month
    static month(data) {
        let t = new Date(data).getMonth()
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[t]
    }
    // year
    static year(data) {
        return new Date(data).getFullYear()
    }
}