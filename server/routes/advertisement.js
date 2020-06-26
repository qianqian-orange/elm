const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.json({
    code: 0,
    data: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592670666034&di=b52bba07c0762d62c5ab8b97e398fa5e&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F96%2F79%2F1357ee107a6a780.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592670762275&di=39de4616a8aec973abfdc6f7198ba086&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F95%2F65%2F8257edc24228152.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592670814778&di=1762e215aa8d9f18265ebb7f8ca34def&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F08%2F23%2F07%2Fs_1024_55ca21732a9d7.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592670830287&di=15a3c6dcbc4584552e1ec7e4fe4254b1&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F96%2F78%2F2457ee0c6e11682.jpg%2521%2Fwatermark%2Ftext%2FOTDorr7orqE%3D%2Ffont%2Fsimkai%2Falign%2Fsoutheast%2Fopacity%2F20%2Fsize%2F50',
    ],
  })
})

module.exports = router
