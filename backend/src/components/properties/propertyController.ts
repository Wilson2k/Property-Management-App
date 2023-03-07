import { Request, Response } from 'express';
import * as PropertyServices from './propertyService';
import {
  PropertyContext,
  PropertyCreateContext,
  PropertyTenantContext,
} from './property';

interface CustomRequest<T> extends Request {
  body: T;
}

// Get all properties owned by user of specific type
const createNewUserProperty = (
  req: CustomRequest<PropertyCreateContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyCreateContext = {
      ownerId: req.session.id,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      type: req.body.type,
      size: req.body.size,
    };
    const propertyData = await PropertyServices.createPropertyService(
      propertyContext
    );
    if (propertyData.status === 200 && propertyData.data !== undefined) {
      res.status(propertyData.status).send(propertyData.data);
    } else {
      res.status(propertyData.status).send(propertyData.message);
    }
  };
};

// Update a property's info
const updateProperty = (req: CustomRequest<PropertyContext>, res: Response) => {
  async () => {
    const propertyContext: PropertyContext = {
      id: req.body.id,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      type: req.body.type,
      size: req.body.size,
    };
    const propertyData = await PropertyServices.updatePropertyService(
      propertyContext
    );
    if (propertyData.status === 200 && propertyData.data !== undefined) {
      res.status(propertyData.status).send(propertyData.data);
    } else {
      res.status(propertyData.status).send(propertyData.message);
    }
  };
};

// Delete property
const deleteUser = (req: CustomRequest<PropertyContext>, res: Response) => {
  async () => {
    const propertyContext: PropertyContext = {
      id: req.body.id,
    };
    const deletedProperty = await PropertyServices.deletePropertyService(
      propertyContext
    );
    if (deletedProperty.status === 200 && deletedProperty.data !== undefined) {
      res.status(deletedProperty.status).send(deletedProperty.data);
    } else {
      res.status(deletedProperty.status).send(deletedProperty.message);
    }
  };
};

// Get all properties
const getAllProperties = (req: Request, res: Response) => {
  async () => {
    const allPropertyData = await PropertyServices.getAllPropertiesService();
    if (allPropertyData.status === 200 && allPropertyData.data === undefined) {
      res.status(allPropertyData.status).send(allPropertyData.data);
    } else {
      res.status(allPropertyData.status).send(allPropertyData.message);
    }
  };
};

// Get property id
const getPropertyById = (req: CustomRequest<PropertyContext>, res: Response) => {
  async () => {
    const propertyContext: PropertyContext = {
      id: req.body.id,
    };
    const propertyData = await PropertyServices.getPropertyByIdService(
      propertyContext
    );
    if (propertyData.status === 200 && propertyData.data !== undefined) {
      res.status(propertyData.status).send(propertyData.data);
    } else {
      res.status(propertyData.status).send(propertyData.message);
    }
  };
};

// Get property address
const getPropertyByAddress = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyContext = {
      address: req.body.address,
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
};

// Get all properties owned by user
const getAllUserProperties = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const ownerContext: PropertyContext = {
      ownerId: req.body.ownerId,
    };
    const propertyData = await PropertyServices.getUserPropertiesService(
      ownerContext
    );
    if (propertyData.status === 200 && propertyData.data !== undefined) {
      res.status(propertyData.status).send(propertyData.data);
    } else {
      res.status(propertyData.status).send(propertyData.message);
    }
  };
};

// Get all properties owned by user with open tickets
const getAllUserOpenTicketProperties = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const ownerContext: PropertyContext = {
      ownerId: req.body.ownerId,
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
};

// Get all properties owned by user in specific city
const getUserPropertiesByCity = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyContext = {
      city: req.body.city,
      ownerId: req.body.ownerId,
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
};

// Get all properties owned by user in specific state
const getUserPropertiesByState = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyContext = {
      state: req.body.state,
      ownerId: req.body.ownerId,
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
};

// Get all properties owned by user of specific type
const getUserPropertiesByType = (
  req: CustomRequest<PropertyContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyContext = {
      type: req.body.type,
      ownerId: req.body.ownerId,
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
};

// Get all properties owned by user of specific type
const getUserPropertiesByTenant = (
  req: CustomRequest<PropertyTenantContext>,
  res: Response
) => {
  async () => {
    const propertyContext: PropertyTenantContext = {
      ownerId: req.body.ownerId,
      tenant: req.body.tenant,
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
};

export {
  getAllProperties,
  getAllUserOpenTicketProperties,
  getAllUserProperties,
  getPropertyByAddress,
  getPropertyById,
  getUserPropertiesByCity,
  getUserPropertiesByState,
  getUserPropertiesByTenant,
  getUserPropertiesByType,
  createNewUserProperty,
  updateProperty,
  deleteUser,
};
