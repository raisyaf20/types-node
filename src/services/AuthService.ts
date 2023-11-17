import userModel from '../model/userModel.ts'

export interface UserType {
  user_id: string
  email: string
  name: string
  password: string
  role: string
}

const createUser = async (payload: UserType) => userModel.create(payload)

export { createUser }
