import userModel from '../model/userModel.ts'

export interface UserType {
  user_id: string
  email: string
  name: string
  password: string
  role: string
}

const createUser = async (payload: UserType) => await userModel.create(payload)

const findUserByEmail = async (email: string) => {
  return userModel.findOne({ email })
}

export { createUser, findUserByEmail }
