const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const shopList = []
fs.readFile(path.join(__dirname, '../json/shop.json'), 'utf-8', (err, data) => {
  if (err) return
  shopList.push(...JSON.parse(data).items)
})

router.get('/sort', (req, res) => {
  const { longitude, latitude } = req.query
  axios.get('https://h5.ele.me/restapi/swarm/shops/entrance/get_sort_filter', {
    params: {
      longitude,
      latitude,
    },
  })
    .then(({ data }) => {
      res.json({ code: 0, data })
    })
    .catch((e) => {
      console.log(e)
      res.json({ code: 1 })
    })
})

router.get('/recommend', (req, res) => {
  const { currentPage, pageSize } = req.query
  res.json({
    code: 0,
    data: shopList.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  })
})

module.exports = router
