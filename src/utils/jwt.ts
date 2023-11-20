import jwt from 'jsonwebtoken'
import { type SignOptions } from 'jsonwebtoken'
import CONFIG from '../config/environment.ts'
import * as fs from 'fs'
import * as path from 'path'
import { findUserByEmail } from '../services/AuthService.ts'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = new URL(import.meta.url).pathname
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

const privateKeyPath = path.join(__dirname, 'private.pem')
const publicKeyPath = path.join(__dirname, 'public.pem')

// Read the ECDSA private key from the file
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const publicKey = fs.readFileSync(publicKeyPath, 'utf8')

// eslint-disable-next-line @typescript-eslint/ban-types
export const signJWT = (payload: Object, options: SignOptions | undefined) => {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyTokenJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}

export const reIssueAccessToken = async (token: string) => {
  const { decoded }: any = verifyTokenJWT(token)
  const user = await findUserByEmail(decoded._doc.email)
  if (!user) return false

  return signJWT({ ...user }, { expiresIn: '1d' })
}
