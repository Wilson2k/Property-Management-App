import Form from 'react-bootstrap/Form';

type PropertyData = {
    propertyId: string,
};

type PropertyFormProps = PropertyData & {
    updateFields: (fields: Partial<PropertyData>) => void;
};

export default function PropertyForm({propertyId}: PropertyFormProps) {
    return (
        <Form>
            <h1>Property</h1>
            
        </Form>
    );
}