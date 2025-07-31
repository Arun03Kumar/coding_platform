const express = require('express')
const bodyparser = require('body-parser')
const { PORT } = require('./config/server.config')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(bodyparser.text())

app.get('/ping', (req, res) => {
    return res.json({
        message: "problem service is alive"
    })
})

app.listen(PORT, () => {
    console.log("server started at port:", PORT);
})