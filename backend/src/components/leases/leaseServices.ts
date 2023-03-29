import * as LeaseDAL from './leaseDAL';
import * as LeaseContexts from './lease';
import { getPropertyById } from '../properties/propertyDAL';
import { getDatabaseId } from '../../utils/hashId';

const createNewLeaseService = async (
  leaseContext: LeaseContexts.LeaseCreateContext
) => {};

const updateLeaseService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const deleteLeaseService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeaseByIdService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeasesByMinRentService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeasesByMaxRentService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeaseByTimeToEndDateService = async (
  leaseContext: LeaseContexts.LeaseContext
) => {};

const getExpiredLeasesService = async (
  leaseContext: LeaseContexts.LeaseContext
) => {};

const getLeasesByUserService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeasesByTenantService = async (leaseContext: LeaseContexts.LeaseContext) => {};

const getLeasesByPropertyService = async (leaseContext: LeaseContexts.LeaseContext) => {};
