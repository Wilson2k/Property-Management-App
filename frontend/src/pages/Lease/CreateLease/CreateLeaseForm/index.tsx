import { Col, Container } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../../../components/MultiStepForm";
import { useMutation } from '@tanstack/react-query';
import { createLease } from "../../../../utils/ApiService";
import PropertyForm from "./PropertyForm";
import TenantForm from "./TenantForm";
import LeaseForm from "./LeaseForm";
import { LeaseCreateContext } from "../../../../types/Lease";
import { useNavigate } from "react-router-dom";

type CreateLeaseFormData = {
    tenantId: string;
    propertyId: string;
    startDate: Date,
    endDate: Date,
    months: string,
    monthlyRent: string,
};

const INITIAL_DATA: CreateLeaseFormData = {
    tenantId: '',
    propertyId: '',
    startDate: new Date(),
    endDate: new Date(),
    months: '',
    monthlyRent: '',
};

export default function CreateLeaseForm() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(0);
    const { mutateAsync } = useMutation({
        mutationFn: createLease,
        onSettled: () => {
            setLoading(false);
        },
    });
    const [data, setData] = useState(INITIAL_DATA);
    function updateFields(fields: Partial<CreateLeaseFormData>) {
        setData(prev => {
            return { ...prev, ...fields };
        });
    }
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, nextStep, prevStep } =
        useMultistepForm([
            <PropertyForm {...data} updateFields={updateFields} />,
            <TenantForm {...data} updateFields={updateFields} />,
            <LeaseForm {...data} updateFields={updateFields} />,
        ]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        switch (currentStepIndex) {
            case 0: {
                if (data.propertyId) {
                    nextStep();
                }
                break;
            }
            case 1: {
                if (data.tenantId) {
                    nextStep();
                }
                break;
            }
            case 2: {
                // Calculate length of lease in months
                if (data.startDate && data.endDate && data.monthlyRent) {
                    const start = new Date(data.startDate);
                    const end = new Date(data.endDate);
                    const months = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
                    const rent = +data.monthlyRent;
                    // Call api here
                    setLoading(true);
                    const leaseInput: LeaseCreateContext = { ...data, startDate: start, endDate: end, months: months, monthlyRent: rent, propertyId: +data.propertyId, tenantId: +data.tenantId };
                    const response = await mutateAsync(leaseInput);
                    setResponse(response?.status || 500);
                    if (response?.status === 200) {
                        navigate(`/leases`);
                    }
                }
                break;
            }
        }
    };
    return (
        <Col className="px-0" style={{ background: '#ebecf0' }}>
            <Container fluid style={{ maxWidth: '1000px' }}>
                <div
                    style={{
                        position: "relative",
                        background: "white",
                        padding: "2rem",
                        margin: "1rem",
                        borderRadius: ".5rem",
                        fontFamily: "Arial",
                    }}
                >
                    <form onSubmit={onSubmit}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${100 / steps.length * (currentStepIndex)}%` }} aria-valuenow={currentStepIndex + 1 / steps.length} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        {step}
                        <div
                            style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                display: "flex",
                                gap: ".5rem",
                                justifyContent: "flex-end",
                            }}
                        >
                            {!isFirstStep && (
                                <button className="btn btn-outline-dark btn-lg px-5 mt-4" type="button" onClick={prevStep}>
                                    Back
                                </button>
                            )}
                            {!isLoading && (<button className="btn btn-outline-success btn-lg px-5 mt-4" type="submit">{isLastStep ? "Finish" : "Next"}</button>
                            )}
                        </div>
                        {isLastStep && (
                            response === 422 ? <div className="card bg-danger">Invalid input</div> : <></> &&
                                response === 409 ? <div className="card bg-danger">Lease already exists</div> : <></> &&
                                    response === 500 ? <div className="card bg-danger">Error creating lease</div> : <></> &&
                                        response === 200 ? <div className="card bg-success">Successfully created lease</div> : <></>
                        )}
                    </form>
                </div>
            </Container>
        </Col>
    );
}