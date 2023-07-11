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
}: LeaseFormProps) {
    return (
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Lease Info</h2>
            <div className="form-outline form-white mb-4">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="address" id="startDateX" className="form-control form-control-lg" placeholder={"Enter Lease Start Date"} />
            </div>

            <div className="form-outline form-white mb-4">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="city" id="endDateX" className="form-control form-control-lg" placeholder={"Enter Lease End Date"} />
            </div>

            <div className="form-outline form-white mb-4">
                <Form.Label>Monthly Rent</Form.Label>
                <Form.Control type="state" id="monthlyRent" className="form-control form-control-lg" placeholder={"Enter Monthly Rent"} />
            </div>
        </div>
    );
}