import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTicket } from '../../../utils/ApiService';

export const useTicket = () => {
  const { id } = useParams() as { id: string };
  const ticketId = +id;
  const { status, data } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicket(ticketId),
  });
  return { status, data };
};
