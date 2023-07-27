import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPropertyIncome } from '../../../utils/ApiService';

export const usePropertyIncome = () => {
  const { id } = useParams() as { id: string };
  const propertyId = +id;
  const { status, data } = useQuery({
    queryKey: ['propertyIncome', propertyId],
    queryFn: () => getPropertyIncome(propertyId),
  });
  return { status, data };
};
