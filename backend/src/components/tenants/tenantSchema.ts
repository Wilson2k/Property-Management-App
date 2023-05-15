import Joi from 'joi';

// 1-999-999-9999 Regular Expression
const phoneNumber = new RegExp(/^(1-)?\d{3}-\d{3}-\d{4}$/);

const tenantSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30),

  lastName: Joi.string().alphanum().min(2).max(30),

  email: Joi.string().email({ minDomainSegments: 2 }),

  phone: Joi.string().min(12).max(14).pattern(phoneNumber),

  id: Joi.number(),

  propertyid: Joi.number(),

  userId: Joi.string().max(255),
});

export default tenantSchema;
