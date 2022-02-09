const request = require('request')

const weatherdata = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=068ab6b4ecdc3ad4ca1a148a203dd625&query='+ latitude + ','+ longitude +'&units=f'
    
    request({url, json: true}, (error, {body}={})=> {
            if (error) {
                callback('Unable to connect to location services')
            }else if(body.error){
                callback('Unable to find location')
            } else{
                callback(undefined, {
                    currentTemp: body.current.temperature ,
                    feltTemp: body.current.feelslike ,
                    weathDescp: body.current.weather_descriptions[0]
                })
            }
        })
}

module.exports = weatherdata

// const request = require('request')

// const weatherdata = (latitude, longitude, callback) =>{
//     const geoCodeurl ='http://api.weatherstack.com/current?access_key=068ab6b4ecdc3ad4ca1a148a203dd625&query='+ latitude + ','+ longitude +'&units=f'
    
//     request({url: geoCodeurl, json: true}, (error, response)=> {
//             if (error) {
//                 callback('Unable to connect to location services')
//             }else if(response.body.error){
//                 callback('Unable to find location')
//             } else{
//                 callback(undefined, {
//                     currentTemp: response.body.current.temperature ,
//                     feltTemp: response.body.current.feelslike ,
//                     weathDescp: response.body.current.weather_descriptions[0]
//                 })
//             }
//         })
// }

// module.exports = weatherdata
