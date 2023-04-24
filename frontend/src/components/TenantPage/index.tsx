import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function TenantPage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/tenants'} />
                <Col className="px-0">
                    <div>Tenant</div>
                </Col>
            </Row>
        </Container>
    );
}
