import Hashids from 'hashids/cjs';

const getPublicId = (model: string, databaseId: number) => {
    const hash = new Hashids(model, 10);
    const publicId = hash.encode(databaseId);
    return publicId;
}

const getDatabaseId = (model: string, publicId: string) => {
    const hash = new Hashids(model, 10);
    const databaseId = hash.decode(publicId);
    return databaseId[0];
}

export { getPublicId, getDatabaseId }