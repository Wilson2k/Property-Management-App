import SideNav from "../SideNav";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { getUser } from "../../config/ApiService";
import { useQuery } from "@tanstack/react-query";


export default function DashBoardPage() {
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <Navbar expand="md" className="my-2" style={{ paddingBottom: 0 }}>
                            <Container fluid>
                                {isDesktopOrLaptop ?
                                    <Navbar.Brand>
                                        <p style={{ margin: 0, fontSize: 15, fontWeight: "bold" }}>{data?.data.firstName}'s Insights</p>
                                    </Navbar.Brand> : <Navbar.Brand>Dashboard</Navbar.Brand>}
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav
                                        className="me-auto my-2 my-lg-0"
                                        style={{ maxHeight: '100px' }}
                                    >
                                    </Nav>
                                    <Nav
                                        className="my-2 my-lg-0"
                                        style={{ maxHeight: '100px', paddingInline: 50 }}
                                        navbarScroll
                                    >
                                        <NavDropdown menuVariant="dark" title="Dropdown" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                            <NavDropdown.Item href="#action1">Option</NavDropdown.Item>
                                            <NavDropdown.Item href="#action2">Option</NavDropdown.Item>
                                            <NavDropdown.Item href="#action3">Option</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <hr style={{ border: '1px solid black' }} />
                        <Container fluid className="overflow-auto" style={{ height: '90vh' }}>
                            <Row md={2} xs={1} className="gy-5">
                                <Col style={{ height: '350px' }}>
                                    <Card className="h-100">
                                        <h6 style={{ marginTop: 16, marginBottom: 0 }}>Profit</h6>
                                        <hr style={{ border: '1px solid black' }} />
                                        <div>
                                            {status === 'loading' && <span className="spinner-border spinner-border-sm me-3"></span>}
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
                                            {status === 'loading' && <span className="spinner-border spinner-border-sm me-3"></span>}
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
