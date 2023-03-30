import Joi from 'joi';

const leaseSchema = Joi.object({
  endDate: Joi.date(),
  startDate: Joi.date(),
  months: Joi.number(),
  monthlyRent: Joi.number(),
  tenantid: Joi.number(),
  propertyid: Joi.number(),
  id: Joi.number(),
});

export default leaseSchema;
