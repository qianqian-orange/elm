const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const shopList = []
let search = null
fs.readFile(path.join(__dirname, '../json/shop.json'), 'utf-8', (err, data) => {
  if (err) return
  shopList.push(...JSON.parse(data).items)
})
fs.readFile(path.join(__dirname, '../json/search.json'), 'utf-8', (err, data) => {
  if (err) return
  search = JSON.parse(data)
})

router.get('/sort', (req, res) => {
  axios.get('https://h5.ele.me/restapi/swarm/shops/entrance/get_sort_filter', {
    params: {
      longitude: 116.437356,
      latitude: 23.242659,
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

router.get('/hot_words', (req, res) => {
  axios.get('https://h5.ele.me/restapi/swarm/v2/hot_search_words', {
    params: {
      longitude: 116.437356,
      latitude: 23.242659,
    },
  }).then(({ data }) => {
    res.json({ code: 0, data })
  }).catch((e) => {
    console.log(e)
    res.json({ code: 1 })
  })
})

router.get('/search', (req, res) => {
  res.json({
    code: 0,
    data: search,
  })
})

module.exports = router
