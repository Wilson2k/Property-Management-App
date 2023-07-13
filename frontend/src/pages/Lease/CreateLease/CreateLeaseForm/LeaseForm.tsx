import Form from 'react-bootstrap/Form';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type LeaseData = {
    startDate: Date,
    endDate: Date,
    months: string,
    monthlyRent: string,
};

type LeaseFormProps = LeaseData & {
    updateFields: (fields: Partial<LeaseData>) => void;
    prevStep: () => void;
};

export default function LeaseForm({
    startDate,
    endDate,
    monthlyRent,
    updateFields,
}: LeaseFormProps) {
    return (
        <div className="mb-md-2">
            <h2 className="fw-bold my-4 text-uppercase">Lease Info</h2>
            <Form.Label>Start Date</Form.Label>
            <div className="form-outline form-white mb-4">
                <ReactDatePicker selected={startDate} onChange={e => e && updateFields({ startDate: e })} className="form-control form-control-lg" />
            </div>
            <Form.Label>End Date</Form.Label>
            <div className="form-outline form-white mb-4">
                <ReactDatePicker selected={endDate} onChange={e => e && updateFields({ endDate: e })} className="form-control form-control-lg" />
            </div>

            <div className="form-outline form-white mb-4">
                <Form.Label>Monthly Rent</Form.Label>
                <Form.Control type="state" id="monthlyRent" value={monthlyRent} onChange={e => updateFields({ monthlyRent: e.target.value })} className="form-control form-control-lg" placeholder={"Enter Monthly Rent"} />
            </div>
        </div>
    );
}
