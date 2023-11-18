import jwt from 'jsonwebtoken'
import { type SignOptions } from 'jsonwebtoken'
import CONFIG from '../config/environment.ts'
import * as fs from 'fs'
import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = new URL(import.meta.url).pathname
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename)

const privateKeyPath = path.join(__dirname, 'private.pem')

// Read the ECDSA private key from the file
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')

// eslint-disable-next-line @typescript-eslint/ban-types
export const signJWT = (payload: Object, options: SignOptions | undefined) => {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}
