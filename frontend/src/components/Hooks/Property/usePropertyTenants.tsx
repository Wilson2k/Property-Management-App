import { useQuery } from "@tanstack/react-query";
import { getTenantsByProperty } from "../../../utils/ApiService";

export const usePropertyTenants = (propertyId: number) => {
    const { status, data } = useQuery({
        queryKey: [propertyId],
        queryFn: () => getTenantsByProperty(propertyId),
    });
    return {status, data}
}