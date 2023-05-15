import { Response } from 'express';
import CustomRequest from '../../utils/request';
import * as TenantServices from './tenantServices';
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
  const newTenant = await TenantServices.createTenantService(tenantContext);
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
  const tenantData = await TenantServices.updateTenantService(tenantContext);
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
  const deletedTenant = await TenantServices.deleteTenantService(tenantContext);
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
  const tenantData = await TenantServices.getTenantByIdService(tenantContext);
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
  const tenantData = await TenantServices.getTenantByEmailService(tenantContext);
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
  const tenantData = await TenantServices.getTenantByPhoneService(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Get tenants by property
const getTenantsByProperty = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    propertyId: +req.params.propertyid,
    userId: req.session.user,
  };
  const tenantData = await TenantServices.getTenantsByProperty(tenantContext);
  if (tenantData.status === 200 && tenantData.data !== undefined) {
    res.status(tenantData.status).send(tenantData.data);
  } else {
    res.status(tenantData.status).send(tenantData.message);
  }
};

// Get tenants by user
const getTenantsByUser = async (req: CustomRequest<TenantContext>, res: Response) => {
  const tenantContext: TenantContext = {
    userId: req.session.user,
  };
  const tenantData = await TenantServices.getTenantsByUser(tenantContext);
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
  getTenantsByUser,
  createTenant,
  updateTenant,
  deleteTenant,
};
