import { useQuery } from "@tanstack/react-query";
import { getTenant } from "../../../utils/ApiService";

export const useTenant = (tenantId: number) => {
    const { status, data } = useQuery({
        queryKey: ['tenant', tenantId],
        queryFn: () => getTenant(tenantId),
    });
    return {status, data}
}