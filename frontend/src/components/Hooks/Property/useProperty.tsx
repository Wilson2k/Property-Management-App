import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProperty } from '../../../utils/ApiService';

export const useProperty = () => {
  const { id } = useParams() as { id: string };
  const propertyId = +id;
  const { status, data } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getProperty(propertyId),
  });
  return { status, data };
};
