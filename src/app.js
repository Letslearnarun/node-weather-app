const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up handle bar engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//set up the static directory to server
app.use(express.static(publicDirPath))

 app.get('',(req,res)=>{
     res.render('index',{
         title: 'Weather',
         name: 'Arun'
     })
 })

 app.get('/about',(req,res) => {
     res.render('about',{
         title: 'About Weather App',
         name:'Arun'
     })
 })

 app.get('/help',(req,res) => {
     res.render('help',{
         title:'Help',
         name:'Arun',
         helpText: 'This is a help text'
     })
 })


app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        res.send({error: 'please provide proper address location'})
    } else {
        geoCode(req.query.address, (error, {latitude, altitude} = {}) => {
            if(error) {
                return res.send(error)
            }
            forecast(latitude,altitude,(error, foreCastData) => {
                if(error) {
                    return res.send(error)
                }
                res.send({
                    location: req.query.address,
                    Temperature: foreCastData.temperature,
                    feelslike: foreCastData.feelsLike
                })
            })
        })
    }
    // res.send({
    //     temperature : 30,
    //     feelslike: 38,
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'arun',
        errorMsg: 'Help Article Not found'
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'arun',
        errorMsg: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('server is up on port' + port)
})