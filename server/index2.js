const express = require('express')
const axios = require('axios')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

app.use('/test', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }))

app.use('/login', createProxyMiddleware({ target: 'https://h5.ele.me/', changeOrigin: true }))

// app.use('/test', (req, res) => {
//   axios.get('http://localhost:3000/test')
//     .then((response) => {
//       console.log(response.headers)
//       res.end('ok')
//     })
// })

app.listen(4000, () => {})
