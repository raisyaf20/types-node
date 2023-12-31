import Joi from 'joi'
import { type UserType } from '../services/AuthService.ts'

const createUserValidation = (payload: UserType) => {
  return Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().min(4).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().required()
  }).validate(payload)
}
const createSessionValidation = (payload: UserType) => {
  return Joi.object({
    email: Joi.string().min(4).required(),
    password: Joi.string().min(4).required()
  }).validate(payload)
}
const refreshSessionValidation = (payload: UserType) => {
  return Joi.object({
    refresh: Joi.string().required()
  }).validate(payload)
}

export { createUserValidation, createSessionValidation, refreshSessionValidation }
