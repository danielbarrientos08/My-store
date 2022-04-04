

const { Router } = require('express')
const faker = require('faker')

const router = Router()

router.get('/', (req, res)=> {

  const products = []
  const { size } = req.query
  const limit = size || 10

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
    })
  }

  res.status(200).json(products)
})

router.post('/', (req, res)=> {

  const body = req.body
  res.status(201).json({
    message: 'Created',
    data: body
  })
})
router.get('/filter', (req, res)=> {


  res.status(200).json('filtyer')
})

router.get('/:id', (req, res)=> {

  res.status(200).json('get one')
})


module.exports = router

