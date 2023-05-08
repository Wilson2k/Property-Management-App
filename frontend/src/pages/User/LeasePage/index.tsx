import { Row, Col, Container } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import SideNav from "../../../components/SideNav";
import PageFilter from "../../../components/PageFilter";

export default function LeasePage() {
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
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}