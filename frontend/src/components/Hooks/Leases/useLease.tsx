import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLease } from "../../../utils/ApiService";

export const useLease = () => {
    const { id } = useParams() as { id: string };
    const leaseId = +id
    const { status, data } = useQuery({
        queryKey: ['lease', leaseId],
        queryFn: () => getLease(leaseId),
    });
    return {status, data}
}