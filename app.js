const express = require('express')
const fs = require('fs');
const { stat } = require('fs/promises');
const Handlebars = require("handlebars");

const getFile = (file) => Handlebars.compile(fs.readFileSync(`./views/${file}.html`, 'utf8'))

const app = express()
const port = 3100

app.get('/', (_, res) => {
    const html = getFile('index')()
    res.send(html)
})

app.get('/random-number', (_, res) => {
    const randomNumber = Math.floor(Math.random() * 100)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    const html = getFile('random-number')({ randomNumber, randomColor })
    res.send(html)
})

app.get('/status-code', (req, res) => {
    const statusCode = req.query.status
    const html = getFile('image')({ src: `https://http.dog/${statusCode}.jpg` })
    res.send(html)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})