import Joi from 'joi';

const ticketSchema = Joi.object({
  id: Joi.number(),

  open: Joi.boolean(),

  openDate: Joi.date(),

  type: Joi.string().max(255),

  details: Joi.string().max(255),

  tenantId: Joi.number(),

  propertyId: Joi.number(),

  ownerId: Joi.string(),
});

export default ticketSchema;
