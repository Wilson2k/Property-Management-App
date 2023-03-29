import * as TenantDAL from './tenantDAL';
import * as TenantContexts from './tenant';
import { getPropertyById } from '../properties/propertyDAL';
import { getDatabaseId } from '../../utils/hashId';

const getTenantByIdService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error getting tenant',
    status: 404,
  };
  if (tenantContext.id != null && tenantContext.userId != null) {
    const tenantId = +tenantContext.id;
    if (isNaN(tenantId) || tenantId < 0) {
      tenantReturn.status = 422;
      tenantReturn.message = 'Bad tenant id';
      return tenantReturn;
    }
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (tenantRecord !== null) {
      if (tenantRecord.userId != user) {
        tenantReturn.status = 401;
        tenantReturn.message = 'Not authorized to get tenant';
        return tenantReturn;
      }
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
  if (tenantContext.email != null && tenantContext.userId != null) {
    const tenantEmail = tenantContext.email;
    const tenantRecord = await TenantDAL.getTenantByEmail(tenantEmail);
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (tenantRecord !== null) {
      if (tenantRecord.userId != user) {
        tenantReturn.status = 401;
        tenantReturn.message = 'Not authorized to get tenant';
        return tenantReturn;
      }
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
  if (tenantContext.phone != null && tenantContext.userId != null) {
    const tenantPhone = tenantContext.phone;
    const tenantRecord = await TenantDAL.getTenantByPhone(tenantPhone);
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (tenantRecord !== null) {
      if (tenantRecord.userId != user) {
        tenantReturn.status = 401;
        tenantReturn.message = 'Not authorized to get tenant';
        return tenantReturn;
      }
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
  if (tenantContext.propertyId != null && tenantContext.userId != null) {
    const propertyId = +tenantContext.propertyId;
    if (isNaN(propertyId) || propertyId < 0) {
      tenantReturn.status = 422;
      tenantReturn.message = 'Bad property id';
      return tenantReturn;
    }
    // Check property exists
    const propertyRecord = await getPropertyById(propertyId);
    if (propertyRecord == null) {
      tenantReturn.status = 404;
      tenantReturn.message = 'Property not found';
      return tenantReturn;
    }
    // Check user owns property
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (propertyRecord.ownerId != user) {
      tenantReturn.status = 401;
      tenantReturn.message = 'Not authorized to get property';
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
  return tenantReturn;
};

// Returns list of tenants that specific user made
const getTenantsByUser = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.MultTenantReturnContext = {
    message: 'Error getting tenants',
    status: 400,
  };
  if (tenantContext.userId != null) {
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (isNaN(user) || user < 0) {
      tenantReturn.status = 422;
      tenantReturn.message = 'Bad user input';
      return tenantReturn;
    }
    const tenants = await TenantDAL.getTenantsByUser(user);
    if (tenants !== null) {
      if (tenants.length === 0) {
        tenantReturn.message = 'User has no tenants';
      } else {
        tenantReturn.message = 'Tenants found';
      }
      tenantReturn.status = 200;
      tenantReturn.data = tenants;
      return tenantReturn;
    }
  }
  return tenantReturn;
};

const createTenantService = async (tenantContext: TenantContexts.TenantCreateContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error creating tenant',
    status: 400,
  };
  const { userId, ...tenantInput } = { ...tenantContext };
  if (userId == null) {
    tenantReturn.message = 'Bad user id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const userIdInput = Number(getDatabaseId('user', userId));
  if (isNaN(userIdInput) || userIdInput < 0) {
    tenantReturn.message = 'Invalid user id';
    tenantReturn.status = 422;
    return tenantReturn;
  }
  const findTenantByEmail = await TenantDAL.getTenantByEmail(tenantContext.email);
  const findTenantByPhone = await TenantDAL.getTenantByPhone(tenantContext.phone);
  if (findTenantByEmail === null && findTenantByPhone === null) {
    const newTenant = await TenantDAL.createNewTenant(userIdInput, tenantInput);
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
    const { id, userId, ...updateData } = tenantContext;
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
    // Check that user made tenant
    const user = Number(getDatabaseId('user', userId));
    if (tenantRecord.userId != user) {
      tenantReturn.message = 'Not authorized to update tenant';
      tenantReturn.status = 401;
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
      tenantReturn.status = 422;
    }
  }
  return tenantReturn;
};

const deleteTenantService = async (tenantContext: TenantContexts.TenantContext) => {
  const tenantReturn: TenantContexts.TenantReturnContext = {
    message: 'Error deleting tenant',
    status: 400,
  };
  if (tenantContext.id != null && tenantContext.userId != null) {
    const tenantId = +tenantContext.id;
    if (isNaN(tenantId) || tenantId < 0) {
      tenantReturn.message = 'Bad tenant id';
      tenantReturn.status = 422;
      return tenantReturn;
    }
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord == null) {
      tenantReturn.message = 'Tenant not found';
      tenantReturn.status = 404;
      return tenantReturn;
    }
    // Check that user made tenant
    const user = Number(getDatabaseId('user', tenantContext.userId));
    if (tenantRecord.userId != user) {
      tenantReturn.message = 'Not authorized to update tenant';
      tenantReturn.status = 401;
      return tenantReturn;
    }
    const deleteTenant = await TenantDAL.deleteTenant(tenantId);
    if (deleteTenant != null) {
      tenantReturn.message = 'Tenant deleted';
      tenantReturn.data = deleteTenant;
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
  getTenantsByUser,
};
