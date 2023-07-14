import { Row, Col, Container, Card } from "react-bootstrap";
import { NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../components/Hooks/Property/useProperties";
import PageFilter from "../../components/PageFilter";
import SideNav from "../../components/SideNav";
import { PropertyContext } from "../../types/Property";

export default function PropertyPage() {
    const navigate = useNavigate();
    const { status, data } = useProperties();
    if (status === 'loading') {
        return <span>Loading...</span>;
    }
    if (status === 'error') {
        return <span>Unexpected error</span>;
    }
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/properties'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <PageFilter title="Properties">
                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                <NavDropdown.Item href="#action1">Address</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">City</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">State</NavDropdown.Item>
                            </NavDropdown>
                        </PageFilter>
                        <hr style={{ border: '1px solid black' }} />
                        <Card>
                            <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                                <table className="table table-striped table-hover my-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Address</th>
                                            <th scope="col">City</th>
                                            <th scope="col">State</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((property: PropertyContext) => {
                                            return (
                                                <tr key={property.id} onClick={() => navigate(`/property/${property.id}`)}>
                                                    <td>{property.address}</td>
                                                    <td>{property.city}</td>
                                                    <td>{property.state}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <Button onClick={() => navigate(`/property/create`)}>Create new property</Button>
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