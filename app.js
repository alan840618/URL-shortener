const express = require('express')
const app = express()
const PORT = 3000
require('./config/mongoose')

app.get('/',(req,res)=>{
  res.send('hello world')
})

app.listen(PORT,()=>{
  console.log(`App is running on http://localhost:${PORT}`)
})