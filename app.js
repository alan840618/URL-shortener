const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const URL = require('./models/URL')
const shortener = require('./utils/shortener')
require('./config/mongoose')
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', 'hbs')
//主路由設定
app.get('/',(req,res)=>{
  res.render('index')
})
//縮短網址路由
app.post('/', (req, res) => {
  const shortUrl = shortener(5)
  URL.findOne({ originUrl: req.body.url })
    .then(data=>{
      data ? data : URL.create({ shortUrl, originUrl: req.body.url })
    })
    .then(data=>{
      res.render('index', {
        origin: req.headers.origin,
        shortUrl: data.shortUrl,
      })
    })
    .catch(error => console.error(error))
})
//輸入短網址重新倒回原網址
app.get('/:shortUrl', (req, res) => {
    URL.findOne({ shortUrl: req.params.shortUrl })
    .then(data => {
      if (!data) {
        return res.render("error", {
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