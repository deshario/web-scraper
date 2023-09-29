import Joi from 'joi'

export const previewSchema = Joi.object().keys({
  id: Joi.number().required(),
})
