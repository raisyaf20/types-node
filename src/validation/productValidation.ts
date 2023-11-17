import Joi from 'joi'

interface ProdType {
  name: string
  price: number
}

const productValidation = (payload: ProdType) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload)
}

export { productValidation }
