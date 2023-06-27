import { useQuery } from "@tanstack/react-query";
import { getTenantsNotOnProperty } from "../../../utils/ApiService";

export const useTenantsNotOnProperty = (propertyId: number) => {
    const { status, data } = useQuery({
        queryKey: [propertyId],
        queryFn: () => getTenantsNotOnProperty(propertyId),
    });
    return {status, data}
}