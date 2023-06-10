import * as TenantTypes from '../../../types/Tenant';
import CreateTenantForm from './createForm';
import { useProfile } from '../../../components/Hooks/User/useProfile';

export default function CreateTenantPage() {
    const { status, data } = useProfile();
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    const defaultCreateTenant: TenantTypes.TenantCreateContext = {
        userId: data?.data.id,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };
    return <CreateTenantForm data={defaultCreateTenant}/>
}