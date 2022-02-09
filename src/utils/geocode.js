const request = require('request')

const geocode = (address, callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhc2hvYnN1bm55IiwiYSI6ImNremM2YnFlNTAzajUybnA2ZTNoc3V2MG8ifQ.ETJ2-9F0jg4WLu9vKmgo_g&limit=1'
    
    request({url, json: true}, (error, {body}={})=> {
            if (error) {
                callback('Unable to connect to location services')
            }else if(body.features.length === 0){
                callback('Unable to find location')
            } else{
                callback(undefined, {
                    latitue: body.features[0].center[1] ,
                    longitude: body.features[0].center[0] ,
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = geocode

// const request = require('request')

// const geocode = (address, callback) =>{
//     const geoCodeurl ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhc2hvYnN1bm55IiwiYSI6ImNremM2YnFlNTAzajUybnA2ZTNoc3V2MG8ifQ.ETJ2-9F0jg4WLu9vKmgo_g&limit=1'
    
//     request({url: geoCodeurl, json: true}, (error, response)=> {
//             if (error) {
//                 callback('Unable to connect to location services')
//             }else if(response.body.features.length === 0){
//                 callback('Unable to find location')
//             } else{
//                 callback(undefined, {
//                     latitue: response.body.features[0].center[1] ,
//                     longitude: response.body.features[0].center[0] ,
//                     location: response.body.features[0].place_name
//                 })
//             }
//         })
// }

// module.exports = geocode