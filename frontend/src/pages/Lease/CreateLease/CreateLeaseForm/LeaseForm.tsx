import Form from 'react-bootstrap/Form';

type LeaseData = {
    startData: string,
    endDate: string,
    months: string,
    monthlyRent: string,
};

type LeaseFormProps = LeaseData & {
    updateFields: (fields: Partial<LeaseData>) => void;
};

export default function LeaseForm({
    startData,
    endDate,
    months,
    monthlyRent,
    updateFields,
  }: LeaseFormProps ) {
    return (
        <Form>
            <h1>Lease</h1>
        </Form>
    );
}