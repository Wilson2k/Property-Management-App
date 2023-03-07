import { PrismaClient } from '@prisma/client'
import { describe, expect, test, beforeAll } from '@jest/globals';
import * as PropertServices from '../propertyService';
import * as PropertyContexts from '../property';
import * as UserContexts from '../../users/user';
import * as UserServices from '../../users/userService';
import { seed } from '../../../seed';

const prisma = new PrismaClient()

beforeAll(async () => {
    seed()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
});