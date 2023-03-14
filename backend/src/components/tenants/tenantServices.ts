import * as TenantDAL from './tenantDAL';
import * as TenantContexts from './tenant';

const createTenantService = async (tenantContext: TenantContexts.TenantCreateContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
  const userId = +tenantContext.userId;
  const propertyId = +tenantContext.properties;
  if (isNaN(userId) || userId < 0) {
    tenantReturn.message = 'Invalid user id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  if (isNaN(propertyId) || propertyId < 0) {
    tenantReturn.message = 'Invalid property id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const propertyIdInput: TenantContexts.PropertyConnectInput = {
    connect: {
      id: propertyId,
    },
  };
  const findTenant = await TenantDAL.getTenantByEmail(tenantContext.email);
  if (findTenant === null) {
    const newTenant = await TenantDAL.createNewTenant(
      userId,
      propertyIdInput,
      tenantContext
    );
    tenantReturn.data = newTenant;
    tenantReturn.status = 200;
    tenantReturn.message = 'Tenant successfully created';
  } else {
    tenantReturn.message = 'Tenant already exists';
    tenantReturn.status = 409;
  }
  return tenantReturn;
};

export { createTenantService };
