import Form from 'react-bootstrap/Form';

type TenantData = {
    tenantId: string,
};

type TenantFormProps = TenantData & {
    updateFields: (fields: Partial<TenantData>) => void;
};


export default function TenantForm({tenantId}: TenantFormProps) {
    return (
        <Form>
            <h1>Tenant</h1>
        </Form>
    );
}