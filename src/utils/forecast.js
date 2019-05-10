const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/ac4aad1d207d22dbe0afd50c3441f951/'+ lat + ','+ long
    request({ url: url , json: true },(error, {body}) => {
        if(error)
            callback('Unable to connect!',undefined)
        else if (body.error)
            callback('Unable to find location!', undefined)
        else
            callback(undefined, body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degree. '+'There is a '+ body.currently.precipProbability+' % chance of rain.'
                // summary: response.body.daily.data[0].summary,
                // temperature: response.body.currently.temperature,
                // precipProbability: response.body.currently.precipProbability
            )

        })
    }

    module.exports = forecast