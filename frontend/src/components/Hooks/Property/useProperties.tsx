import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../../../utils/ApiService';

export const useProperties = () => {
  const { status, data } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });
  return { status, data };
};
