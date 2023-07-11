import { Card, FormControl } from 'react-bootstrap';
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
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Property</h2>
            <Card>
                <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                    <table className="table table-striped table-hover my-0">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map((property: PropertyContext) => {
                                return (
                                    <tr key={property.id}>
                                        <td>
                                            <input className="form-check-input" type="radio"
                                                onChange={e => updateFields({ propertyId: e.target.value })}
                                                value={property.id}
                                                checked={`${property.id}` === propertyId} />
                                        </td>
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
        </div>
    );
}