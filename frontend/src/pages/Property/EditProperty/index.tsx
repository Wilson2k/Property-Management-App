import { Row, Col, Container } from "react-bootstrap";
import SideNav from "../../../components/SideNav";

export default function EditPropertyPage() {
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row>
                <SideNav link={'/properties'} />
                <Col className="px-0" style={{ background: '#ebecf0' }}>
                    <Container fluid>
                        Edit
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}