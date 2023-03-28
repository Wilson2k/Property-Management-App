import { Request, Response } from 'express';
import CustomRequest from '../../utils/request';
import * as PropertyServices from './propertyService';
import {
  PropertyContext,
  PropertyCreateContext,
  PropertyTenantContext,
} from './property';

// Get all properties owned by user of specific type
const createNewUserProperty = async (
  req: CustomRequest<PropertyCreateContext>,
  res: Response
) => {
  const propertyContext: PropertyCreateContext = {
    ownerId: req.session.user,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    type: req.body.type,
    size: req.body.size,
  };
  const propertyData = await PropertyServices.createPropertyService(propertyContext);
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Update a property's info
const updateProperty = async (req: CustomRequest<PropertyContext>, res: Response) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    type: req.body.type,
    size: req.body.size,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.updatePropertyService(propertyContext);
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Remove property tenant
const removePropertyTenant = async (req: CustomRequest<PropertyContext>, res: Response) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    tenantId: +req.params.tenantid,
    ownerId: req.session.user,
  };
  const updatedProperty = await PropertyServices.removePropertyTenantService(propertyContext);
  if (updatedProperty.status === 200 && updatedProperty.fullData !== undefined) {
    res.status(updatedProperty.status).send(updatedProperty.fullData);
  } else {
    res.status(updatedProperty.status).send(updatedProperty.message);
  }
};

// Add property tenant
const addPropertyTenant = async (req: CustomRequest<PropertyContext>, res: Response) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    tenantId: +req.params.tenantid,
    ownerId: req.session.user,
  };
  const updatedProperty = await PropertyServices.addPropertyTenantService(propertyContext);
  if (updatedProperty.status === 200 && updatedProperty.fullData !== undefined) {
    res.status(updatedProperty.status).send(updatedProperty.fullData);
  } else {
    res.status(updatedProperty.status).send(updatedProperty.message);
  }
};

// Delete property
const deleteUserProperty = async (req: CustomRequest<PropertyContext>, res: Response) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const deletedProperty = await PropertyServices.deletePropertyService(propertyContext);
  if (deletedProperty.status === 200 && deletedProperty.data !== undefined) {
    res.status(deletedProperty.status).send(deletedProperty.data);
  } else {
    res.status(deletedProperty.status).send(deletedProperty.message);
  }
};

// Get all properties
const getAllProperties = async (req: Request, res: Response) => {
  const allPropertyData = await PropertyServices.getAllPropertiesService();
  if (allPropertyData.status === 200 && allPropertyData.data === undefined) {
    res.status(allPropertyData.status).send(allPropertyData.data);
  } else {
    res.status(allPropertyData.status).send(allPropertyData.message);
  }
};

// Get property by id
const getPropertyById = async (req: CustomRequest<PropertyContext>, res: Response) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getPropertyByIdService(propertyContext);
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get property total income with id
const getPropertyIncomeById = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getPropertyIncomeService(propertyContext);
  if (propertyData.status === 200 && propertyData.aggregateData !== undefined) {
    res.status(propertyData.status).send(propertyData.aggregateData.toString());
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get property by address
const getPropertyByAddress = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    address: req.query.address as string,
    city: req.query.city as string,
    state: req.query.state as string,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getPropertyByAddressService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user
const getAllUserProperties = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const ownerContext: PropertyContext = {
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getUserPropertiesService(ownerContext);
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user with open tickets
const getAllUserOpenTicketProperties = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const ownerContext: PropertyContext = {
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getUserOpenTicketPropertiesService(
    ownerContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user in specific city
const getUserPropertiesByCity = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    city: req.query.city as string,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getUserPropertiesByCityService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user in specific state
const getUserPropertiesByState = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    state: req.query.state as string,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getUserPropertiesByStateService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user of specific type
const getUserPropertiesByType = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    type: req.query.type as string,
    ownerId: req.session.user,
  };
  const propertyData = await PropertyServices.getUserPropertiesByTypeService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user larger than a certain size
const getUserPropertiesByMinSize = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    ownerId: req.session.user,
    size: Number(req.query.size as string),
  };
  const propertyData = await PropertyServices.getUserPropertiesByMinSizeService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user smaller than a certain size
const getUserPropertiesByMaxSize = async (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  const propertyContext: PropertyContext = {
    ownerId: req.session.user,
    size: Number(req.query.size as string),
  };
  const propertyData = await PropertyServices.getUserPropertiesByMaxSizeService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

// Get all properties owned by user of specific type
const getUserPropertiesByTenant = async (
  req: CustomRequest<PropertyTenantContext>,
  res: Response
) => {
  const propertyContext: PropertyTenantContext = {
    ownerId: req.session.user,
    tenantId: req.params.tenantid,
  };
  const propertyData = await PropertyServices.getUserPropertiesByTenantService(
    propertyContext
  );
  if (propertyData.status === 200 && propertyData.data !== undefined) {
    res.status(propertyData.status).send(propertyData.data);
  } else {
    res.status(propertyData.status).send(propertyData.message);
  }
};

export {
  getAllProperties,
  getAllUserOpenTicketProperties,
  getAllUserProperties,
  getPropertyIncomeById,
  getPropertyByAddress,
  getPropertyById,
  getUserPropertiesByCity,
  getUserPropertiesByState,
  getUserPropertiesByTenant,
  getUserPropertiesByType,
  getUserPropertiesByMinSize,
  getUserPropertiesByMaxSize,
  createNewUserProperty,
  updateProperty,
  addPropertyTenant,
  removePropertyTenant,
  deleteUserProperty,
};
