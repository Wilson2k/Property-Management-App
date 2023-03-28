import * as PropertyDAL from './propertyDAL';
import * as PropertyContexts from './property';
import * as TenantDAL from '../tenants/tenantDAL';
import { getDatabaseId } from '../../utils/hashId';

const createPropertyService = async (
  propertyContext: PropertyContexts.PropertyCreateContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error creating property',
    status: 400,
  };
  if (propertyContext.ownerId == null) {
    propertyReturn.message = 'User not found';
    propertyReturn.status = 404;
    return propertyReturn;
  }
  const userId = Number(getDatabaseId('user', propertyContext.ownerId));
  if (isNaN(userId) || userId < 0) {
    propertyReturn.message = 'Invalid user id';
    propertyReturn.status = 422;
    return propertyReturn;
  }
  const size = +propertyContext.size;
  if (isNaN(size) || size < 0) {
    propertyReturn.message = 'Invalid size';
    propertyReturn.status = 422;
    return propertyReturn;
  }
  // Convert size to number if not already
  propertyContext.size = size;
  const findProperty = await PropertyDAL.getPropertyByAddress(
    propertyContext.address,
    propertyContext.city,
    propertyContext.state
  );
  if (findProperty === null) {
    const newProperty = await PropertyDAL.createNewProperty(userId, propertyContext);
    propertyReturn.data = newProperty;
    propertyReturn.status = 200;
    propertyReturn.message = 'Property successfully created';
  } else {
    propertyReturn.message = 'Property already exists';
    propertyReturn.status = 409;
  }
  return propertyReturn;
};

