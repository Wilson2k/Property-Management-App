import Joi, { number } from 'joi';

const propertySchema = Joi.object({
  id: Joi.number(),

  tenantId: Joi.number(),

  tenantIds: Joi.array().items(Joi.number()),

  ownerId: Joi.string().max(255),

  address: Joi.string().max(255),

  city: Joi.string().max(255),

  state: Joi.string().max(255),

  type: Joi.string().max(255),

  size: Joi.number(),
});

export default propertySchema;
