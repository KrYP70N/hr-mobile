let data = "{\"count\": 35, \"data\": {\"Profile Picture\": [false, false], \"Job Position\": false, \"Employee Code\": false, \"Employee Name\": \"Administrator\", \"Myanmar Name\": false, \"Geo Fencing\": false, \"Latitude\": 0.0, \"Longtitude\": 0.0, \"Radius(m)\": 0.0, \"Work Information\": \"\", \"Company\": \"Innovix Solutions\", \"Branch\": false, \"Deparment\": false, \"Location\": false, \"Work Phone\": false, \"Work Email\": \"admin@example.com\", \"Grade\": false, \"Join Date\": false, \"Service Year\": false, \"Personal Information\": \"\", \"Bank Account\": false, \"Passport No.\": false, \"Gender\": \"male\", \"Marital Status\": \"single\", \"Blood Type\": false, \"Driving License No.\": false, \"License Expire\": false, \"NRC No.\": false, \"Visa No.\": false, \"Work Permit No\": false, \"Visa Expire Date\": false, \"DOB\": false, \"Personal Email\": false, \"Emergency Contact\": false, \"Personal Phone\": false}}";

let str_index = data.indexOf('data\": ') + 'data\": '.length

data = data.slice(str_index, data.length - 1)

console.log(JSON.parse(data))
