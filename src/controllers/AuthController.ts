import { type Request, type Response } from 'express'
import { v4 as uuid } from 'uuid'
import { createSessionValidation, createUserValidation } from '../validation/authValidation.ts'
import { logger } from '../utils/logger.ts'
import { checkPassword, hashSyncPw } from '../utils/hash.ts'
import { createUser, findUserByEmail } from '../services/AuthService.ts'
import { signJWT } from '../utils/jwt.ts'

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

const session = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)
  if (error) {
    logger.error('Error auth-session : ', error.details[0].message)
    return res.status(422).send({ statu: false, statusCode: 422, errors: { message: error.details[0].message } })
  }
  try {
    const user: any = await findUserByEmail(value.email)
    const isValid = checkPassword(value.password, user.password)
    if (!isValid) {
      return res
        .status(401)
        .send({ statu: false, statusCode: 401, errors: { message: 'Email or Password worng, please check again' } })
    }
    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    logger.info(accessToken)
    return res
      .status(200)
      .send({ statu: true, statusCode: 200, message: 'Loggin Success', data: { token: accessToken } })
  } catch (err: any) {
    logger.error(err)
    return res.status(422).send({ statu: false, statusCode: 422, errors: { message: err.message } })
  }
}

export default { register, session }
