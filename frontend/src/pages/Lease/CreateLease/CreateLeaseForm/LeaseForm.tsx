import Form from 'react-bootstrap/Form';

type LeaseData = {
    startDate: string,
    endDate: string,
    months: string,
    monthlyRent: string,
};

type LeaseFormProps = LeaseData & {
    updateFields: (fields: Partial<LeaseData>) => void;
};

export default function LeaseForm({
    startDate,
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
                <Form.Control type="address" id="startDateX" value={startDate} onChange={e => updateFields({ startDate: e.target.value })} className="form-control form-control-lg" placeholder={"Enter Lease Start Date"} />
            </div>

            <div className="form-outline form-white mb-4">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="city" id="endDateX" value={endDate} onChange={e => updateFields({ endDate: e.target.value })} className="form-control form-control-lg" placeholder={"Enter Lease End Date"} />
            </div>

            <div className="form-outline form-white mb-4">
                <Form.Label>Monthly Rent</Form.Label>
                <Form.Control type="state" id="monthlyRent" value={monthlyRent} onChange={e => updateFields({ monthlyRent: e.target.value })} className="form-control form-control-lg" placeholder={"Enter Monthly Rent"} />
            </div>
        </div>
    );
}