const express = require('express')
const expressHandlebars = require('express-handlebars')

const fortune = require('./lib/fortune')

const app = express()
const port = process.env.PORT || 3000

/**
 * Array of Fortunes
 */

// const fortunes = [
//     'Conquer your fears or they will conquer you',
//     'Rivers need springs',
//     'Do not fear what you don\'t know',
//     'You will have a pleasant surprise',
//     'Whenever possible, keep it simple'
// ]


app.use(express.static(__dirname + '/public'))

// Configure hadlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

/**
 * Routes
 */
// get and post two most common
// two parameters: path and a function
// app.get('/', (req, res)=> {
//     // console.log('home')
//     res.type('text/plain')
//     res.send('Meadowlark Travel')
// })

// app.get('/about', (req, res)=> {
//     res.type('text/plain')
//     res.send('About Meadowlark Travel')
// })

// // custom 404 page 
// app.use((req, res)=> {
//     res.type('text/plain')
//     res.status(404)
//     res.send('404 - Not Found')
// })

// // custom 500 page 
// app.use((err, req, res, next)=> {
//     console.error(err.message)
//     res.type('text/plain')
//     res.status(500)
//     res.send('500 - Server Error')
// })

/*
 * Replace old routes with new ones using views
 */
app.get('/', (req, res) => res.render('home'))

// app.get('/about', (req, res) => res.render('about'))
// modify route to about
app.get('/about', (req, res)=> {
    // const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: fortune.getFortune()})
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, ()=> console.log(
    `Express started on http://localhost:${port}, ` + `press Ctrl-C to terminate...`
))