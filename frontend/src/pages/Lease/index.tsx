import { useQuery } from "@tanstack/react-query";
import { getLeases } from "../../utils/ApiService";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import PageFilter from "../../components/PageFilter";
import SideNav from "../../components/SideNav";
import { useNavigate } from "react-router-dom";

export default function LeasePage() {
    const navigate = useNavigate();
    const { status, data } = useQuery({
        queryKey: ['leases'],
        queryFn: getLeases,
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
                <SideNav link={'/leases'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <PageFilter title="Leases">
                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
                                <NavDropdown.Item href="#action1">Tenant First Name</NavDropdown.Item>
                                <NavDropdown.Item href="#action1">Tenant Last Name</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">Start Date</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">End Date</NavDropdown.Item>
                            </NavDropdown>
                        </PageFilter>
                        <hr style={{ border: '1px solid black' }} />
                        <Card>
                            <div className="table-responsive" style={{ maxHeight: '90vh' }}>
                                <table className="table table-striped table-hover my-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tenant First Name</th>
                                            <th scope="col">Tenant Last Name</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Rent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((lease: any) => {
                                            return (
                                                <tr key={lease.tenantId+lease.propertyId} onClick={() => navigate(`/lease/${lease.id}`)}>
                                                    <td>{lease.tenant.firstName}</td>
                                                    <td>{lease.tenant.lastName}</td>
                                                    <td>{lease.months}</td>
                                                    <td>{lease.monthlyRent}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <Button onClick={() => navigate(`/lease/create`)}>Create new lease</Button>
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