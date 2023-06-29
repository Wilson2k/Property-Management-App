import { useQuery } from "@tanstack/react-query";
import { getPropertyLeases } from "../../../utils/ApiService";

export const usePropertyLeases = (propertyId: number) => {
    const { status, data } = useQuery({
        queryKey: [propertyId],
        queryFn: () => getPropertyLeases(propertyId),
    });
    return {status, data}
}