const express = require('express')
const fs = require('fs')
// const { createProxyMiddleware } = require('http-proxy-middleware')
const cityRouter = require('./routes/city')

const app = express()

// app.use('/v1', createProxyMiddleware({ target: 'http://elm.cangdu.org', changeOrigin: true }))

app.use('/city', cityRouter)

app.use('/advertisement', (req, res) => {
  res.json({
    code: 0,
    data: [
      'https://aecpm.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg',
      'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
      'https://picasso.alicdn.com/imgextra/i3/345515/O1CNA1NPhT1q100d8b76c37c0b832c11000c_!!345515-0-picassobanner.jpg',
      'https://gw.alicdn.com/imgextra/i3/30625/O1CN01TbcCkG1GUI98PuyRl_!!30625-0-lubanu.jpg',
    ],
  })
})

app.listen(3000, () => {
  console.log('server started at port 3000!')
})
