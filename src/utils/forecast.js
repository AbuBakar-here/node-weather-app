const request = require("postman-request")

const forecast = (lat, lon, api, callback, unit = 'm') => {
    
    const url = 'http://api.weatherstack.com/current?access_key=' + api + '&query=' + lat + ',' + lon + '&units=' + unit

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find this location. Please try another location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast