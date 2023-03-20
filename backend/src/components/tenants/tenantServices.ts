import * as TenantDAL from './tenantDAL';
import * as TenantContexts from './tenant';

const getTenantByIdService = async (TenantContexts: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
};

const getTenantByEmailService = async (TenantContexts: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
};

const getTenantByPhoneService = async (TenantContexts: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
};

// Returns list of tenants that live within a specific property
const getTenantsByProperty = async (TenantContexts: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
};

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

const updateTenantService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error updating tenant',
    status: 400,
  };
  if (tenantContext.id != null && tenantContext.userId != null) {
    const { id, ...updateData } = tenantContext;
    const updateInput: TenantContexts.TenantUpdateInput = updateData;
    // Check valid tenant id
    const tenantId = +id;
    if (isNaN(tenantId) || tenantId < 0) {
      tenantReturn.message = 'Bad tenant id';
      tenantReturn.status = 422;
      return tenantReturn;
    }
    // Check that tenant exists
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord == null) {
      tenantReturn.message = 'Tenant not found';
      tenantReturn.status = 404;
      return tenantReturn;
    }
    // If update data is same as database, ignore it
    updateInput.email =
      updateInput.email === tenantRecord.email ? undefined : updateInput.email;
    updateInput.phone =
      updateInput.phone === tenantRecord.phone ? undefined : updateInput.phone;
    // Check for duplicate email
    if (updateInput.email != null) {
      const tenantDuplicate = await TenantDAL.getTenantByEmail(updateInput.email);
      if (tenantDuplicate != null) {
        tenantReturn.message = 'Tenant email already exists';
        tenantReturn.status = 409;
        return tenantReturn;
      }
    }
    // Check for duplicate phone
    if (updateInput.phone != null) {
      const tenantDuplicate = await TenantDAL.getTenantByPhone(updateInput.phone);
      if (tenantDuplicate != null) {
        tenantReturn.message = 'Tenant phone already exists';
        tenantReturn.status = 409;
        return tenantReturn;
      }
    }
    // Check that update input data exists
    if (
      updateInput.email != null ||
      updateInput.firstName != null ||
      updateInput.lastName != null ||
      updateInput.phone != null
    ) {
      const updatedTenant = await TenantDAL.updateTenant(tenantId, updateInput);
      if (updatedTenant != null) {
        tenantReturn.message = 'Tenant updated';
        tenantReturn.data = updatedTenant;
        tenantReturn.status = 200;
      }
    } else {
      tenantReturn.message = 'No data input';
      tenantReturn.status = 400;
    }
  }
};

export { createTenantService, updateTenantService };
