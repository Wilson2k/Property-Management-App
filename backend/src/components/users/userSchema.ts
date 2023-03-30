import Joi from 'joi';

const userSchema = Joi.object({
  id: Joi.string().max(255),

  firstName: Joi.string().min(2).max(30),

  lastName: Joi.string().min(2).max(30),

  email: Joi.string().email({ minDomainSegments: 2 }),

  password: Joi.string().min(8).max(255),
});

export default userSchema;
