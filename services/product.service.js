const  Boom  = require("@hapi/boom")
const Faker = require("faker")


class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  async generate(){
    const limit = 100

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: Faker.datatype.uuid(),
        name: Faker.commerce.productName(),
        price: parseInt(Faker.commerce.price(),10),
        image: Faker.image.imageUrl(),
        isBlock: Faker.datatype.boolean(),
      })
    }

  }

  async create(data) {

    const newProduct = {
      id: Faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  async find(){
    return this.products
  }

  async findOne(id){

    const product = this.products.find(item => item.id ===id)

    if( !product){
      throw Boom.notFound('Product not found')
    }
    if(product.isBlock){
      throw Boom.conflict('Product is block')
    }

    return product

  }

  async update(id, changes){

    const index =  this.products.findIndex(item => item.id ===id)

    if(index === -1){
      throw Boom.notFound('Product not found')
    }

    const product = this.products[index]

    this.products[index] = {
      ...product,
      ...changes
    }

    return this.products[index]

  }

  async delete( id){

    const index =  this.products.findIndex(item => item.id ===id)

    if(index === -1){
      throw Boom.notFound('Product not found')
    }

    this.products.splice(index,1)

    return {id}
  }
}

module.exports = ProductService
