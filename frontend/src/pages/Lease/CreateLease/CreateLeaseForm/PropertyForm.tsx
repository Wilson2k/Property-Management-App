import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useProperties } from '../../../../components/Hooks/Property/useProperties';
import { PropertyContext } from '../../../../types/Property';

type PropertyData = {
    propertyId: string,
};

type PropertyFormProps = PropertyData & {
    updateFields: (fields: Partial<PropertyData>) => void;
};

export default function PropertyForm({ propertyId, updateFields }: PropertyFormProps) {
    const { status, data } = useProperties();
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    return (
        <Form className="card-body p-5 text-center" >
            <div className="mb-md-5">
                <h2 className="fw-bold mb-4 text-uppercase">Property</h2>
                <div className="form-outline form-white mb-4">
                    <Card>
                        <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                            <table className="table table-striped table-hover my-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data.map((property: PropertyContext) => {
                                        return (
                                            <tr key={property.id}>
                                                <td>{property.address}</td>
                                                <td>{property.city}</td>
                                                <td>{property.state}</td>
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
                    <Form.Label>Property Id</Form.Label>
                    <Form.Control value={propertyId} onChange={e => updateFields({ propertyId: e.target.value })} className="form-control form-control-lg" placeholder={"Enter property id"} />
                </div>
            </div>
        </Form>
    );
}