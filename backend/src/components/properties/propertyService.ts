import * as PropertyDAL from './propertyDAL';
import * as PropertyContexts from './property';

const createPropertyService = async (propertyContext: PropertyContexts.PropertyCreateContext) => {
    const propertyReturn: PropertyContexts.PropertyReturnContext = {
        message: 'Error creating property',
        status: 400,
    };
    
};

const getAllPropertiesService = async () => {
    const proppertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting all properties',
        status: 400,
    }
    const properties = await PropertyDAL.getAllProperties();
    if(properties.length !== 0){
        proppertyReturn.message = 'Retrieved properties';
        proppertyReturn.data = properties;
        proppertyReturn.status = 200;
    } else {
        proppertyReturn.message = 'No properties found';
        proppertyReturn.status = 404;
    }
    return proppertyReturn;
};

const getPropertyByIdService = async (propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.PropertyReturnContext = {
        message: 'Error getting property',
        status: 404,
    }
    if(propertyContext.id != null){
        // Check that input string is numeric
        const propertyId = +propertyContext.id;
        if(isNaN(propertyId)) {
            propertyReturn.message = 'Bad property id';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperty = await PropertyDAL.getPropertyById(propertyId);
        if(findProperty !== null){
            propertyReturn.message = 'Property found';
            propertyReturn.data = findProperty;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

const getPropertyByAddressService = async (propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.PropertyReturnContext = {
        message: 'Error getting property',
        status: 404,
    }
    if(propertyContext.address == null) {
        propertyReturn.message = 'Bad property address';
        propertyReturn.status = 422;
        return propertyReturn;
    }
    const findProperty = await PropertyDAL.getPropertyByAddress(propertyContext.address);
    if(findProperty !== null){
        propertyReturn.message = 'Property found';
        propertyReturn.data = findProperty;
        propertyReturn.status = 200;
    }
    return propertyReturn;
};

// Get all properties owned by a specific user
const getUserPropertiesService = async ( propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting user properties',
        status: 404,
    }
    if(propertyContext.ownerId != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperties = await PropertyDAL.getAllUserProperties(ownerId);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

// Get all properties owned by a specific user in a city
const getUserPropertiesByCityService = async ( propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties by city',
        status: 404,
    }
    if(propertyContext.ownerId != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        if(!propertyContext.city) {
            propertyReturn.message = 'Bad property city';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperties = await PropertyDAL.getUserPropertiesByCity(ownerId, propertyContext.city);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

// Get all properties owned by a specific user in a state
const getUserPropertiesByStateService = async (propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties by state',
        status: 404,
    }
    if(propertyContext.ownerId != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        if(!propertyContext.state) {
            propertyReturn.message = 'Bad property state';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperties = await PropertyDAL.getUserPropertiesByState(ownerId, propertyContext.state);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

// Get all properties owned by a specific user by type
const getUserPropertiesByTypeService = async (propertyContext: PropertyContexts.PropertyContext) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties by type',
        status: 404,
    }
    if(propertyContext.ownerId != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        if(!propertyContext.type) {
            propertyReturn.message = 'Bad property type';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperties = await PropertyDAL.getUserPropertiesByType(ownerId, propertyContext.type);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

// Get all properties owned by a specific user with open tickets
const getUserOpenTicketPropertiesService = async ( propertyContext: PropertyContexts.PropertyContext ) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties with open tickets',
        status: 404,
    }
    if(propertyContext.ownerId != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const findProperties = await PropertyDAL.getUserOpenTicketProperties(ownerId);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

// Get all properties owned by a specific user with a specific tenant
const getUserPropertiesByTenantService = async ( propertyContext: PropertyContexts.PropertyContext ) => {
    const propertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties with open tickets',
        status: 404,
    }
    if(propertyContext.ownerId != null && propertyContext.tenant != null){
        // Check that ownerId string is numeric
        const ownerId = +propertyContext.ownerId;
        if(isNaN(ownerId)) {
            propertyReturn.message = 'Bad owner ID';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const tenantName = propertyContext.tenant.split(" ", 1);
        if(tenantName.length !== 2){
            propertyReturn.message = 'Bad tenant name';
            propertyReturn.status = 422;
            return propertyReturn;
        }
        const tenantFname = tenantName[0];
        const tenantLname = tenantName[1];
        const findProperties = await PropertyDAL.getUserPropertiesByTenant(ownerId, tenantFname, tenantLname);
        if(findProperties !== null){
            propertyReturn.message = 'Owner Properties found';
            propertyReturn.data = findProperties;
            propertyReturn.status = 200;
        }
    }
    return propertyReturn;
};

export { getAllPropertiesService, getPropertyByIdService, getPropertyByAddressService, getUserPropertiesByCityService, getUserPropertiesByStateService, getUserPropertiesByTypeService, getUserPropertiesByTenantService, getUserPropertiesService, getUserOpenTicketPropertiesService }