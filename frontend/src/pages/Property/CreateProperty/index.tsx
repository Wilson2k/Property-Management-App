import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../utils/ApiService";
import * as PropertyTypes from '../../../types/Property';
import CreatePropertyForm from "./createForm";

export default function CreatePropertyPage() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    const defaultCreateProperty: PropertyTypes.PropertyCreateForm = {
        ownerId: data?.data.id,
        address: '',
        city: '',
        state: '',
        type: '',
        size: '',
    };
    return <CreatePropertyForm data={defaultCreateProperty}/>
}