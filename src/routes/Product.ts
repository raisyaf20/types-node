import { Router } from 'express'
import ProductController from '../controllers/ProductController.ts'
import { requireAdmin, requireUser } from '../middleware/auth.ts'

export const ProductRouter: Router = Router()

ProductRouter.get('/', ProductController.getProduct)
ProductRouter.get('/:id', ProductController.getProduct)
ProductRouter.post('/', requireAdmin, ProductController.create)
ProductRouter.put('/:id', requireAdmin, ProductController.update)
ProductRouter.delete('/:id', requireAdmin, ProductController.destroy)
