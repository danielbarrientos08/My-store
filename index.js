
const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res)=> {
  res.send('Hola de sde express')
})

app.listen(port, () =>{
  console.log('Server on  port:', port)
})
