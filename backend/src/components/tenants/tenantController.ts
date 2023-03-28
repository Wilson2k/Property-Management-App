import { Response } from 'express';
import CustomRequest from '../../utils/request';
import * as TenantSrvices from './tenantServices';
import { TenantContext, TenantCreateContext } from './tenant';

// Create a new tenant
const createTenant = async (req: CustomRequest<TenantCreateContext>, res: Response) => {
  // Create new tenant context from req object here
  const tenantContext: TenantCreateContext = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    userId: req.session.user,
  };
  const newTenant = await TenantSrvices.createTenantService(tenantContext);
  if (newTenant.status === 200 && newTenant.data !== undefined) {
    res.status(newTenant.status).send(newTenant.data);
  } else {
    res.status(newTenant.status).send(newTenant.message);
  }
};

// Update tenant
const updateTenant = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    id: +req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    userId: req.session.user,
  };
  const tenantData = await TenantSrvices.updateTenantService(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Delete tenant
const deleteTenant = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    id: +req.params.id,
    userId: req.session.user,
  };
  const deletedTenant = await TenantSrvices.deleteTenantService(tenantContext);
  if (deletedTenant.status === 200 && deletedTenant.data !== undefined) {
    res.status(deletedTenant.status).send(deletedTenant.data);
  } else {
    res.status(deletedTenant.status).send(deletedTenant.message);
  }
};

// Get tenant by id
const getTenantById = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    id: +req.params.id,
    userId: req.session.user,
  };
  const tenantData = await TenantSrvices.getTenantByIdService(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Get tenant by email
const getTenantByEmail = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    email: req.query.email as string,
    userId: req.session.user,
  };
  const tenantData = await TenantSrvices.getTenantByEmailService(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Get tenant by phone
const getTenantByPhone = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    phone: req.query.phone as string,
    userId: req.session.user,
  };
  const tenantData = await TenantSrvices.getTenantByPhoneService(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Get tenant by property
const getTenantsByProperty = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    propertyId: +req.params.property,
    userId: req.session.user,
  };
  const tenantData = await TenantSrvices.getTenantsByProperty(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

export {
  getTenantById,
  getTenantByEmail,
  getTenantByPhone,
  getTenantsByProperty,
  createTenant,
  updateTenant,
  deleteTenant,
};
