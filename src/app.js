const express = require('express')
const path = require('path')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Apis
const wapi = 'e869caf05c3731c13ea76d2dc301e642'
const geoApi = 'pk.eyJ1IjoiYWJ1LWJha2FyIiwiYSI6ImNsMDU1aGx5czA2NzAzY3FqcTRvcDd0YmwifQ.mmMjB2dLUSTXzj02H9Gpqg'

// Define Paths for Express config
const publicPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)   // defualt it will search for views folder
app.set('env', 'production')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abu Bakar'
    })
})

// URL : /test.html

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abu Bakar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abu Bakar',
        message: 'This is a message from backend'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address term'
        })
    }

    const address = req.query.address

    return geoCode(address, geoApi, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                status: "Error",
                error
            })
        }

        forecast(latitude, longitude, wapi, (error, forecastData) => {

            if (error) {
                return res.send({
                    status: "Error",
                    error
                })
            }

            return res.send({
                status: "Success",
                location,
                forecastData
            })
        })
    })

    // console.log("SHOULD NOT BE REACHED")
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})







app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Abu Bakar',
        message: 'Help article not found.'
    })
    // res.redirect('/help')
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Abu Bakar',
        message: 'Page not found.'
    })
})



















app.listen(port, () => {
    console.log('Server is up on port ' + port +'!')
})