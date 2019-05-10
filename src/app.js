const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app =express()

// DEfine paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Anshul'
    })
})

app.get('/help', (req, res) => {
    res.render('help',
    {
        title: 'Help',
        name: 'Anshul'
    })
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About me',
            name: 'Anshul'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if (error)
            return res.send({error})
    
        forecast(latitude,longitude, (error, foredata) => {
            if(error)
                return res.send({error})

            res.send({
                forecast: foredata,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     location: "Indore",
    //     forecast: 'Clear today',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Anshul',
        errorMessage: 'Help article not found'
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
            
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Anshul',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up')
})