import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../utils/ApiService';

export const useProfile = () => {
  const { status, data } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  });
  return { status, data };
};
