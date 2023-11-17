import { type Application, type Router } from 'express'
import { HealthRouter } from './health.ts'
import { ProductRouter } from './Product.ts'
import { AuthRouter } from './authRoute.ts'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRouter]
]

export const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
