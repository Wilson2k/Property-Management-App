import SideNav from "../SideNav";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Nav, Navbar, NavDropdown, Offcanvas, Button } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { getUser } from "../../config/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function DashBoardPage() {
    const [showOffCanvas, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { status, data } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
    });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/dashboard'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <Navbar expand="lg" className="my-2" style={{ paddingBottom: 0 }}>
                            <Container fluid >
                                {isDesktopOrLaptop ?
                                    <Navbar.Brand>
                                        <p style={{ margin: 0, fontSize: 15, fontWeight: "bold" }}>{data?.data.firstName}'s Insights</p>
                                    </Navbar.Brand> : <Navbar.Brand>Dashboard</Navbar.Brand>}
                                <Navbar.Toggle onClick={handleShow} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-lg`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                                    placement={"top"}
                                    responsive={'lg'}
                                    style={{height: `${isDesktopOrLaptop ? 'auto': '100vh'}`}}
                                    show={showOffCanvas}
                                >
                                    <Offcanvas.Header>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                            Dashboard
                                        </Offcanvas.Title>
                                        <Button className="btn-close" onClick={handleClose}/>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
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
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                        <hr style={{ border: '1px solid black' }} />
                        <Container fluid className="overflow-auto" style={{ height: '90vh' }}>
                            <Row lg={2} xs={1} className="gy-5">
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
