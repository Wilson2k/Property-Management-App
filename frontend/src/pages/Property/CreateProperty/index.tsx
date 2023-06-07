import * as PropertyTypes from '../../../types/Property';
import CreatePropertyForm from "./createForm";
import { useProfile } from "../../../components/Hooks/User/useProfile";

export default function CreatePropertyPage() {
    const { status, data } = useProfile();
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