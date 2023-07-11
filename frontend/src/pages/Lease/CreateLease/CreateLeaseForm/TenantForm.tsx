import { Card } from 'react-bootstrap';
import { useTenants } from '../../../../components/Hooks/Tenants/useTenants';
import { TenantContext } from '../../../../types/Tenant';
import { usePropertyTenants } from '../../../../components/Hooks/Property/usePropertyTenants';

type TenantData = {
    tenantId: string,
    propertyId: string,
};

type TenantFormProps = TenantData & {
    updateFields: (fields: Partial<TenantData>) => void;
};


export default function TenantForm({ propertyId, tenantId, updateFields }: TenantFormProps) {
    const { status, data } = usePropertyTenants(+propertyId);
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    return (
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Tenant</h2>
            <Card>
                <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                    <table className="table table-striped table-hover my-0">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map((tenant: TenantContext) => {
                                return (
                                    <tr key={tenant.id}>
                                        <td>
                                            <input className="form-check-input" type="radio"
                                                onChange={e => updateFields({ tenantId: e.target.value })}
                                                value={tenant.id}
                                                checked={`${tenant.id}` === tenantId} />
                                        </td>

                                        <td>{tenant.firstName}</td>
                                        <td>{tenant.lastName}</td>
                                        <td>{tenant.email}</td>
                                        <td>{tenant.phone}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>
        </div>
    );
}