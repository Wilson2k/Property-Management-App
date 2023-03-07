import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()

// Seed function returns array of ids of users
export async function seed() {
    const hash1 = bcrypt.hashSync('nofires', 12);
    const user1 = await prisma.user.upsert({
        where: { email: 'smokey@bear.com' },
        update: {},
        create: {
            firstName: 'Smokey',
            lastName: 'BearDude',
            email: 'smokey@bear.com',
            password: hash1,
            properties: {
                create: {
                    address: '123 Fake Street, San Franciso, CA',
                    city: 'San Francisco',
                    state: 'CA',
                    type: 'Single Family',
                    size: '200 sqft',
                },
            },
        },
    });
    const hash2 = bcrypt.hashSync('NoBears', 12);
    const user2 = await prisma.user.upsert({
        where: { email: 'wilson@nosmokey.com' },
        update: {},
        create: {
            firstName: 'Wilson',
            lastName: 'Human',
            email: 'wilson@nosmokey.com',
            password: hash2,
            properties: {
                create: [
                    {
                        address: '123 Dog Street, San Franciso, CA',
                        city: 'San Francisco',
                        state: 'CA',
                        type: 'Triplex',
                        size: '800 sqft',
                    },
                    {
                        address: '123 Mouse Street, San Jose, CA',
                        city: 'San Jose',
                        state: 'CA',
                        type: 'Single Family',
                        size: '500 sqft',
                    }
                ],
            },
        },
    });
    return [user1.id, user2.id];
}