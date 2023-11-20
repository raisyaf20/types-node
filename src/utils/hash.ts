import bcrypt from 'bcrypt'

// encode
export const hashSyncPw = (pw: string) => bcrypt.hashSync(pw, 10)

export const checkPassword = (pw: string, userPassword: string) => bcrypt.compareSync(pw, userPassword)
