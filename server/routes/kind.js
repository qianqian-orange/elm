const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.json({
    code: 0,
    data: [
      {
        img: 'https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '美食',
      },
      {
        img: 'https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '大牌惠吃',
      },
      {
        img: 'https://cube.elemecdn.com/e/58/bceb19258e3264e64fb856722c3c1jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '跑腿代购',
      },
      {
        img: 'https://cube.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '汉堡披萨',
      },
      {
        img: 'https://cube.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '甜品饮品',
      },
      {
        img: 'https://cube.elemecdn.com/0/1a/314b6da88ab6c7ae9828f91652d40jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '速食简餐',
      },
      {
        img: 'https://cube.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '地方小吃',
      },
      {
        img: 'https://cube.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '米粉面馆',
      },
      {
        img: 'https://cube.elemecdn.com/5/1a/dc885d2ce022d2ee60495acafb795jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '包子粥店',
      },
      {
        img: 'https://cube.elemecdn.com/a/78/0fb469b2da210827ec16896e00420jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_90,h_90/quality,q_90/format,webp',
        title: '炸鸡炸串',
      },
      {
        img: 'https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg',
        title: '商超便利',
      },
      {
        img: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
        title: '预订早餐',
      },
      {
        img: 'https://fuss10.elemecdn.com/a/fa/d41b04d520d445dc5de42dae9a384jpeg.jpeg',
        title: '新店特惠',
      },
      {
        img: 'https://fuss10.elemecdn.com/4/34/ea0d51c9608310cf41faa5de6b8efjpeg.jpeg',
        title: '果蔬生鲜',
      },
      {
        img: 'https://fuss10.elemecdn.com/6/1a/1e0f448be0624c62db416e864d2afjpeg.jpeg',
        title: '日韩料理',
      },
      {
        img: 'https://fuss10.elemecdn.com/8/83/171fd98b85dee3b3f4243b7459b48jpeg.jpeg',
        title: '鲜花蛋糕',
      },
      {
        img: 'https://fuss10.elemecdn.com/3/c7/a9ef469a12e7a596b559145b87f09jpeg.jpeg',
        title: '麻辣烫',
      },
    ],
  })
})

module.exports = router
