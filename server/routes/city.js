const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/list', (req, res) => {
  axios.post('https://i.waimai.meituan.com/openh5/opencity/list')
    .then(({ data }) => {
      res.json({ code: 0, data: data.data })
    })
    .catch((e) => {
      console.log(e)
      res.json({ code: 1, message: 'get data fail' })
    })
})

module.exports = router
