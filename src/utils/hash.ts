import bcrypt from 'bcrypt'

// encode
export const hashSyncPw = (pw: string) => bcrypt.hashSync(pw, 10)
