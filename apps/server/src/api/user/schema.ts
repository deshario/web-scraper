import Joi from 'joi'

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const refreshTokenSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
})
