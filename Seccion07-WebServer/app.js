const express = require('express')
const hbs = require('hbs')
const app = express()
const PORT = 3000


app.set('view engine', 'hbs')

//Middleware
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Wilmer Rodriguez',
    titulo: 'Curso Nodejs'
  })
})

app.get('/generic', (req, res) => {
  res.sendFile(__dirname + '/public/generic.html')
})

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public/elements.html')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})
app.listen(PORT, () => {
  console.log(`App listening in port: ${PORT}`)
})