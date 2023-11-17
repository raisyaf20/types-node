import { type Request, type Response } from 'express'
import { v4 as uuid } from 'uuid'
import { createUserValidation } from '../validation/authValidation.ts'
import { logger } from '../utils/logger.ts'
import { hashSyncPw } from '../utils/hash.ts'
import { createUser } from '../services/AuthService.ts'

const register = async (req: Request, res: Response) => {
  req.body.user_id = uuid()
  const { error, value } = createUserValidation(req.body)
  if (error) {
    logger.error('Error auth-register : ', error.details[0].message)
    return res.status(422).send({ statu: false, statusCode: 422, errors: { message: error.details[0].message } })
  }

  try {
    value.password = `${hashSyncPw(value.password)}`
    await createUser(value)
    return res.status(200).send({ status: true, statusCode: 200, message: 'Success register' })
  } catch (err) {
    return res.status(422).send({ statu: false, statusCode: 422, errors: { message: err } })
  }
}

export default { register }
