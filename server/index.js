const express = require('express')
const axios = require('axios')
const cityRouter = require('./routes/city')
const advertisementRouter = require('./routes/advertisement')
const kindRouter = require('./routes/kind')
const shopRouter = require('./routes/shop')

const app = express()

app.use('/city', cityRouter)
app.use('/advertisement', advertisementRouter)
app.use('/kind', kindRouter)
app.use('/shop', shopRouter)

app.listen(3000, () => {
  console.log('server started at port 3000!')
})
