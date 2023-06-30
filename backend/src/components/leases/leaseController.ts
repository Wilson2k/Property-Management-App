import { Response } from 'express';
import CustomRequest from '../../utils/request';
import * as LeaseServices from './leaseServices';
import { LeaseContext, LeaseCreateContext } from './lease';

const createNewLease = async (req: CustomRequest<LeaseCreateContext>, res: Response) => {
  const leaseContext: LeaseCreateContext = {
    ownerId: req.session.user,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    months: +req.body.months,
    monthlyRent: +req.body.monthlyRent,
    tenantId: +req.params.tenantid,
    propertyId: +req.params.propertyid,
  };
  const leaseData = await LeaseServices.createNewLeaseService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const updateLease = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    id: +req.params.id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    monthlyRent: req.body.monthlyRent,
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.updateLeaseService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const deleteLease = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.deleteLeaseService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeaseById = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.getLeaseByIdService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeasesByMinRent = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
    monthlyRent: Number(req.query.rent as string),
  };
  const leaseData = await LeaseServices.getLeasesByMinRentService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeasesByMaxRent = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
    monthlyRent: Number(req.query.rent as string),
  };
  const leaseData = await LeaseServices.getLeasesByMaxRentService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeaseByTimeToEndDate = async (
  req: CustomRequest<LeaseContext>,
  res: Response
) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.getLeaseByTimeToEndDateService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getExpiredLeases = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.getExpiredLeasesService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeasesByUser = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
  };
  const leaseData = await LeaseServices.getLeasesByUserService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeasesByTenant = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
    tenantId: +req.params.tenantid,
  };
  const leaseData = await LeaseServices.getLeasesByTenantService(leaseContext);
  if (leaseData.status === 200 && leaseData.data !== undefined) {
    res.status(leaseData.status).send(leaseData.data);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

const getLeasesByProperty = async (req: CustomRequest<LeaseContext>, res: Response) => {
  const leaseContext: LeaseContext = {
    ownerId: req.session.user,
    propertyId: +req.params.propertyid,
  };
  const leaseData = await LeaseServices.getLeasesByPropertyService(leaseContext);
  if (leaseData.status === 200 && leaseData.tenantData !== undefined) {
    res.status(leaseData.status).send(leaseData.tenantData);
  } else {
    res.status(leaseData.status).send(leaseData.message);
  }
};

export {
  createNewLease,
  updateLease,
  deleteLease,
  getLeaseById,
  getLeasesByMinRent,
  getLeasesByMaxRent,
  getLeaseByTimeToEndDate,
  getExpiredLeases,
  getLeasesByUser,
  getLeasesByTenant,
  getLeasesByProperty,
};
