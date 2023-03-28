import { Response } from 'express';
import CustomRequest from '../../utils/request';
import * as LeaseServices from './leaseServices';
import { LeaseContext, LeaseCreateContext } from './lease';

const createNewLease = async (
  req: CustomRequest<LeaseCreateContext>,
  res: Response
) => {};

const updateLease = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const deleteLease = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeaseById = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeasesByLength = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeasesByMinRent = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeasesByMaxRent = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeaseByTimeToEndDate = async (
  req: CustomRequest<LeaseContext>,
  res: Response
) => {};

const getLeasesByUser = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeasesByTenant = async (req: CustomRequest<LeaseContext>, res: Response) => {};

const getLeasesByProperty = async (req: CustomRequest<LeaseContext>, res: Response) => {};
