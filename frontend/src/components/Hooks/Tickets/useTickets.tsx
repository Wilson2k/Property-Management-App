import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../../../utils/ApiService';

export const useTickets = () => {
  const { status, data } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });
  return { status, data };
};
