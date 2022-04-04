
const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const  { logErrors, errorHandler, boomErrorHandler  } = require('./middlewares/error.handler')



const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

const whiteList = ['http://localhost:8000','http://localhost:3000']

const options = {
  origin: (origin, callback)=>{
    if(whiteList.includes(origin) || ! origin){
      callback(null, true)
    }
    else{
      callback(new Error (' No permitido'))
    }
  }
}


app.use(cors(options))

app.get('/', (req, res)=> {
  res.send('Hola desde express')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () =>{
  console.log('Server on  port:', port)
})
