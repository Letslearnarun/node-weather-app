const request = require('request')

const forecast = (latitude, altitude, callback ) => {
    url = 'http://api.weatherstack.com/current?access_key=216940ba160e5d8c23ced4c232dc6e27&query=' + latitude + ',' + altitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback({error: 'unable to call to webstack'}, undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
              //  location: body.location.name,
                temperature : body.current.temperature,
                feelsLike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                cloudcover: body.current.cloudcover
            })
        }
    })
}

module.exports = forecast