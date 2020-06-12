const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJ1bm5vZGUiLCJhIjoiY2tiM2E1YjhkMDN3cjJ5bzdwdHpqbmF1MCJ9.8iKFEDKRil836y9AfUe6hw&limit=1'
    request({url, json: true}, (error,{body}) => {
        if(error) {
            callback({error: 'Geocode service is not available'}, undefined)
        } else if(body.features.length === 0) {
            callback({error: 'Response returned empty string.. Check url'}, undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                altitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geoCode