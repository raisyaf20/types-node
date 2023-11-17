import Joi from 'joi'
import { type ProdType } from '../controllers/ProductController'

const productValidation = (payload: ProdType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().min(4).required(),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

const updateProductValidation = (payload: ProdType) => {
  return Joi.object({
    name: Joi.string().min(4),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  }).validate(payload)
}

export { productValidation, updateProductValidation }
