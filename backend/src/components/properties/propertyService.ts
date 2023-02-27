import * as PropertyDAL from './propertyDAL';
import * as PropertyContexts from './property';

const getAllPropertiesService = async () => {
    const proppertyReturn: PropertyContexts.MultPropertiesReturnContext = {
        message: 'Error getting properties',
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
}

const getPropertyByIdService = async (propertyContext: PropertyContexts.PropertyIdContext) => {
    const propertyReturn: PropertyContexts.PropertyReturnContext = {
        message: 'Error getting property',
        status: 404,
    }
    // Check that input string is numeric
    const propertyId = +propertyContext.id;
    if(isNaN(propertyId)) {
        propertyReturn.message = 'Bad property id';
        propertyReturn.status = 422;
        return propertyReturn;
    }
    const findProperty = await PropertyDAL.getPropertyById(propertyContext);
    if(findProperty !== null){
        propertyReturn.message = 'Property found';
        propertyReturn.data = findProperty;
        propertyReturn.status = 200;
    }
    return propertyReturn;
}

const getPropertyByAddressService = async (propertyContext: PropertyContexts.PropertyAddressContext) => {
    const propertyReturn: PropertyContexts.PropertyReturnContext = {
        message: 'Error getting property',
        status: 404,
    }
    if(!propertyContext.address) {
        propertyReturn.message = 'Bad property address';
        propertyReturn.status = 422;
        return propertyReturn;
    }
    const findProperty = await PropertyDAL.getPropertyByAddress(propertyContext);
    if(findProperty !== null){
        propertyReturn.message = 'Property found';
        propertyReturn.data = findProperty;
        propertyReturn.status = 200;
    }
    return propertyReturn;
}

export { getAllPropertiesService, getPropertyByIdService, getPropertyByAddressService }