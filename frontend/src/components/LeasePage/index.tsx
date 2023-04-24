import SideNav from "../SideNav";
import { Row, Col, Container } from "react-bootstrap";

export default function LeasePage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/lease'} />
                <Col className="px-0">
                    <div>Lease</div>
                </Col>
            </Row>
        </Container>
    );
}
