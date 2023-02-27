import { Request, Response } from 'express';
import * as PropertyServices from './propertyService';
import { PropertyContext } from './property';

// Get all properties
const getAllProperties = async (req: Request, res: Response) => {
    const allPropertyData = await PropertyServices.getAllPropertiesService();
    if(allPropertyData.status === 200 && allPropertyData.data === undefined){
        res.status(allPropertyData.status).send(allPropertyData.data);
    } else {
        res.status(allPropertyData.status).send(allPropertyData.message);
    }
};

// Get property id
const getPropertyById = async (req: Request, res: Response) => {
    const propertyContext: PropertyContext = {
        id: req.body.id,
    };
    const propertyData = await PropertyServices.getPropertyByIdService(propertyContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get property address
const getPropertyByAddress = async (req: Request, res: Response) => {
    const propertyContext: PropertyContext = {
        address: req.body.address,
    };
    const propertyData = await PropertyServices.getPropertyByAddressService(propertyContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get all properties owned by user
const getAllUserProperties = async(req: Request, res: Response) => {
    const ownerContext: PropertyContext = {
        ownerId: req.body.ownerId,
    };
    const propertyData = await PropertyServices.getUserPropertiesService(ownerContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get all properties owned by user with open tickets
const getAllUserOpenTicketProperties = async(req: Request, res: Response) => {
    const ownerContext: PropertyContext = {
        ownerId: req.body.ownerId,
    };
    const propertyData = await PropertyServices.getUserOpenTicketProperties(ownerContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get all properties owned by user in specific city
const getUserPropertiesByCity = async (req: Request, res: Response) => {
    const propertyContext: PropertyContext = {
        city: req.body.city,
        ownerId: req.body.ownerId,
    };
    const propertyData = await PropertyServices.getUserPropertiesByCityService(propertyContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get all properties owned by user in specific state
const getUserPropertiesByState = async (req: Request, res: Response) => {
    const propertyContext: PropertyContext = {
        state: req.body.state,
        ownerId: req.body.ownerId,
    };
    const propertyData = await PropertyServices.getUserPropertiesByStateService(propertyContext);
    if(propertyData.status === 200 && propertyData.data !== undefined){
        res.status(propertyData.status).send(propertyData.data);
    } else {
        res.status(propertyData.status).send(propertyData.message);
    }
};

// Get all properties owned by user of specific type
const getUserPropertiesByType = async (req: Request, res: Response) => {

};
