import { Col, Container } from "react-bootstrap";
import { FormEvent, useState } from "react";
import PropertyForm from "./PropertyForm";
import TenantForm from "./TenantForm";
import LeaseForm from "./LeaseForm";
import { useMultistepForm } from "../../../../components/MultiStepForm";

type CreateLeaseFormData = {
    tenantId: string;
    propertyId: string;
    startData: string,
    endDate: string,
    months: string,
    monthlyRent: string,
};

const INITIAL_DATA: CreateLeaseFormData = {
    tenantId: '',
    propertyId: '',
    startData: '',
    endDate: '',
    months: '',
    monthlyRent: '',
};

export default function CreateLeaseForm() {
    const [data, setData] = useState(INITIAL_DATA);
    function updateFields(fields: Partial<CreateLeaseFormData>) {
        setData(prev => {
            return { ...prev, ...fields };
        });
    }
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, goToStep, nextStep, prevStep } =
        useMultistepForm([
            <PropertyForm {...data} updateFields={updateFields} />,
            <TenantForm {...data} updateFields={updateFields} />,
            <LeaseForm {...data} updateFields={updateFields} />,
        ]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        switch(currentStepIndex){
            case 0: {
                if(data.propertyId){
                    nextStep();
                }
                break;
            }
            case 1: {
                if(data.tenantId){
                    nextStep();
                }
                break;
            }
            case 2: {
                // Call api here
                break;
            }
        }
    }
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
                            <div className="progress-bar" role="progressbar" style={{width: `${100 / steps.length * (currentStepIndex )}%`}} aria-valuenow={currentStepIndex + 1 / steps.length} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        {step}
                        <div
                            style={{
                                marginTop: "1rem",
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
                            <button className="btn btn-outline-success btn-lg px-5 mt-4" type="submit">{isLastStep ? "Finish" : "Next"}</button>
                        </div>
                    </form>
                </div>
            </Container>
        </Col>
    );
}