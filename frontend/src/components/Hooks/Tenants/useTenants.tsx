import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../utils/ApiService";


export const useTenants = () => {
    const { status, data } = useQuery({
        queryKey: ['tenants'],
        queryFn: getTenants,
    });
    return {status, data}
}