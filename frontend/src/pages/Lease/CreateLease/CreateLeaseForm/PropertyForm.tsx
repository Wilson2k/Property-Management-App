import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useProperties } from '../../../../components/Hooks/Property/useProperties';
import { PropertyContext } from '../../../../types/Property';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type PropertyData = {
    propertyId: string,
};

type PropertyFormProps = PropertyData & {
    updateFields: (fields: Partial<PropertyData>) => void;
    nextStep: () => void;
};

export default function PropertyForm({ propertyId, updateFields, nextStep }: PropertyFormProps) {
    const navigate = useNavigate();
    const [response, setResponse] = useState(0);
    const { status, data } = useProperties();
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    const onFormSubmit = async () => {
        // Validate property selected
        if (propertyId) {
            setResponse(200);
            nextStep();
        } else {
            setResponse(422);
        }
    };
    return (
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Property</h2>
            <Form className="card-body" onSubmit={onFormSubmit}>
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
                                {data?.data.length === 0 &&
                                    <tr>
                                        <td colSpan={5}>
                                            No properties created.
                                        </td>
                                    </tr>
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    {data?.data.length === 0 &&
                                        <td colSpan={5}>
                                            <Button onClick={() => navigate(`/property/create`)}>Create a property</Button>
                                        </td>
                                    }
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
                    <button className="btn btn-outline-success btn-lg px-5 mt-4" type="submit">Next</button>
                </div>

            </Form>
            {response === 422 ? <div className="card bg-danger">Invalid input</div> : <></>}
        </div>
    );
}