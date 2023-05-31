import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenant } from "../../../utils/ApiService";

export const useTenant = () => {
    const { id } = useParams() as { id: string };
    const tenantId = +id
    const { status, data } = useQuery({
        queryKey: ['tenant', tenantId],
        queryFn: () => getTenant(tenantId),
    });
    return {status, data}
}