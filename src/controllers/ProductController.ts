import { type Response, type Request } from 'express'
import { productValidation } from '../validation/productValidation.ts'
import { logger } from '../utils/logger.ts'

interface ProdType {
  name: string
  price: number
}

const prod: ProdType[] = [
  { name: 'baju', price: 1200 },
  { name: 'sepatu', price: 2100 },
  { name: 'sepatu', price: 211230 },
  { name: 'sendal', price: 1423 },
  { name: 'sendal ijo', price: 1423123 }
]

const create = (req: Request, res: Response) => {
  const { error, value } = productValidation(req.body)
  if (error) {
    logger.error('product validate error : ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  logger.info('Success add new product')
  res.status(200).send({ StatusCode: 200, status: true, message: 'Add data product success', data: value })
}

const getProduct = (req: Request, res: Response) => {
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = prod.filter((e) => e.name === name)

    if (filterProduct.length < 1) {
      return res.status(404).send({ StatusCode: 404, status: false, mesagge: name + ' Not Found' })
    }
    res.status(200).send({ StatusCode: 200, status: true, mesagge: 'get : ' + name, data: filterProduct })
  }

  res.status(200).send({ StatusCode: 200, status: true, data: prod })
}

export default { create, getProduct }
