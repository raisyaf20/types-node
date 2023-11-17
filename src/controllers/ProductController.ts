import { type Response, type Request, type NextFunction } from 'express'
import { productValidation, updateProductValidation } from '../validation/productValidation.ts'
import { logger } from '../utils/logger.ts'
import {
  addProductMongo,
  deleteProductById,
  getProductByid,
  getProductMongo,
  updateProductByid
} from '../services/productService.ts'
import { v4 as uuid } from 'uuid'

export interface ProdType {
  _id: string
  name: string
  price: number
  size: string
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  req.body.product_id = uuid()
  const { error, value } = productValidation(req.body)
  if (error) {
    logger.error('product validate error : ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await addProductMongo(value)
    logger.info('Success add new product')
    res.status(201).send({ StatusCode: 201, status: true, message: 'Add data product success' })
  } catch (e) {
    logger.info('ERR : product-create ', e)
    res.status(200).send({ StatusCode: 422, status: true, message: e })
  }
}

const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const prod: any = await getProductMongo()

  if (id) {
    const prodId = await getProductByid(id)
    if (prodId) {
      res.status(200).send({ StatusCode: 200, status: true, message: 'Success get detail', data: prodId })
    } else {
      res.status(404).send({ StatusCode: 404, status: true, message: 'Not found' })
    }
  } else {
    res.status(200).send({ StatusCode: 200, status: true, data: prod })
  }
}

const update = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error('Error product-update : ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await updateProductByid(id, value)
    return res.status(200).send({ status: true, statusCode: 200, updated: value })
  } catch (err) {
    return res.status(422).send({ status: false, statusCode: 422, error: { err } })
  }
}

const destroy = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const result = await deleteProductById(id)
    if (result) {
      logger.info('Success delete product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete Product Success' })
    } else {
      return res.status(404).send({ status: false, statusCode: 404, error: { message: 'Data not found' } })
    }
  } catch (err) {
    logger.error('Error product-delete', err)
    return res.status(422).send({ status: false, statusCode: 422, error: { message: err } })
  }
}

export default { create, getProduct, update, destroy }
