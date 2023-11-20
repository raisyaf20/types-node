import { type Request, type Response, type NextFunction } from 'express'

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) res.sendStatus(403)
  return next()
}

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user || user._doc.role !== 'admin') {
    return res.sendStatus(403)
  }
  return next()
}

export { requireUser, requireAdmin }
