const express = require('express')
const hbs = require('hbs')
require('dotenv').config()



const PORT = process.env.PORT
const app = express()

//Handlebars
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

//Middleware
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Wilmer Rodriguez',
    titulo: 'Curso Nodejs'
  })
})

app.get('/generic', (req, res) => {
  res.render('generic', {
    nombre: 'Wilmer Rodriguez',
    titulo: 'Curso Nodejs'
  })
})

app.get('/elements', (req, res) => {
  res.render('elements', {
    nombre: 'Wilmer Rodriguez',
    titulo: 'Curso Nodejs'
  })})

app.get('*', (req, res) => {
  res.render('404')})
app.listen(PORT, () => {
  console.log(`App listening in port: ${PORT}`)
})