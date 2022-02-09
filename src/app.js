const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const weatherdata = require('./utils/wheatherdata')


// console.log(__dirname)
// console.log(path.join(__dirname,'../pubic'))



const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const vewsPath = path.join(__dirname,'../templates')
const paritalsPath = path.join(__dirname,'../views/partials')

//setup handlebars engine and   views location
app.set('view engine', 'hbs')
// app.set('vews', vewsPath)
hbs.registerPartials(paritalsPath)

//setupsttic directory to serve
app.use(express.static( path.join(__dirname, '../public')))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Prasob Sunny'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About App',
        name: 'Prasob Sunny'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'help Page',
        name: 'Prasob Sunny'
    })
})

app.get('/weather', (req, res )=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({
                error
            })
        } 
        
        weatherdata(latitude, longitude, (error, forecastdata) =>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                place: location,
                weather: forecastdata,
                address: req.query.address
            }
        )
        })
    })

})

app.get('/products', (req, res )=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send([{
        products: []
    }
])
})

app.get('/help/*', (req, res) =>{
    res.render('help404', {
        title: 'Error Page',
        name: 'Prasob Sunny'
    })

})

app.get('*', (req, res) =>{
    res.render('generic404', {
        title: 'Error Page',
        name: 'Prasob Sunny'
    })

})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})



// app.get('/help', (req, res )=>{
//     res.send([{
//         name: 'andrew',
//         age: 27,
//     },
//     {
//         name: 'prasob',
//         age: 27,
//     }
// ])
// })

// app.get('/about', (req, res )=>{
//     res.send('<h1> ABOUT</h1>')
// })
