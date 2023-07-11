import * as LeaseDAL from './leaseDAL';
import * as LeaseContexts from './lease';
import { getTenantById } from '../tenants/tenantDAL';
import { getPropertyById } from '../properties/propertyDAL';
import { getDatabaseId } from '../../utils/hashId';

const createNewLeaseService = async (leaseContext: LeaseContexts.LeaseCreateContext) => {
  const leaseReturn: LeaseContexts.LeaseReturnContext = {
    message: 'Error creating lease',
    status: 400,
  };
  const { ownerId, ...leaseInput } = { ...leaseContext };
  if (ownerId == null) {
    leaseReturn.message = 'Bad user id';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  const userIdInput = Number(getDatabaseId('user', ownerId));
  if (isNaN(userIdInput) || userIdInput < 0) {
    leaseReturn.message = 'Invalid user id';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  const tenantId = leaseInput.tenantId;
  const propertyId = leaseInput.propertyId;
  if (isNaN(tenantId) || tenantId < 0 || isNaN(propertyId) || propertyId < 0) {
    leaseReturn.message = 'Invalid lease input';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  const propertyRecord = await getPropertyById(propertyId);
  const tenantRecord = await getTenantById(tenantId);
  if (propertyRecord == null || tenantRecord == null) {
    leaseReturn.message = 'Property or tenant not found';
    leaseReturn.status = 404;
    return leaseReturn;
  }
  if (propertyRecord.ownerId != userIdInput || tenantRecord.userId != userIdInput) {
    leaseReturn.message = 'Not authorized to create lease';
    leaseReturn.status = 401;
    return leaseReturn;
  }
  if (leaseContext.endDate <= leaseContext.startDate) {
    leaseReturn.message = 'End date can not be before start date';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  // Check that start date and end date match months
  if (
    leaseContext.months !=
    leaseContext.endDate.getMonth() -
      leaseContext.startDate.getMonth() +
      12 * (leaseContext.endDate.getFullYear() - leaseContext.startDate.getFullYear())
  ) {
    leaseReturn.message = 'Length of lease does not match start and end date';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  if (leaseContext.months == 0){
    leaseReturn.message = 'Lease must be at least one month long';
    leaseReturn.status = 422;
    return leaseReturn;
  }
  const findLease = await LeaseDAL.getLeaseByPropertyTenant(tenantId, propertyId);
  if (findLease === null) {
    const newTenant = await LeaseDAL.createNewLease(userIdInput, leaseInput);
    leaseReturn.data = newTenant;
    leaseReturn.status = 200;
    leaseReturn.message = 'Lease successfully created';
  } else {
    leaseReturn.message = 'A lease already exists for tenant and property';
    leaseReturn.status = 409;
  }
  return leaseReturn;
};

const updateLeaseService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.LeaseReturnContext = {
    message: 'Error updating lease',
    status: 400,
  };
  if (leaseContext.id != null && leaseContext.ownerId != null) {
    const { id, ownerId, ...updateData } = leaseContext;
    const updateInput: LeaseContexts.LeaseUpdateInput = updateData;
    // Check valid lease id
    const leaseId = +id;
    if (isNaN(leaseId) || leaseId < 0) {
      leaseReturn.message = 'Bad lease id';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    // Check that lease exists
    const leaseRecord = await LeaseDAL.getLeaseById(leaseId);
    if (leaseRecord == null) {
      leaseReturn.message = 'Lease not found';
      leaseReturn.status = 404;
      return leaseReturn;
    }
    // Check that user made lease
    const user = Number(getDatabaseId('user', ownerId));
    if (leaseRecord.ownerId != user) {
      leaseReturn.message = 'Not authorized to update lease';
      leaseReturn.status = 401;
      return leaseReturn;
    }
    // Check that update input data exists
    if (
      updateInput.startDate != null ||
      updateInput.endDate != null ||
      updateInput.monthlyRent != null
    ) {
      if (updateInput.startDate != null && updateInput.endDate != null) {
        updateInput.startDate = new Date(updateInput.startDate);
        updateInput.endDate = new Date(updateInput.endDate);
        if (updateInput.startDate >= updateInput.endDate) {
          leaseReturn.message = 'Start date must be before end date';
          leaseReturn.status = 422;
          return leaseReturn;
        }
        updateInput.months =
          updateInput.endDate.getMonth() -
          updateInput.startDate.getMonth() +
          12 * (updateInput.endDate.getFullYear() - updateInput.startDate.getFullYear());
      } else if (updateInput.startDate != null) {
        updateInput.startDate = new Date(updateInput.startDate);
        if (updateInput.startDate >= leaseRecord.endDate) {
          leaseReturn.message = 'Start date must be before end date';
          leaseReturn.status = 422;
          return leaseReturn;
        }
        updateInput.months =
          leaseRecord.endDate.getMonth() -
          updateInput.startDate.getMonth() +
          12 * (leaseRecord.endDate.getFullYear() - updateInput.startDate.getFullYear());
      } else if (updateInput.endDate != null) {
        updateInput.endDate = new Date(updateInput.endDate);
        if (leaseRecord.startDate >= updateInput.endDate) {
          leaseReturn.message = 'Start date must be before end date';
          leaseReturn.status = 422;
          return leaseReturn;
        }
        updateInput.months =
          updateInput.endDate.getMonth() -
          leaseRecord.startDate.getMonth() +
          12 * (updateInput.endDate.getFullYear() - leaseRecord.startDate.getFullYear());
      }
      if (updateInput.months == 0){
        leaseReturn.message = 'Lease must be at least one month long';
        leaseReturn.status = 422;
        return leaseReturn;
      }
      const updatedLease = await LeaseDAL.updateLease(leaseId, updateInput);
      if (updatedLease != null) {
        leaseReturn.message = 'Lease updated';
        leaseReturn.data = updatedLease;
        leaseReturn.status = 200;
      }
    } else {
      leaseReturn.message = 'No data input';
      leaseReturn.status = 422;
    }
  }
  return leaseReturn;
};

const deleteLeaseService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.LeaseReturnContext = {
    message: 'Error deleting lease',
    status: 400,
  };
  if (leaseContext.id != null && leaseContext.ownerId != null) {
    const leaseId = +leaseContext.id;
    if (isNaN(leaseId) || leaseId < 0) {
      leaseReturn.message = 'Bad lease id';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const leaseRecord = await LeaseDAL.getLeaseById(leaseId);
    if (leaseRecord == null) {
      leaseReturn.message = 'Lease not found';
      leaseReturn.status = 404;
      return leaseReturn;
    }
    // Check that user made tenant
    const user = Number(getDatabaseId('user', leaseContext.ownerId));
    if (leaseRecord.ownerId != user) {
      leaseReturn.message = 'Not authorized to delete lease';
      leaseReturn.status = 401;
      return leaseReturn;
    }
    const deleteLease = await LeaseDAL.deleteLease(leaseId);
    if (deleteLease != null) {
      leaseReturn.message = 'Lease deleted';
      leaseReturn.data = deleteLease;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeaseByIdService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.LeaseReturnContext = {
    message: 'Error getting lease',
    status: 404,
  };
  if (leaseContext.id != null && leaseContext.ownerId != null) {
    const leaseId = +leaseContext.id;
    if (isNaN(leaseId) || leaseId < 0) {
      leaseReturn.status = 422;
      leaseReturn.message = 'Bad lease id';
      return leaseReturn;
    }
    const leaseRecord = await LeaseDAL.getLeaseById(leaseId);
    const user = Number(getDatabaseId('user', leaseContext.ownerId));
    if (leaseRecord !== null) {
      if (leaseRecord.ownerId != user) {
        leaseReturn.status = 401;
        leaseReturn.message = 'Not authorized to get lease';
        return leaseReturn;
      }
      leaseReturn.status = 200;
      leaseReturn.message = 'Lease found';
      leaseReturn.data = leaseRecord;
      return leaseReturn;
    }
  }
  return leaseReturn;
};

const getLeasesByMinRentService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 404,
  };
  if (leaseContext.ownerId != null && leaseContext.monthlyRent != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const rent = +leaseContext.monthlyRent;
    if (isNaN(rent) || rent < 0) {
      leaseReturn.message = 'Bad rent input';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const findLeases = await LeaseDAL.getLeasesByMinRent(ownerId, rent);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.data = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeasesByMaxRentService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null && leaseContext.monthlyRent != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const rent = +leaseContext.monthlyRent;
    if (isNaN(rent) || rent < 0) {
      leaseReturn.message = 'Bad rent input';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const findLeases = await LeaseDAL.getLeasesByMaxRent(ownerId, rent);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.data = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeaseByTimeToEndDateService = async (
  leaseContext: LeaseContexts.LeaseContext
) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const currentDate = new Date();
    const findLeases = await LeaseDAL.getLeaseByTimeToEndDate(ownerId, currentDate);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.data = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getExpiredLeasesService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const currentDate = new Date();
    const findLeases = await LeaseDAL.getExpiredLeases(ownerId, currentDate);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.data = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeasesByUserService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null) {
    // Check that ownerId string is valid
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const findLeases = await LeaseDAL.getLeasesByUser(ownerId);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner leases found';
      leaseReturn.tenantData = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeasesByTenantService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null && leaseContext.tenantId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    // Check that user made tenant
    const tenantId = +leaseContext.tenantId;
    if (isNaN(tenantId) || tenantId < 0) {
      leaseReturn.message = 'Bad tenant ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const tenantRecord = await getTenantById(tenantId);
    if (tenantRecord == null) {
      leaseReturn.message = 'Tenant not found';
      leaseReturn.status = 404;
      return leaseReturn;
    }
    if (tenantRecord.userId != ownerId) {
      leaseReturn.message = 'Not authorized to get leases';
      leaseReturn.status = 401;
      return leaseReturn;
    }
    const findLeases = await LeaseDAL.getLeasesByTenant(ownerId, tenantId);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.data = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

const getLeasesByPropertyService = async (leaseContext: LeaseContexts.LeaseContext) => {
  const leaseReturn: LeaseContexts.MultLeaseReturnContext = {
    message: 'Error getting leases',
    status: 400,
  };
  if (leaseContext.ownerId != null && leaseContext.propertyId != null) {
    // Check that ownerId string is numeric
    const ownerId = Number(getDatabaseId('user', leaseContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      leaseReturn.message = 'Bad owner ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    // Check that user made property
    const propertyId = +leaseContext.propertyId;
    if (isNaN(propertyId) || propertyId < 0) {
      leaseReturn.message = 'Bad property ID';
      leaseReturn.status = 422;
      return leaseReturn;
    }
    const propertyRecord = await getPropertyById(propertyId);
    if (propertyRecord == null) {
      leaseReturn.message = 'Property not found';
      leaseReturn.status = 404;
      return leaseReturn;
    }
    if (propertyRecord.ownerId != ownerId) {
      leaseReturn.message = 'Not authorized to get leases';
      leaseReturn.status = 401;
      return leaseReturn;
    }
    const findLeases = await LeaseDAL.getLeasesByProperty(ownerId, propertyId);
    if (findLeases !== null) {
      leaseReturn.message = 'Owner Leases found';
      leaseReturn.tenantData = findLeases;
      leaseReturn.status = 200;
    }
  }
  return leaseReturn;
};

export {
  createNewLeaseService,
  updateLeaseService,
  deleteLeaseService,
  getLeaseByIdService,
  getLeasesByUserService,
  getLeasesByTenantService,
  getLeasesByPropertyService,
  getLeasesByMaxRentService,
  getLeasesByMinRentService,
  getLeaseByTimeToEndDateService,
  getExpiredLeasesService,
};
