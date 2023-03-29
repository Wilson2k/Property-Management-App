import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import userSchema from '../components/users/userSchema';
import propertySchema from '../components/properties/propertySchema';
import tenantSchema from '../components/tenants/tenantSchema';
import leaseSchema from '../components/leases/leaseSchema';
import ticketSchema from '../components/tickets/ticketSchema';

// Map Joi schemas for validator function
const validationSchemas: { [K: string]: Joi.ObjectSchema } = {
    user: userSchema,
    property: propertySchema,
    tenant: tenantSchema,
    lease: leaseSchema,
    ticket: ticketSchema
};

// Middleware function to validate inputs
export const validator = (schema: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            if(!Object.hasOwn(validationSchemas, schema)){
                throw new Error(`'${schema}' validator is not exist`)
            }
            const validatedBody = await validationSchemas[schema].validateAsync(req.body);
            const validatedParams = await validationSchemas[schema].validateAsync(req.params);
            const validatedQuery = await validationSchemas[schema].validateAsync(req.query);
            req.body = validatedBody;
            req.params = validatedParams;
            req.query = validatedQuery;
            next()
        } catch(err){
            if(Joi.isError(err)){
                return res.status(422).send(err.message);
            }
            return res.status(500).send('Server error');
        }
    };
};