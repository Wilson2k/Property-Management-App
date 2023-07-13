import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { TenantContext } from '../../../../types/Tenant';
import { usePropertyTenants } from '../../../../components/Hooks/Property/usePropertyTenants';

type TenantData = {
    tenantId: string,
    propertyId: string,
};

type TenantFormProps = TenantData & {
    updateFields: (fields: Partial<TenantData>) => void;
    nextStep: () => void;
    prevStep: () => void;
};


export default function TenantForm({ propertyId, tenantId, updateFields, nextStep, prevStep }: TenantFormProps) {
    const { status, data } = usePropertyTenants(+propertyId);
    const [response, setResponse] = useState(0);
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    const onFormSubmit = async () => {
        // Validate property selected
        if (propertyId && tenantId) {
            setResponse(200);
            nextStep();
        } else {
            setResponse(422);
        }
    };
    return (
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Tenant</h2>
            <Form className="card-body" onSubmit={onFormSubmit}>
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
                <div
                    style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        display: "flex",
                        gap: ".5rem",
                        justifyContent: "flex-end",
                    }}
                >
                    <button className="btn btn-outline-dark btn-lg px-5 mt-4" type="button" onClick={prevStep}>
                    Back
                </button>
                <button className="btn btn-outline-success btn-lg px-5 mt-4" type="submit">Next</button>
                </div>
            </Form>
            {response === 422 ? <div className="card bg-danger">Invalid input</div> : <></>}
        </div>
    );
}