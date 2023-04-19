import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../config/ApiService";
import SideNav from "../SideNav";
import { Row, Col, Container, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useMediaQuery } from 'react-responsive';

export default function PropertyPage() {
    const { status, data } = useQuery({
        queryKey: ['properties'],
        queryFn: getProperties,
    });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
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
                <Col className="px-0">
                    <Container fluid>
                        <Navbar expand="md" className="my-2">
                            <Container fluid>
                                {!isDesktopOrLaptop && <Navbar.Brand href="#">Properties</Navbar.Brand>}
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav
                                        className="me-auto my-2 my-lg-0"
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll
                                    >
                                        <NavDropdown title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
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
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <hr style={{ border: '1px solid black' }} />
                        <Card>
                            <div className="table-responsive">
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