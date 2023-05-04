import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../config/ApiService";
import SideNav from "../SideNav";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Nav, Navbar, NavDropdown, Form, Button, Offcanvas } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";

export default function PropertyPage() {
    const [showOffCanvas, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { status, data } = useQuery({
        queryKey: ['properties'],
        queryFn: getProperties,
    });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' });
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
                        <Navbar expand="lg" className="my-2" style={{ paddingBottom: 0 }}>
                            <Container fluid={!isDesktopOrLaptop} style={{display: isDesktopOrLaptop ? 'inline': 'flex', maxWidth: '100%'}}>
                                {!isDesktopOrLaptop && <Navbar.Brand href="#">Properties</Navbar.Brand>}
                                <Navbar.Toggle onClick={handleShow} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-lg`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                                    placement={"top"}
                                    responsive={'lg'}
                                    style={{ height: `${isDesktopOrLaptop ? 'auto' : '100vh'}` }}
                                    show={showOffCanvas}
                                >
                                    <Offcanvas.Header>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                            Properties
                                        </Offcanvas.Title>
                                        <Button className="btn-close" onClick={handleClose}/>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav
                                            className="me-auto my-2 my-lg-0"
                                            style={{ maxHeight: '100px' }}
                                            navbarScroll
                                        >
                                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                                <NavDropdown.Item href="#action1">City</NavDropdown.Item>
                                                <NavDropdown.Item href="#action2">State</NavDropdown.Item>
                                                <NavDropdown.Item href="#action3">Size</NavDropdown.Item>
                                                <NavDropdown.Item href="#action4">Type</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        <Form className="d-flex">
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                className="me-2"
                                                aria-label="Search"
                                            />
                                            <Button variant="outline-success" >Search</Button>
                                        </Form>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                        <hr style={{ border: '1px solid black' }} />
                        <Card>
                            <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                                <table className="table table-striped table-hover my-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Address</th>
                                            <th scope="col">City</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((property: any) => {
                                            return (
                                                <tr>
                                                    <td>{property.address}</td>
                                                    <td>{property.city}</td>
                                                    <td>{property.state}</td>
                                                    <td>{property.type}</td>
                                                    <td>{property.size}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <Button> Create new property</Button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}