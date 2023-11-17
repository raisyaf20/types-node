import { Router } from 'express'
import ProductController from '../controllers/ProductController.ts'

export const ProductRouter: Router = Router()

ProductRouter.get('/', ProductController.getProduct)
ProductRouter.get('/:id', ProductController.getProduct)
ProductRouter.post('/', ProductController.create)
ProductRouter.put('/:id', ProductController.update)
ProductRouter.delete('/:id', ProductController.destroy)
