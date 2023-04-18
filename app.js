const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars') 
require('./config/mongoose')
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', 'hbs')
app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(PORT,()=>{
  console.log(`App is running on http://localhost:${PORT}`)
})