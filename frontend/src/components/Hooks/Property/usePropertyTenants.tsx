import { useQuery } from "@tanstack/react-query";
import { getTenantsByProperty } from "../../../utils/ApiService";

export const usePropertyTenants = (id: number) => {
    const { status, data } = useQuery({
        queryKey: [id],
        queryFn: () => getTenantsByProperty(id),
    });
    return {status, data}
}