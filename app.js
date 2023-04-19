const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000
const URL = require('./models/URL')
const shortener = require('./utils/shortener')
const bodyParser = require('body-parser')
require('./config/mongoose')
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
//主路由設定
app.get('/',(req,res)=>{
  res.render('index')
})
//縮短網址路由
app.post('/', (req, res) => {
  let shortUrl = shortener(5)
  const originUrl = req.body.url
  if (!originUrl) {
    return res.status(400).render('reminder')
  }
  URL.findOne({ originUrl})
    .lean()
    .then(data=>{
      if(data){
        res.render('index', { origin: req.headers.origin, url: data })
        }else{
        URL.create({ shortUrl, originUrl })
          .then(data => {
            res.render('index', { origin: req.headers.origin, url: data })
          })
        }
    })
    .catch(error => console.error(error))
  })

//重新倒回原網址
app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl
    URL.findOne({ shortUrl: shortUrl })
    .lean()
    .then(data => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortUrl,
        })
      }
      res.redirect(data.originUrl)
    })
    .catch((error) => console.log(error))
})
app.listen(PORT,()=>{
  console.log(`App is running on http://localhost:${PORT}`)
})