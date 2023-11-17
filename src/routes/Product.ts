import { Router, type Request, type Response } from 'express'
import { logger } from '../utils/logger.ts'
import { productValidation } from '../validation/productValidation.ts'
import ProductController from '../controllers/ProductController.ts'

export const ProductRouter: Router = Router()

ProductRouter.get('/', ProductController.getProduct)
ProductRouter.get('/:name', ProductController.getProduct)
ProductRouter.post('/', ProductController.create)
