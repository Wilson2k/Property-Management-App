import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../../utils/ApiService";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import PageFilter from "../../../components/PageFilter";
import SideNav from "../../../components/SideNav";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
    const navigate = useNavigate();
    const { status, data } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
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
                <SideNav link={'/tickets'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        <PageFilter title="Tickets">
                            <NavDropdown menuVariant="dark" title="Sort By" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
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
                                            <th scope="col">Tenant</th>
                                            <th scope="col">Open Date</th>
                                            <th scope="col">Property</th>
                                            <th scope="col">Open</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data.map((ticket: any) => {
                                            return (
                                                <tr key={ticket.id} onClick={() => navigate(`/ticket/${ticket.id}`)}>
                                                    <td>{ticket.tenant.firstName}</td>
                                                    <td>{ticket.openDate}</td>
                                                    <td>{ticket.property.address}</td>
                                                    <td>{ticket.open}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <Button onClick={() => navigate(`/ticket/create`)}>Create new ticket</Button>
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