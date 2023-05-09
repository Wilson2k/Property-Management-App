import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../../utils/ApiService";
import { Row, Col, Container, Card } from "react-bootstrap";
import { NavDropdown, Button } from "react-bootstrap";
import PageFilter from "../../../components/PageFilter";
import SideNav from "../../../components/SideNav";
import { useNavigate } from "react-router-dom";

export default function PropertyPage() {
    const navigate = useNavigate();
    const { status, data } = useQuery({
        queryKey: ['properties'],
        queryFn: getProperties,
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
                        <PageFilter title="Properties">
                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                <NavDropdown.Item href="#action1">City</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">State</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">Size</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Type</NavDropdown.Item>
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
                                            <th scope="col">Type</th>
                                            <th scope="col">Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((property: any) => {
                                            return (
                                                <tr key={property.address + property.city + property.state}>
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