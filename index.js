const express = require('express')
// import handlebars
const handlebars = require('express-handlebars')

// importing getFortune 
const fortune = require('./lib/fortune')
const app = express()
const port = process.env.PORT || 3000

// adding routes for home and about page 
/**
 * app.METHOD (get or post, usually)
 * 
 * two parameters (path, function)
 * 
 * path defines the route 
 * 
 * function gets invoked with the route is matched. pass in request and response objects
 * 
 * IN EXPRESS, THE ORDER IN WHICH ROUTES AND MIDDLEWARE ARE ADDED IS SIGNIFICANT
 */



// add the static middleware 
app.use(express.static(__dirname + '/public'))

// configure handlebars view engine; user handlebars.engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

//Replacing with views/home.handlebars and views/about.handlebars
// app.get('/', (req, res)=> {
//     res.type('text/plain')
//     res.send('Meadowlark Travel')
// })
app.get('/', (req, res)=> res.render('home'))

app.get('/about', (req, res)=> {
    res.render('about', { fortune: fortune.getFortune() })
})

//for error pages, use .use instead of .get => did not get matched by a route
// custom 404 page 
app.use((req, res)=> {
    res.status(404)
    res.render('404')
})

// custom 500 page 
app.use((err, req, res, next)=> {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, ()=> {
    console.log(`It's the port ${port} for me. Press Ctrl+C to terminate`)
})