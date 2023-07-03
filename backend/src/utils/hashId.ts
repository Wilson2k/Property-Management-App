import Hashids from 'hashids/cjs';

// Function that hashes database keys for obscurity in public facing api - this is NOT a replacement for actual security
const getPublicId = (model: string, databaseId: number) => {
  const hash = new Hashids(model, 10);
  const publicId = hash.encode(databaseId);
  return publicId;
};

// Function that unhashes database keys for data access layer - this is NOT a replacement for actual security
const getDatabaseId = (model: string, publicId: string) => {
  const hash = new Hashids(model, 10);
  const databaseId = hash.decode(publicId);
  return databaseId[0];
};

export { getPublicId, getDatabaseId };
