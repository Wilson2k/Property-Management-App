import { Col, Container } from "react-bootstrap";
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createTenant } from '../../../utils/ApiService';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import * as TenantTypes from '../../../types/Tenant';

export default function CreateTenantForm(props: { data: TenantTypes.TenantCreateContext; }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({ defaultValues: props.data });
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(0);
    const { mutateAsync } = useMutation({
        mutationFn: createTenant,
        onSettled: () => {
            setLoading(false);
        },
    });
    const FormSubmit = async (tenant: TenantTypes.TenantCreateContext) => {
        setLoading(true);
        const tenantInput: TenantTypes.TenantCreateContext = { ...tenant };
        const response = await mutateAsync(tenantInput);
        setResponse(response?.status || 500);
        if (response?.status === 200) {
            navigate(`/tenants`);
        }
    };
    return (
        <Col className="px-0" style={{ background: '#ebecf0' }}>
            <Container fluid style={{ maxWidth: '1000px' }}>
                <Form className="card-body p-5 text-center" onSubmit={handleSubmit(FormSubmit)}>
                    <div className="mb-md-5">
                        <h2 className="fw-bold mb-4 text-uppercase">Create Tenant</h2>
                        <div className="form-outline form-white mb-4">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control disabled={isLoading} type="address" id="typefnameX" className="form-control form-control-lg" placeholder={"Enter tenant first name"}
                                {...register('firstName')} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control disabled={isLoading} type="city" id="typelnameX" className="form-control form-control-lg" placeholder={"Enter tenant last name"}
                                {...register('lastName')} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <Form.Label>Tenant Email</Form.Label>
                            <Form.Control disabled={isLoading} type="state" id="typeEmailX" className="form-control form-control-lg" placeholder={"Enter tenant email"}
                                {...register('email')} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <Form.Label>Tenant Phone Number</Form.Label>
                            <Form.Control disabled={isLoading} type="type" id="typePhoneX" className="form-control form-control-lg" placeholder={"Enter tenant phone number"}
                                {...register('phone')} />
                        </div>


                        {response === 422 ? <div className="card bg-danger">Invalid input</div> : <></>}
                        {response === 409 ? <div className="card bg-danger">Tenant already exists</div> : <></>}
                        {response === 500 ? <div className="card bg-danger">Error creating tenant</div> : <></>}
                        {response === 200 ? <div className="card bg-success">Successfully created tenant</div> : <></>}

                        <button className="btn btn-outline-dark btn-lg px-5 mt-4" type="submit" disabled={isLoading}>
                            {isLoading && <span className="spinner-border spinner-border-sm me-3"></span>}
                            Create
                        </button>
                    </div>
                </Form>
            </Container>
        </Col>
    );
}