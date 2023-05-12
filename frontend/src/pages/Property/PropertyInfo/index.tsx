import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../../../utils/ApiService";
import SideNav from "../../../components/SideNav";
import { Row, Col, Container } from "react-bootstrap";
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
                        <Col style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                            <h2>{data?.data.address}</h2>
                        </Col>
                        <hr />
                        <Container style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <h5 className="mb-3">
                                Property Information
                                <a href={`/property/edit/${data?.data.id}`} className="mx-3"><i className="bi bi-pen"></i></a>
                            </h5>
                            <p>Address: {data?.data.address}, {data?.data.city}, {data?.data.state}</p>
                            <p>Type: {data?.data.type}</p>
                            <p className="my-0">Size: {data?.data.size}</p>
                        </Container>
                        <hr />
                        <Container fluid className="overflow-auto" style={{ maxHeight: '71vh' }}>
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