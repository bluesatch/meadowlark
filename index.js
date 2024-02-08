//mocking
const handlers = require('./lib/handlers')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.use(handlers.notFound)
app.use(handlers.serverError)

// import handlebars
const handlebars = require('express-handlebars')

// importing getFortune 
const fortune = require('./lib/fortune')

const test = 'this is a test'


// add the static middleware 
app.use(express.static(__dirname + '/public'))

// configure handlebars view engine; user handlebars.engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
}))
// adding routes for home and about page 

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

// app.listen(port, ()=> {
//     console.log(`It's the port ${port} for me. Press Ctrl+C to terminate`)
// })
if(require.main === module) {
    app.listen(port, ()=> {
        console.log(`Express started on http://localhost:${port}; press Ctrl+C to terminate`)
    })
} else {
    module.exports = app
}