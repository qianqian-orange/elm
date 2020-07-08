const express = require('express')
const fs = require('fs')
const path = require('path')
const compression = require('compression')
const favicon = require('express-favicon')
const { createBundleRenderer } = require('vue-server-renderer')
const cityRouter = require('./routes/city')
const advertisementRouter = require('./routes/advertisement')
const kindRouter = require('./routes/kind')
const shopRouter = require('./routes/shop')

const resolve = (...paths) => path.join(__dirname, ...paths)
const app = express()
app.use(compression())
app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use('/elm/static/', express.static(path.join(__dirname, './public/static')))

app.use('/elm/api/city', cityRouter)
app.use('/elm/api/advertisement', advertisementRouter)
app.use('/elm/api/kind', kindRouter)
app.use('/elm/api/shop', shopRouter)

const isDev = process.env.NODE_ENV === 'development'

let renderer
let readyPromise
const templatePath = resolve('./index.template.html')


if (isDev) {
  readyPromise = require('../config/ssr/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createBundleRenderer(bundle, Object.assign(options, {
        runInNewContext: false,
      }))
    }
  )
} else {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./public/vue-ssr-server-bundle.json')
  const manifest = require('./public/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(bundle, {
    template,
    clientManifest: manifest,
    runInNewContext: false,
  })
}

function handler (req, res, next) {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) return next(err)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.send(html)
  })
}

if (isDev) {
  const fn = handler
  handler = function (req, res, next) {
    readyPromise.then(() => fn(req, res, next))
  }
}

app.use(handler)

app.use((err, req, res, next) => {
  if (err.url) {
    res.redirect(err.url)
  } else {
    console.log(err)
    res.json({ code: 1 })
  }
})

app.listen(4000, () => {
  console.log('service start at port 4000!')
})

