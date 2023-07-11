import Joi from 'joi';

const leaseSchema = Joi.object({
  endDate: Joi.date(),

  startDate: Joi.date(),

  months: Joi.number(),

  monthlyRent: Joi.number(),

  tenantId: Joi.number(),

  propertyId: Joi.number(),

  id: Joi.number(),
});

export default leaseSchema;
