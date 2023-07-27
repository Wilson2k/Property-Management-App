import { useQuery } from '@tanstack/react-query';
import { getLeases } from '../../../utils/ApiService';

export const useLeases = () => {
  const { status, data } = useQuery({
    queryKey: ['leases'],
    queryFn: getLeases,
  });
  return { status, data };
};