const updatePropertyService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error updating property',
    status: 400,
  };
  if (propertyContext.ownerId != null && propertyContext.id != null) {
    const { ownerId, id, ...updateData } = propertyContext;
    const ownerIdValue = Number(getDatabaseId('user', ownerId));
    const updateInput: PropertyContexts.PropertyUpdateInput = updateData;
    if (updateInput.size) {
      updateInput.size = +updateInput.size;
    }
    // Check valid property id
    const propertyId = +id;
    if (isNaN(propertyId) || propertyId < 0) {
      propertyReturn.message = 'Bad property id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check that property exists
    const propertyRecord = await PropertyDAL.getPropertyById(propertyId);
    if (propertyRecord == null) {
      propertyReturn.message = 'Property not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    // All adress fields or none
    if (
      updateInput.address == null ||
      updateInput.city == null ||
      updateInput.state == null
    ) {
      updateInput.address = undefined;
      updateInput.city = undefined;
      updateInput.state = undefined;
    }
    // Check for duplicate info if updating address
    if (
      updateInput.address != null &&
      updateInput.city != null &&
      updateInput.state != null
    ) {
      const propertyDuplicate = await PropertyDAL.getPropertyByAddress(
        updateInput.address,
        updateInput.city,
        updateInput.state
      );
      if (propertyDuplicate != null) {
        propertyReturn.message = 'Address already exists';
        propertyReturn.status = 409;
        return propertyReturn;
      }
    }
    // Check that owner matches database
    if (propertyRecord.ownerId != ownerIdValue) {
      propertyReturn.message = 'Not authorized to update property';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    // Check that updated data is inside input
    if (
      (updateInput.address != null &&
        updateInput.city != null &&
        updateInput.state != null) ||
      updateInput.type != null ||
      updateInput.size != null
    ) {
      const updatedProperty = await PropertyDAL.updateProperty(propertyId, updateInput);
      if (updatedProperty != null) {
        propertyReturn.message = 'Property updated';
        propertyReturn.data = updatedProperty;
        propertyReturn.status = 200;
      }
    } else {
      propertyReturn.message = 'No data input';
      propertyReturn.status = 400;
    }
  }
  return propertyReturn;
};

// Get total income of property
const getPropertyIncomeService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error getting user properties',
    status: 404,
  };
  if (propertyContext.id != null && propertyContext.ownerId != null) {
    // Check that property id string is numeric
    const propertyId = +propertyContext.id;
    if (isNaN(propertyId) || propertyId < 0) {
      propertyReturn.message = 'Bad Property ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check that owner matches database
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    const propertyRecord = await PropertyDAL.getPropertyById(propertyId);
    if (propertyRecord == null) {
      propertyReturn.message = 'Property not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (propertyRecord.ownerId != ownerId) {
      propertyReturn.message = 'Not authorized to get property';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    const propertyIncome = await PropertyDAL.getPropertyMonthlyIncome(propertyId);
    if (propertyIncome !== null) {
      propertyReturn.message = 'Property Income Calculated';
      propertyReturn.aggregateData = Number(propertyIncome);
      propertyReturn.status = 200;
    } else {
      propertyReturn.message = 'Property has no income';
      propertyReturn.aggregateData = 0;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

const removePropertyTenantService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error deleting tenant from property',
    status: 400,
  };
  if (
    propertyContext.id != null &&
    propertyContext.tenantId != null &&
    propertyContext.ownerId != null
  ) {
    // Check that inputs are numeric
    const propertyId = +propertyContext.id;
    if (isNaN(propertyId) || propertyId < 0) {
      propertyReturn.message = 'Bad property id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const tenantId = +propertyContext.tenantId;
    if (isNaN(tenantId) || tenantId < 0) {
      propertyReturn.message = 'Bad tenant id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check that user owns property
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    const propertyRecord = await PropertyDAL.getPropertyById(propertyId);
    if (propertyRecord == null) {
      propertyReturn.message = 'Property not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (propertyRecord.ownerId != ownerId) {
      propertyReturn.message = 'Not authorized to get property';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    // Check that user made tenant
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord == null) {
      propertyReturn.message = 'Tenant not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (tenantRecord.userId != ownerId) {
      propertyReturn.message = 'Not authorized to get tenant';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    const findProperty = await PropertyDAL.removePropertyTenant(propertyId, tenantId);
    if (findProperty != null) {
      propertyReturn.message =
        'Tenant removed from property and lease associated deleted';
      propertyReturn.fullData = findProperty;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

const addPropertyTenantService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error adding tenant to property',
    status: 400,
  };
  if (
    propertyContext.id != null &&
    propertyContext.tenantId != null &&
    propertyContext.ownerId != null
  ) {
    // Check that inputs are numeric
    const propertyId = +propertyContext.id;
    if (isNaN(propertyId) || propertyId < 0) {
      propertyReturn.message = 'Bad property id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const tenantId = +propertyContext.tenantId;
    if (isNaN(tenantId) || tenantId < 0) {
      propertyReturn.message = 'Bad tenant id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check that user made property
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    const propertyRecord = await PropertyDAL.getPropertyById(propertyId);
    if (propertyRecord == null) {
      propertyReturn.message = 'Property not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (propertyRecord.ownerId != ownerId) {
      propertyReturn.message = 'Not authorized to get property';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    // Check that user made tenant
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord == null) {
      propertyReturn.message = 'Tenant not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (tenantRecord.userId != ownerId) {
      propertyReturn.message = 'Not authorized to get tenant';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    const findProperty = await PropertyDAL.addPropertyTenant(propertyId, tenantId);
    if (findProperty != null) {
      propertyReturn.message = 'Tenant added to property';
      propertyReturn.fullData = findProperty;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

const deletePropertyService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error deleting property',
    status: 400,
  };
  if (propertyContext.id != null && propertyContext.ownerId != null) {
    // Check that input string is numeric
    const propertyId = +propertyContext.id;
    if (isNaN(propertyId)) {
      propertyReturn.message = 'Bad property id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperty = await PropertyDAL.getPropertyById(propertyId);
    if (findProperty != null) {
      // Check that owner matches database
      const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
      if (findProperty.ownerId != ownerId) {
        propertyReturn.message = 'Not authorized to get property';
        propertyReturn.status = 401;
        return propertyReturn;
      }
      const deleteProperty = await PropertyDAL.deleteProperty(propertyId);
      propertyReturn.message = 'Property deleted';
      propertyReturn.data = deleteProperty;
      propertyReturn.status = 200;
    } else {
      propertyReturn.message = 'Property not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
  }
  return propertyReturn;
};

const getAllPropertiesService = async () => {
  const proppertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting all properties',
    status: 400,
  };
  const properties = await PropertyDAL.getAllProperties();
  if (properties.length !== 0) {
    proppertyReturn.message = 'Retrieved properties';
    proppertyReturn.data = properties;
    proppertyReturn.status = 200;
  } else {
    proppertyReturn.message = 'No properties found';
    proppertyReturn.status = 404;
  }
  return proppertyReturn;
};

const getPropertyByIdService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error getting property',
    status: 404,
  };
  if (propertyContext.id != null && propertyContext.ownerId != null) {
    // Check that input string is numeric
    const propertyId = +propertyContext.id;
    if (isNaN(propertyId)) {
      propertyReturn.message = 'Bad property id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperty = await PropertyDAL.getPropertyById(propertyId);
    if (findProperty !== null) {
      // Check that owner matches database
      const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
      if (findProperty.ownerId != ownerId) {
        propertyReturn.message = 'Not authorized to get property';
        propertyReturn.status = 401;
        return propertyReturn;
      }
      propertyReturn.message = 'Property found';
      propertyReturn.data = findProperty;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

const getPropertyByAddressService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.PropertyReturnContext = {
    message: 'Error getting property by address',
    status: 404,
  };
  if (
    propertyContext.address == null ||
    propertyContext.city == null ||
    propertyContext.state == null
  ) {
    propertyReturn.message = 'Bad property address';
    propertyReturn.status = 422;
    return propertyReturn;
  }
  const findProperty = await PropertyDAL.getPropertyByAddress(
    propertyContext.address,
    propertyContext.city,
    propertyContext.state
  );
  if (propertyContext.ownerId == null) {
    propertyReturn.message = 'Bad user session';
    propertyReturn.status = 400;
    return propertyReturn;
  }
  if (findProperty !== null) {
    // Check that owner matches database
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (findProperty.ownerId != ownerId) {
      propertyReturn.message = 'Not authorized to get property';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    propertyReturn.message = 'Property found';
    propertyReturn.data = findProperty;
    propertyReturn.status = 200;
  }
  return propertyReturn;
};

// Get all properties owned by a specific user
const getUserPropertiesService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting user properties',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getAllUserProperties(ownerId);
    if (findProperties !== null) {
      propertyReturn.message =
        findProperties.length == 0 ? 'No properties uploaded' : 'Owner properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user in a city
const getUserPropertiesByCityService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by city',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    if (!propertyContext.city) {
      propertyReturn.message = 'Bad property city';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByCity(
      ownerId,
      propertyContext.city
    );
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user in a state
const getUserPropertiesByStateService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by state',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    if (!propertyContext.state) {
      propertyReturn.message = 'Bad property state';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByState(
      ownerId,
      propertyContext.state
    );
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user by type
const getUserPropertiesByTypeService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by type',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    if (!propertyContext.type) {
      propertyReturn.message = 'Bad property type';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByType(
      ownerId,
      propertyContext.type
    );
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user that are larger than a certain size
const getUserPropertiesByMinSizeService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by min size',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    if (!propertyContext.size) {
      propertyReturn.message = 'Bad property size';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByMinSize(
      ownerId,
      propertyContext.size
    );
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user that are smaller than a certain size
const getUserPropertiesByMaxSizeService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by max size',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    if (!propertyContext.size) {
      propertyReturn.message = 'Bad property size';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByMaxSize(
      ownerId,
      propertyContext.size
    );
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user with open tickets
const getUserOpenTicketPropertiesService = async (
  propertyContext: PropertyContexts.PropertyContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties with open tickets',
    status: 404,
  };
  if (propertyContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserOpenTicketProperties(ownerId);
    if (findProperties !== null) {
      propertyReturn.message = 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

// Get all properties owned by a specific user with a specific tenant
const getUserPropertiesByTenantService = async (
  propertyContext: PropertyContexts.PropertyTenantContext
) => {
  const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
    message: 'Error getting properties by tenant',
    status: 404,
  };
  if (propertyContext.ownerId != null && propertyContext.tenantId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', propertyContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      propertyReturn.message = 'Bad owner ID';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check tenantid string numeric
    const tenantId = +propertyContext.tenantId;
    if (isNaN(tenantId) || tenantId < 0) {
      propertyReturn.message = 'Bad tenant id';
      propertyReturn.status = 422;
      return propertyReturn;
    }
    // Check that user made tenant
    const tenantRecord = await TenantDAL.getTenantById(tenantId);
    if (tenantRecord == null) {
      propertyReturn.message = 'Tenant not found';
      propertyReturn.status = 404;
      return propertyReturn;
    }
    if (tenantRecord.userId != ownerId) {
      propertyReturn.message = 'Not authorized to get tenant';
      propertyReturn.status = 401;
      return propertyReturn;
    }
    const findProperties = await PropertyDAL.getUserPropertiesByTenant(ownerId, tenantId);
    if (findProperties !== null) {
      propertyReturn.message =
        findProperties.length == 0
          ? 'No properties with tenant'
          : 'Owner Properties found';
      propertyReturn.data = findProperties;
      propertyReturn.status = 200;
    }
  }
  return propertyReturn;
};

export {
  getAllPropertiesService,
  getPropertyIncomeService,
  getPropertyByIdService,
  getPropertyByAddressService,
  getUserPropertiesService,
  getUserPropertiesByCityService,
  getUserPropertiesByStateService,
  getUserPropertiesByTypeService,
  getUserPropertiesByTenantService,
  getUserOpenTicketPropertiesService,
  getUserPropertiesByMinSizeService,
  getUserPropertiesByMaxSizeService,
  createPropertyService,
  updatePropertyService,
  deletePropertyService,
  removePropertyTenantService,
  addPropertyTenantService,
};
