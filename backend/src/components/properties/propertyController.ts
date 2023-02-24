import { Request, Response } from 'express';
import * as PropertService from './propertyService';
import { PropertyIdContext, PropertyAddressContext, PropertyOwnerIdContext } from './property';

// Get all properties
const getAllProperties = async (req: Request, res: Response) => {

};

// Get property by id or address
const getProperty = async (req: Request, res: Response) => {

};

// Get all properties owned by user in specific city
const getUserPropertiesByCity = async (req: Request, res: Response) => {

};

// Get all properties owned by user in specific city
const getUserPropertiesByState = async (req: Request, res: Response) => {

};

// Get all properties owned by user of specific type
const getUserPropertiesByType = async (req: Request, res: Response) => {

};

// Get all properties owned by user
const getAllUserProperties = async(req: Request, res: Response) => {

};

// Get all properties owned by user with open tickets
const getAllOpenTicketProperties = async(req: Request, res: Response) => {
    
};