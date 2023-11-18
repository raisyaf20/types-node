import { Router } from 'express'
import AuthController from '../controllers/AuthController.ts'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.session)
