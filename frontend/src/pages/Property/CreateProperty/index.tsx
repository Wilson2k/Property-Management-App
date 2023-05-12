import { Row, Col, Container } from "react-bootstrap";
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createProperty } from '../../../utils/ApiService';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../utils/ApiService";
import SideNav from "../../../components/SideNav";
import Form from 'react-bootstrap/Form';
import * as PropertyTypes from '../../../types/Property';


export default function CreatePropertyPage() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    const defaultCreateProperty: PropertyTypes.PropertyCreateForm = {
        ownerId: data?.data.id,
        address: '',
        city: '',
        state: '',
        type: '',
        size: '',
    };
    return <CreateForm data={defaultCreateProperty}/>
}

function CreateForm(props: {data: PropertyTypes.PropertyCreateForm}){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({ defaultValues: props.data });
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(0);
    const { mutateAsync } = useMutation({
        mutationFn: createProperty,
        onSettled: () => {
            setLoading(false);
        },
    });
    const FormSubmit = async (property: PropertyTypes.PropertyCreateForm) => {
        setLoading(true);
        const propertyInput: PropertyTypes.PropertyCreateContext = {...property, size: +property.size}
        const response = await mutateAsync(propertyInput);
        setResponse(response?.status || 500);
        if (response?.status === 200) {
            navigate(`/properties`);
        }
    };
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/properties'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid style={{ maxWidth: '1000px' }}>
                        <Form className="card-body p-5 text-center" onSubmit={handleSubmit(FormSubmit)}>
                            <div className="mb-md-5">
                                <h2 className="fw-bold mb-4 text-uppercase">Create Property</h2>
                                <div className="form-outline form-white mb-4">
                                    <Form.Label>Property Address</Form.Label>
                                    <Form.Control disabled={isLoading} type="address" id="typefnameX" className="form-control form-control-lg" placeholder={"Enter property address"}
                                        {...register('address')} />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control disabled={isLoading} type="city" id="typelnameX" className="form-control form-control-lg" placeholder={"Enter property city"}
                                        {...register('city')} />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control disabled={isLoading} type="state" id="typeEmailX" className="form-control form-control-lg" placeholder={"Enter property state"}
                                        {...register('state')} />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control disabled={isLoading} type="type" id="typeTypeX" className="form-control form-control-lg" placeholder={"Enter property type"}
                                        {...register('type')} />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control disabled={isLoading} type="size" id="typeSizeX" className="form-control form-control-lg" placeholder={"Enter property size"}
                                        {...register('size')} />
                                </div>
                                {response === 422 ? <div className="card bg-danger">Invalid input</div> : <></>}
                                {response === 409 ? <div className="card bg-danger">Address in use</div> : <></>}
                                {response === 500 ? <div className="card bg-danger">Error creating property</div> : <></>}
                                {response === 200 ? <div className="card bg-success">Successfully created property</div> : <></>}

                                <button className="btn btn-outline-dark btn-lg px-5 mt-4" type="submit" disabled={isLoading}>
                                    {isLoading && <span className="spinner-border spinner-border-sm me-3"></span>}
                                    Create
                                </button>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}