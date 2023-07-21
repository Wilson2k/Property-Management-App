import SideNav from "../../../components/SideNav";
import { Row, Col, Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import TenantTable from "../InfoBoxes/TenantTable";
import LeaseTable from "../InfoBoxes/LeaseTable";
import IncomeChart from "../InfoBoxes/IncomeChart";
import { useProperty } from "../../../components/Hooks/Property/useProperty";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { deleteProperty } from "../../../utils/ApiService";
import { useMutation } from '@tanstack/react-query';

export default function PropertyInfoPage() {
    const { status, data } = useProperty();
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const deleteProp = useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            navigate('/properties');
        }
    });
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    if (data?.status !== 200) {
        return <div>{data?.data}</div>;
    }
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/properties'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Modal
                        show={modalShow}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => setModalShow(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Confirm Delete
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6 style={{ margin: 0 }}>
                                Are you sure you want to delete the property {data?.data.address}, {data?.data.city}, {data?.data.state}?
                            </h6>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setModalShow(false)}>No</Button>
                            <Button variant="danger" onClick={() => { deleteProp.mutateAsync(data.data.id); }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>
                    <Container fluid>
                        <Col style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                            <h2>{data?.data.address}</h2>
                        </Col>
                        <hr />
                        <Container fluid style={{ flexDirection: 'column', textAlign: 'left' }}>
                            <h5 className="mb-3">
                                Property Information
                                <button type="button" className="mx-3 btn btn-primary btn-sm" onClick={() => navigate(`/property/edit/${data?.data.id}`)}>
                                    <i className="bi bi-pen"></i>
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => setModalShow(true)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </h5>
                            <p>Address: {data?.data.address}, {data?.data.city}, {data?.data.state}</p>
                            <p>Type: {data?.data.type}</p>
                            <p className="my-0">Size: {data?.data.size} sqft</p>
                        </Container>
                        <hr />
                        <Container fluid className="overflow-auto" style={{ maxHeight: '60vh' }}>
                            <Row lg={2} xs={1} className="gy-5">
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100" style={{ overflow: 'auto' }}>
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Monthly Revenue</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            <IncomeChart id={data.data.id}/>
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100" style={{ overflow: 'auto' }}>
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Tenants</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            <TenantTable id={data.data.id} />
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100" style={{ overflow: 'auto' }}>
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Leases</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            <LeaseTable id={data.data.id} />
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100" style={{ overflow: 'auto' }}>
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Tickets</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Table
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}