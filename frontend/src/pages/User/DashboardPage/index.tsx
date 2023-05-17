import { Row, Col, Container, Card } from "react-bootstrap";
import { Navbar, NavDropdown } from "react-bootstrap";
import { getUser } from "../../../utils/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from 'react-responsive';
import PageFilter from "../../../components/PageFilter";
import SideNav from "../../../components/SideNav";

export default function DashBoardPage() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
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
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/dashboard'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <PageFilter title="Dashboard">
                            {isDesktopOrLaptop && <Navbar.Brand>{data?.data.firstName}'s Insights</Navbar.Brand>}
                            <NavDropdown menuVariant="dark" title="Dropdown" id="navbarScrollingDropdown" style={{ fontWeight: 'bold', justifySelf: 'flex-end' }}>
                                <NavDropdown.Item href="#action1">Option</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">Option</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">Option</NavDropdown.Item>
                            </NavDropdown>
                        </PageFilter>
                        <hr style={{ border: '1px solid black' }} />
                        <Container fluid className="overflow-auto" style={{ maxHeight: '85vh' }}>
                            <Row lg={2} xs={1} className="gy-5">
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Profit</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Graph
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Properties</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Table
                                        </div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Recent Tickets</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>Table</div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Expiring Leases</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>Table</div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Recent Tenants</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>Table</div>
                                    </Card>
                                </Col>
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Occupancy Rate</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            Graph
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
