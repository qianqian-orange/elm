const path = require('path')
const fs = require('fs')
const express = require('express')
const cityRouter = require('./routes/city')
const advertisementRouter = require('./routes/advertisement')
const kindRouter = require('./routes/kind')
const shopRouter = require('./routes/shop')

const app = express()

app.use('/elm/static/', express.static(path.join(__dirname, './public/static')))

app.use('/elm/api/city', cityRouter)
app.use('/elm/api/advertisement', advertisementRouter)
app.use('/elm/api/kind', kindRouter)
app.use('/elm/api/shop', shopRouter)

app.use((req, res) => {
  fs.readFile(path.join(__dirname, './public/static/index.html'), 'utf-8', (err, data) => {
    if (err) return res.json({ code: 1 })
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(data)
  })
})

app.listen(4000, () => {
  console.log('server started at port 4000!')
})
