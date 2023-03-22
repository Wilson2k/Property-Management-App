import * as TenantDAL from './tenantDAL';
import * as TenantContexts from './tenant';

const getTenantByIdService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error getting tenant',
    status: 404,
  };
  if (tenantContext.id != null) {
    const tenantId = +tenantContext.id;
    if (isNaN(tenantId) || tenantId < 0) {
      tenantReturn.status = 422;
      tenantReturn.message = 'Bad tenant id';
      return tenantReturn;
    }
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord !== null) {
      tenantReturn.status = 200;
      tenantReturn.message = 'Tenant found';
      tenantReturn.data = tenantRecord;
      return tenantReturn;
    }
  }
  return tenantReturn;
};

const getTenantByEmailService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error getting tenant',
    status: 404,
  };
  if (tenantContext.email != null) {
    const tenantEmail = tenantContext.email;
    const tenantRecord = await TenantDAL.getTenantByEmail(tenantEmail);
    if (tenantRecord !== null) {
      tenantReturn.status = 200;
      tenantReturn.message = 'Tenant found';
      tenantReturn.data = tenantRecord;
      return tenantReturn;
    }
  }
  return tenantReturn;
};

const getTenantByPhoneService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error getting tenant',
    status: 404,
  };
  if (tenantContext.phone != null) {
    const tenantPhone = tenantContext.phone;
    const tenantRecord = await TenantDAL.getTenantByPhone(tenantPhone);
    if (tenantRecord !== null) {
      tenantReturn.status = 200;
      tenantReturn.message = 'Tenant found';
      tenantReturn.data = tenantRecord;
      return tenantReturn;
    }
  }
  return tenantReturn;
};

// Returns list of tenants that live within a specific property
const getTenantsByProperty = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.MultTenantReturnContext = {
    message: 'Error getting tenants',
    status: 400,
  };
  if (tenantContext.propertyId != null) {
    const propertyId = +tenantContext.propertyId;
    if (isNaN(propertyId) || propertyId < 0) {
      tenantReturn.status = 422;
      tenantReturn.message = 'Bad property id';
      return tenantReturn;
    }
    const tenants = await TenantDAL.getTenantsByProperty(propertyId);
    if (tenants !== null) {
      if (tenants.length === 0) {
        tenantReturn.message = 'Property has no tenants';
      } else {
        tenantReturn.message = 'Tenants found';
      }
      tenantReturn.status = 200;
      tenantReturn.data = tenants;
      return tenantReturn;
    }
  }
};

const createTenantService = async (tenantContext: TenantContexts.TenantCreateContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
  const { userId, propertyId, ...tenantInput } = { ...tenantContext };
  if (userId == null) {
    tenantReturn.message = 'Bad user id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  if (propertyId == null) {
    tenantReturn.message = 'Bad property id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const userIdInput = +userId;
  if (isNaN(userIdInput) || userIdInput < 0) {
    tenantReturn.message = 'Invalid user id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const propertyIdNum = +propertyId;
  if (isNaN(propertyIdNum) || propertyIdNum < 0) {
    tenantReturn.message = 'Invalid property id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const propertyIdInput: TenantContexts.PropertyConnectInput = {
    connect: {
      id: propertyIdNum,
    },
  };
  const findTenant = await TenantDAL.getTenantByEmail(tenantContext.email);
  if (findTenant === null) {
    const newTenant = await TenantDAL.createNewTenant(
      userIdInput,
      propertyIdInput,
      tenantInput
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
  return tenantReturn;
};

const deleteTenantService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error deleting tenant',
    status: 400,
  };
  if (tenantContext.id != null) {
    const tenantId = +tenantContext.id;
    if (isNaN(tenantId) || tenantId < 0) {
      tenantReturn.message = 'Bad tenant id';
      tenantReturn.status = 422;
      return tenantReturn;
    }
    const tenantRecord = await TenantDAL.deleteTenant(tenantId);
    if (tenantRecord != null) {
      tenantReturn.message = 'Tenant deleted';
      tenantReturn.data = tenantRecord;
      tenantReturn.status = 200;
    }
  }
  return tenantReturn;
};

export {
  createTenantService,
  updateTenantService,
  deleteTenantService,
  getTenantByEmailService,
  getTenantByIdService,
  getTenantByPhoneService,
  getTenantsByProperty,
};
