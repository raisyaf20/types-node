import { logger } from '../utils/logger.ts'
import productModel from '../model/productModel.ts'
import { type ProdType } from '../controllers/ProductController.ts'

const getProductMongo = async () => {
  return productModel
    .find()
    .then((respon) => {
      return respon
    })
    .catch((err) => {
      logger.info('Cannot get data products')
      logger.error(err)
    })
}

const addProductMongo = async (payload: ProdType) => {
  return productModel.create(payload)
}

const getProductByid = async (id: string) => {
  return productModel.findOne({ product_id: id })
}

const updateProductByid = async (id: string, payload: ProdType) => {
  return productModel.findOneAndUpdate({ product_id: id }, { $set: payload })
}

const deleteProductById = async (id: string) => productModel.findOneAndDelete({ product_id: id })

export { getProductMongo, addProductMongo, getProductByid, updateProductByid, deleteProductById }
