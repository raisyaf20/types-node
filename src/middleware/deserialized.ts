import { type Request, type Response, type NextFunction } from 'express'
import { verifyTokenJWT } from '../utils/jwt.ts'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken: any = req.headers.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    return next()
  }
  const { decoded, expired } = verifyTokenJWT(accessToken)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }
  if (expired) {
    return next()
  }

  return res.status(401).json({ error: 'Invalid token' })
}

export default deserializeUser
