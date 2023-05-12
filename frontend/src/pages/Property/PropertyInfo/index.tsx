import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../../../utils/ApiService";
import SideNav from "../../../components/SideNav";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";


export default function PropertyInfoPage() {
    const { id } = useParams() as { id: string };
    const propertyId = +id
    const { status, data } = useQuery({
        queryKey: ['property', propertyId],
        queryFn: () => getProperty(propertyId),
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
                    <Container fluid>
                        <Col style={{marginTop: '24px', display: 'flex', justifyContent: 'center'}}>
                            <h2>Manage Property</h2>
                            <Button style={{marginInline: 20}}><i className="bi bi-pen"></i></Button>
                        </Col>
                        <hr />
                        <Col>
                            Address: {data?.data.address}
                        </Col>
                        <Col>
                            City: {data?.data.city}
                        </Col>
                        <Col>
                            State: {data?.data.state}
                        </Col>
                        <hr />
                        <Container fluid className="overflow-auto" style={{ height: '80vh' }}>
                            <Row lg={2} xs={1} className="gy-5">
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Monthly Revenue</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Graph
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Tenants</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Table
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Leases</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>Table</div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '375px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Tickets</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>Table</div>
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